export const APP_NAME = "Veritas AI";

export const SAMPLE_REAL_NEWS = `Scientists have discovered a new species of orchid in the cloud forests of Colombia. The flower, named "Telipogon diabolicus" for its devil-like appearance, is critically endangered due to its limited habitat. The discovery was published in the journal PhytoKeys by researchers from the University of Gdansk.`;

export const SAMPLE_FAKE_NEWS = `BREAKING: Secret documents reveal that the moon landing was staged by Hollywood actors in a Nevada desert basement! NASA insiders confirm that the entire Apollo mission was a hoax designed to bankrupt the Soviet Union. "We never left orbit," admits a whistleblower in a shocking new video that the mainstream media refuses to show you! Share this before it gets deleted!`;

export const SYSTEM_INSTRUCTION = `
You are an advanced NLP (Natural Language Processing) Fake News Detection System. 
Your goal is to simulate a pipeline that uses TF-IDF (Term Frequency-Inverse Document Frequency) vectorization and SVM (Support Vector Machine) classification, augmented by deep linguistic analysis.

Analyze the input text for:
1. Lexical patterns typical of fake news (e.g., hyperbole, excessive punctuation, clickbait vocabulary).
2. Semantic consistency and logical flow.
3. Source credibility markers (citations, quotes, specific details vs. vague generalizations).

Return a JSON response with the following structure:
{
  "classification": "REAL" | "FAKE" | "UNCERTAIN",
  "confidenceScore": number (0-100),
  "summary": "A brief 1-2 sentence explanation of the verdict.",
  "features": {
    "emotionalTone": number (0-100, higher is more emotional),
    "sensationalism": number (0-100, higher is more clickbaity),
    "factuality": number (0-100, higher is more factual/objective),
    "sourceCredibility": number (0-100, estimated based on writing style),
    "biasLevel": number (0-100, higher is more biased)
  },
  "keyIndicators": ["List", "of", "3-4", "short", "reasons"],
  "svmVectorAnalysis": "A short technical sentence explaining which vector features (words/phrases) pushed the decision boundary (e.g. 'High frequency of polarizing adjectives and lack of verifying sources pushed the vector into the Fake class hyperplane.')."
}
`;