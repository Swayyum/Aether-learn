import { Message } from '../types/chat';

interface Response {
  text: string;
  followUp?: string[];
}

const RESPONSES = new Map<string, Response>([
  ['default', {
    text: "I'm here to help! Could you please be more specific about what you'd like to learn about machine learning?",
    followUp: [
      "You can ask about:",
      "- ML basics and concepts",
      "- Specific algorithms",
      "- Course recommendations",
      "- Learning paths"
    ]
  }],
  ['hello', {
    text: "Hello! I'm excited to help you with your machine learning journey. What would you like to learn about?",
    followUp: [
      "- Getting started with ML",
      "- Course recommendations",
      "- Assessment preparation"
    ]
  }],
  ['course', {
    text: "We offer several courses ranging from ML basics to advanced topics. What's your current experience level with machine learning?",
    followUp: [
      "We have courses in:",
      "- ML Foundations",
      "- Deep Learning",
      "- Natural Language Processing",
      "- Computer Vision"
    ]
  }],
  ['transformer', {
    text: "Transformers are a powerful architecture in deep learning, particularly for NLP tasks. Would you like to learn about their key components?",
    followUp: [
      "Key topics include:",
      "- Self-attention mechanism",
      "- Multi-head attention",
      "- Positional encoding",
      "- Feed-forward networks"
    ]
  }],
  ['neural', {
    text: "Neural networks are fundamental to deep learning. Would you like to understand their basic structure or learn about specific architectures?",
    followUp: [
      "We can discuss:",
      "- Basic neural network concepts",
      "- Activation functions",
      "- Backpropagation",
      "- Different architectures"
    ]
  }],
  ['help', {
    text: "I can help you with various ML topics and guide you through our platform.",
    followUp: [
      "Try asking about:",
      "- ML concepts and terminology",
      "- Course recommendations",
      "- Project ideas",
      "- Learning resources"
    ]
  }]
]);

const findBestMatch = (input: string): Response => {
  const normalizedInput = input.toLowerCase();
  
  // Check for exact matches first
  for (const [key, response] of RESPONSES.entries()) {
    if (normalizedInput.includes(key)) {
      return response;
    }
  }

  // If no match found, return default response
  return RESPONSES.get('default')!;
};

export const generateResponse = (input: string): Message => {
  const response = findBestMatch(input);
  const responseText = response.followUp 
    ? `${response.text}\n\n${response.followUp.join('\n')}`
    : response.text;

  return {
    id: Date.now().toString(),
    text: responseText,
    sender: 'bot',
    timestamp: new Date()
  };
};