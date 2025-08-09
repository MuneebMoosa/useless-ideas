const OpenAI = require('openai');

class AIService {
  constructor() {
    this.primaryKey = process.env.OPENAI_API_KEY;
    this.backupKey = process.env.OPENAI_API_KEY_BACKUP;
    this.currentKey = this.primaryKey;
    
    this.openai = new OpenAI({
      apiKey: this.currentKey
    });
    
    if (!this.primaryKey) {
      throw new Error('OPENAI_API_KEY is required');
    }
    
    console.log('🔑 AI Service initialized with primary key');
    if (this.backupKey) {
      console.log('🔑 Backup key available for failover');
    }
  }

  // Switch to backup key if primary fails
  switchToBackupKey() {
    if (this.backupKey && this.currentKey !== this.backupKey) {
      console.log('🔄 Switching to backup OpenAI API key');
      this.currentKey = this.backupKey;
      this.openai = new OpenAI({
        apiKey: this.currentKey
      });
      return true;
    }
    return false;
  }

  // Generate spoilers for all three levels
  async generateSpoilers(movieTitle, overview, genres = []) {
    try {
      const genreText = genres.length > 0 ? genres.map(g => g.name).join(', ') : 'Unknown';
      
      const prompt = `You are a movie spoiler generator. Given a movie's title, overview, and genres, generate spoilers at three different levels.

Movie: "${movieTitle}"
Genres: ${genreText}
Overview: "${overview}"

Generate spoilers in this exact JSON format:
{
  "mild": "Just the ending mood (Happy/Sad/Twist)",
  "medium": "Mood + small plot hint without names",
  "high": "Full spoiler with specific names and events",
  "moodIcon": "😃 for happy, 😢 for sad, 😲 for twist/cliffhanger/open ending"
}

Guidelines:
- MILD: Only emotional tone (e.g., "Happy", "Sad", "Bittersweet", "Twist")
- MEDIUM: Add general plot element without character names (e.g., "Sad – a major character dies")
- HIGH: Full detailed spoiler with names and specific events
- Choose moodIcon based on the overall ending feeling
- Keep responses concise but informative
- If you don't know the actual ending, make a reasonable inference from the overview

Respond only with valid JSON:`;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates movie spoilers at different levels. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      });

      const content = response.choices[0].message.content.trim();
      
      // Try to parse JSON response
      let spoilers;
      try {
        spoilers = JSON.parse(content);
      } catch (parseError) {
        // Fallback if JSON parsing fails
        console.error('AI JSON Parse Error:', parseError);
        spoilers = this.generateFallbackSpoilers(movieTitle, overview);
      }

      // Validate required fields
      if (!spoilers.mild || !spoilers.medium || !spoilers.high || !spoilers.moodIcon) {
        console.warn('Incomplete AI response, using fallback');
        spoilers = this.generateFallbackSpoilers(movieTitle, overview);
      }

      // Ensure moodIcon is valid
      const validIcons = ['😃', '😢', '😲'];
      if (!validIcons.includes(spoilers.moodIcon)) {
        spoilers.moodIcon = '😲'; // Default to twist if invalid
      }

      return spoilers;

    } catch (error) {
      console.error('AI Service Error:', error);
      
      // Try backup key if primary fails due to quota/rate limits
      if ((error.status === 429 || error.code === 'insufficient_quota') && this.switchToBackupKey()) {
        console.log('🔄 Retrying with backup API key...');
        try {
          const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful assistant that generates movie spoilers at different levels. Always respond with valid JSON only.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            max_tokens: 300,
            temperature: 0.7
          });

          const content = response.choices[0].message.content.trim();
          let spoilers = JSON.parse(content);
          
          // Validate and return backup key response
          if (!spoilers.mild || !spoilers.medium || !spoilers.high || !spoilers.moodIcon) {
            return this.generateFallbackSpoilers(movieTitle, overview);
          }
          
          const validIcons = ['😃', '😢', '😲'];
          if (!validIcons.includes(spoilers.moodIcon)) {
            spoilers.moodIcon = '😲';
          }
          
          console.log('✅ Backup key successful!');
          return spoilers;
          
        } catch (backupError) {
          console.error('Backup key also failed:', backupError);
        }
      }
      
      return this.generateFallbackSpoilers(movieTitle, overview);
    }
  }

  // Fallback spoiler generation when AI fails
  generateFallbackSpoilers(movieTitle, overview) {
    console.log(`🔄 Using fallback spoilers for: ${movieTitle}`);
    
    // Enhanced keyword-based analysis for fallback
    const sadKeywords = ['die', 'death', 'tragic', 'sacrifice', 'kill', 'murder', 'war', 'disaster', 'titanic', 'sinking'];
    const happyKeywords = ['love', 'wedding', 'victory', 'success', 'reunion', 'triumph', 'win', 'comedy', 'romantic'];
    const twistKeywords = ['mystery', 'thriller', 'secret', 'reveal', 'twist', 'surprise', 'conspiracy', 'matrix', 'inception'];

    const lowerOverview = overview.toLowerCase();
    const lowerTitle = movieTitle.toLowerCase();
    const text = `${lowerOverview} ${lowerTitle}`;

    let mood = 'Unknown';
    let moodIcon = '😲';
    let mediumHint = '';
    let highDetails = '';

    // Enhanced movie-specific logic with distinct levels
    if (lowerTitle.includes('titanic')) {
      mood = 'Tragic';
      moodIcon = '😢';
      mediumHint = 'Tragic – the unsinkable ship meets disaster';
      highDetails = 'Tragic ending – Jack sacrifices himself in the freezing Atlantic waters to save Rose, who survives to live a full life and dies peacefully as an old woman';
    } else if (lowerTitle.includes('matrix')) {
      mood = 'Mind-bending';
      moodIcon = '😲';
      mediumHint = 'Mind-bending – the chosen one awakens to reality';
      highDetails = 'Mind-bending – Neo realizes the Matrix is a computer simulation, defeats Agent Smith, and becomes "The One" with reality-bending powers';
    } else if (lowerTitle.includes('avengers') || lowerTitle.includes('marvel')) {
      mood = 'Heroic Victory';
      moodIcon = '😃';
      mediumHint = 'Heroic Victory – teamwork saves the universe';
      highDetails = 'Heroic Victory – The Avengers assemble to defeat Thanos/Loki, with Iron Man making the ultimate sacrifice to save humanity and restore the universe';
    } else if (lowerTitle.includes('inception')) {
      mood = 'Complex Twist';
      moodIcon = '😲';
      mediumHint = 'Complex Twist – dream within a dream succeeds';
      highDetails = 'Complex Twist – Dom Cobb successfully plants the inception idea in Fischer\'s mind, reunites with his children, but the spinning totem leaves the ending ambiguous';
    } else if (lowerTitle.includes('star wars')) {
      mood = 'Epic Victory';
      moodIcon = '😃';
      mediumHint = 'Epic Victory – the Force brings balance';
      highDetails = 'Epic Victory – Luke Skywalker defeats the Empire, Vader redeems himself by saving his son, and peace is restored to the galaxy';
    } else if (lowerTitle.includes('batman') || lowerTitle.includes('dark knight')) {
      mood = 'Dark Justice';
      moodIcon = '😲';
      mediumHint = 'Dark Justice – the hero makes a difficult choice';
      highDetails = 'Dark Justice – Batman defeats the villain but must make personal sacrifices, often taking the blame to protect Gotham\'s hope';
    } else if (lowerTitle.includes('drishyam')) {
      mood = 'Clever Thriller';
      moodIcon = '😲';
      mediumHint = 'Clever Thriller – a father protects his family using wit';
      highDetails = 'Clever Thriller – Georgekutty successfully covers up the accidental crime by his family, outsmarting the police investigation through careful planning and alibi creation, ensuring his family\'s safety';
    } else if (lowerTitle.includes('baahubali')) {
      mood = 'Epic Victory';
      moodIcon = '😃';
      mediumHint = 'Epic Victory – the rightful heir reclaims the throne';
      highDetails = 'Epic Victory – Mahendra Baahubali defeats Bhallaladeva and avenges his father Amarendra Baahubali\'s death, reclaiming the Mahishmati kingdom and restoring justice';
    } else if (lowerTitle.includes('kgf')) {
      mood = 'Rise to Power';
      moodIcon = '😲';
      mediumHint = 'Rise to Power – from the streets to ruling an empire';
      highDetails = 'Rise to Power – Rocky rises from poverty to become the most powerful man in the Kolar Gold Fields, but his empire comes with deadly enemies and personal sacrifices';
    } else if (lowerTitle.includes('pushpa')) {
      mood = 'Defiant Victory';
      moodIcon = '😃';
      mediumHint = 'Defiant Victory – the underdog challenges the system';
      highDetails = 'Defiant Victory – Pushpa Raj defeats his rivals in the red sandalwood smuggling business and stands up to corrupt officials, establishing his dominance while staying true to his roots';
    } else if (lowerTitle.includes('joker')) {
      mood = 'Dark Descent';
      moodIcon = '😲';
      mediumHint = 'Dark Descent – society creates its own monster';
      highDetails = 'Dark Descent – Arthur Fleck transforms into the Joker after being abandoned by society, killing Murray Franklin on live TV and inspiring chaos throughout Gotham, becoming the symbol of anarchy he was destined to be';
    } else if (lowerTitle.includes('interstellar')) {
      mood = 'Emotional Reunion';
      moodIcon = '😢';
      mediumHint = 'Emotional Reunion – love transcends time and space';
      highDetails = 'Emotional Reunion – Cooper sacrifices himself to save humanity, gets trapped in a tesseract where he communicates with his daughter Murph across time, eventually reuniting with her as an old woman before setting off to find Brand on Edmunds planet';
    } else if (lowerTitle.includes('endgame')) {
      mood = 'Ultimate Sacrifice';
      moodIcon = '😢';
      mediumHint = 'Ultimate Sacrifice – the greatest hero makes the final choice';
      highDetails = 'Ultimate Sacrifice – Tony Stark uses the Infinity Stones to defeat Thanos, saying "I am Iron Man" before snapping his fingers and dying from the power, while Steve Rogers travels back in time to live with Peggy Carter, passing the Captain America mantle to Sam Wilson';
    } else {
      // Safe fallback logic - avoids creating fake spoilers
      if (sadKeywords.some(keyword => text.includes(keyword))) {
        mood = 'Tragic';
        moodIcon = '😢';
        mediumHint = 'Tragic – involves significant loss or sacrifice';
        highDetails = 'Tragic ending – the story concludes with emotional loss, but the characters\' actions have lasting meaning and impact on those around them.';
      } else if (happyKeywords.some(keyword => text.includes(keyword))) {
        mood = 'Uplifting';
        moodIcon = '😃';
        mediumHint = 'Uplifting – love and hope prevail';
        highDetails = 'Uplifting ending – after facing challenges and obstacles, the main characters achieve their goals and find happiness, often bringing their community together.';
      } else if (twistKeywords.some(keyword => text.includes(keyword))) {
        mood = 'Twist Ending';
        moodIcon = '😲';
        mediumHint = 'Twist Ending – major revelation changes everything';
        highDetails = 'Twist ending – a crucial revelation in the final act completely reframes the entire story, showing that key characters or situations were not what they appeared to be.';
      } else {
        mood = 'Complex';
        moodIcon = '😲';
        mediumHint = 'Complex – multiple storylines reach resolution';
        highDetails = 'Complex ending – the various plot threads come together in a satisfying conclusion that addresses the main conflicts while leaving some elements open to interpretation.';
      }
    }

    return {
      mild: mood,
      medium: mediumHint || `${mood} – based on the plot summary`,
      high: highDetails || `${mood} ending – specific details not available for this movie`,
      moodIcon: moodIcon
    };
  }

  // Analyze movie mood from overview (backup method)
  async analyzeMood(overview) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Analyze the mood of a movie based on its overview. Respond with only one word: Happy, Sad, or Twist.'
          },
          {
            role: 'user',
            content: `Movie overview: "${overview}"`
          }
        ],
        max_tokens: 10,
        temperature: 0.3
      });

      const mood = response.choices[0].message.content.trim();
      const moodIcon = mood === 'Happy' ? '😃' : mood === 'Sad' ? '😢' : '😲';
      
      return { mood, moodIcon };
    } catch (error) {
      console.error('Mood analysis error:', error);
      return { mood: 'Unknown', moodIcon: '😲' };
    }
  }
}

module.exports = new AIService();
