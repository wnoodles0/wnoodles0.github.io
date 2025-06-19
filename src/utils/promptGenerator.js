// Utility functions for generating Flux-ready prompts and calling external AI APIs

/**
 * Generate a basic Flux-ready prompt string based on user inputs
 * @param {Object} inputs - User input parameters
 * @returns {string} - Generated prompt string
 */
export const generateBasicPrompt = (inputs) => {
  const {
    topic,
    category,
    aspectRatio,
    lighting = 'soft sunlight',
    mood = 'calm'
  } = inputs;

  // Base prompt template
  let prompt = `${topic}, ${category} style`;
  
  // Add aspect ratio context
  if (aspectRatio) {
    prompt += `, ${aspectRatio} aspect ratio`;
  }
  
  // Add lighting and mood
  prompt += `, ${lighting}, ${mood} mood`;
  
  // Add category-specific enhancements
  switch (category) {
    case 'lifestyle':
      prompt += ', natural, authentic, candid photography';
      break;
    case 'fantasy':
      prompt += ', magical, ethereal, dreamlike atmosphere';
      break;
    case 'business':
      prompt += ', professional, clean, modern aesthetic';
      break;
    case 'background':
      prompt += ', seamless, versatile, high quality';
      break;
    case 'food':
      prompt += ', appetizing, high resolution, professional food photography';
      break;
    default:
      prompt += ', high quality, detailed';
  }

  return prompt;
};

/**
 * Generate multiple variations of a prompt
 * @param {Object} inputs - User input parameters
 * @param {number} count - Number of prompts to generate
 * @returns {Array} - Array of generated prompts
 */
export const generateMultiplePrompts = (inputs, count) => {
  const prompts = [];
  const basePrompt = generateBasicPrompt(inputs);
  
  // Style variations for diversity
  const styleVariations = [
    'photorealistic',
    'cinematic',
    'artistic',
    'minimalist',
    'vintage',
    'modern',
    'dramatic',
    'soft',
    'bold',
    'elegant'
  ];

  // Camera angle variations
  const angleVariations = [
    'wide shot',
    'close-up',
    'aerial view',
    'low angle',
    'high angle',
    'eye level',
    'bird\'s eye view',
    'worm\'s eye view'
  ];

  for (let i = 0; i < count; i++) {
    let variation = basePrompt;
    
    // Add random style variation
    const randomStyle = styleVariations[Math.floor(Math.random() * styleVariations.length)];
    variation += `, ${randomStyle}`;
    
    // Add random camera angle (50% chance)
    if (Math.random() > 0.5) {
      const randomAngle = angleVariations[Math.floor(Math.random() * angleVariations.length)];
      variation += `, ${randomAngle}`;
    }
    
    // Add random quality enhancements
    const qualityEnhancements = [
      '8k resolution',
      'highly detailed',
      'sharp focus',
      'professional lighting',
      'studio quality'
    ];
    
    const randomQuality = qualityEnhancements[Math.floor(Math.random() * qualityEnhancements.length)];
    variation += `, ${randomQuality}`;
    
    prompts.push(variation);
  }

  return prompts;
};

/**
 * Call OpenAI API to enhance or generate prompts
 * @param {string} apiKey - OpenAI API key
 * @param {string} model - AI model to use
 * @param {Object} inputs - User input parameters
 * @param {number} count - Number of prompts to generate
 * @returns {Promise<Array>} - Array of AI-generated prompts
 */
export const callOpenAI = async (apiKey, model, inputs, count) => {
  try {
    const basePrompt = generateBasicPrompt(inputs);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert at creating image generation prompts. Generate creative, detailed, and effective prompts for AI image generation. Each prompt should be optimized for high-quality results.'
          },
          {
            role: 'user',
            content: `Generate ${count} creative variations of this image prompt: "${basePrompt}". Each prompt should be unique, detailed, and optimized for AI image generation. Return only the prompts, one per line, without numbering or additional text.`
          }
        ],
        max_tokens: 1000,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Split the response into individual prompts
    const prompts = content.split('\n').filter(prompt => prompt.trim().length > 0);
    
    return prompts.slice(0, count);
  } catch (error) {
    console.error('OpenAI API call failed:', error);
    throw error;
  }
};

/**
 * Call Claude API to enhance or generate prompts
 * @param {string} apiKey - Claude API key
 * @param {string} model - AI model to use
 * @param {Object} inputs - User input parameters
 * @param {number} count - Number of prompts to generate
 * @returns {Promise<Array>} - Array of AI-generated prompts
 */
export const callClaude = async (apiKey, model, inputs, count) => {
  try {
    const basePrompt = generateBasicPrompt(inputs);
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: `Generate ${count} creative variations of this image prompt: "${basePrompt}". Each prompt should be unique, detailed, and optimized for AI image generation. Return only the prompts, one per line, without numbering or additional text.`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.content[0].text;
    
    // Split the response into individual prompts
    const prompts = content.split('\n').filter(prompt => prompt.trim().length > 0);
    
    return prompts.slice(0, count);
  } catch (error) {
    console.error('Claude API call failed:', error);
    throw error;
  }
};

/**
 * Generate prompts using the selected AI service
 * @param {string} apiKey - API key for the selected service
 * @param {string} model - AI model to use
 * @param {string} service - AI service ('openai' or 'claude')
 * @param {Object} inputs - User input parameters
 * @param {number} count - Number of prompts to generate
 * @returns {Promise<Array>} - Array of generated prompts
 */
export const generatePromptsWithAI = async (apiKey, model, service, inputs, count) => {
  if (!apiKey || !model) {
    // Fallback to basic prompt generation if no API key or model
    return generateMultiplePrompts(inputs, count);
  }

  try {
    switch (service) {
      case 'openai':
        return await callOpenAI(apiKey, model, inputs, count);
      case 'claude':
        return await callClaude(apiKey, model, inputs, count);
      default:
        return generateMultiplePrompts(inputs, count);
    }
  } catch (error) {
    console.error('AI service call failed, falling back to basic generation:', error);
    return generateMultiplePrompts(inputs, count);
  }
}; 