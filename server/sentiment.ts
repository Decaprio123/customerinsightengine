import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

export async function analyzeSentiment(text: string): Promise<{
  sentiment: 'positive' | 'negative' | 'neutral',
  confidence: number,
  rating?: number
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a sentiment analysis expert. Analyze the sentiment of customer feedback and provide:
          1. sentiment: either "positive", "negative", or "neutral"
          2. confidence: a score between 0 and 1 indicating confidence in the analysis
          3. rating: an optional 1-5 star rating if the feedback implies a rating
          
          Respond with JSON in this exact format: { "sentiment": "positive|negative|neutral", "confidence": 0.95, "rating": 4 }
          
          Guidelines:
          - Positive: happy, satisfied, complimentary, recommends
          - Negative: angry, disappointed, complains, frustrated
          - Neutral: factual, mixed emotions, or unclear sentiment
          - Confidence should reflect how clear the sentiment is
          - Rating should only be included if the feedback clearly implies a star rating`
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return {
      sentiment: ['positive', 'negative', 'neutral'].includes(result.sentiment) ? result.sentiment : 'neutral',
      confidence: Math.max(0, Math.min(1, result.confidence || 0.5)),
      rating: result.rating && result.rating >= 1 && result.rating <= 5 ? Math.round(result.rating) : undefined,
    };
  } catch (error) {
    console.error("Failed to analyze sentiment:", error);
    // Fallback to neutral sentiment with low confidence
    return {
      sentiment: 'neutral',
      confidence: 0.1,
    };
  }
}
