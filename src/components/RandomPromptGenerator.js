import React, { useState } from 'react';

const RandomPromptGenerator = ({ onGenerateRandom }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Predefined random topics for inspiration
  const randomTopics = [
    'A cozy coffee shop on a rainy day',
    'A futuristic city skyline at sunset',
    'A magical forest with glowing mushrooms',
    'A vintage car driving through a desert',
    'A modern kitchen with natural lighting',
    'A mountain cabin in winter',
    'A bustling street market',
    'A peaceful zen garden',
    'A steampunk airship',
    'A tropical beach at golden hour',
    'A cyberpunk street scene',
    'A rustic farmhouse kitchen',
    'A space station orbiting Earth',
    'A medieval castle on a hill',
    'A modern office with city views'
  ];

  // Random categories with weights
  const randomCategories = [
    { value: 'lifestyle', weight: 3 },
    { value: 'fantasy', weight: 2 },
    { value: 'business', weight: 2 },
    { value: 'background', weight: 1 },
    { value: 'food', weight: 1 }
  ];

  // Random aspect ratios
  const randomAspectRatios = ['1:1', '4:5', '9:16', '16:9'];

  // Random lighting options
  const randomLighting = [
    'soft sunlight',
    'golden hour',
    'blue hour',
    'studio lighting',
    'natural light',
    'dramatic lighting',
    'backlit',
    'side lighting'
  ];

  // Random mood options
  const randomMoods = [
    'calm',
    'energetic',
    'mysterious',
    'romantic',
    'professional',
    'playful',
    'serene',
    'dramatic'
  ];

  const generateRandomPrompt = () => {
    // Select random topic
    const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
    
    // Select random category with weights
    const totalWeight = randomCategories.reduce((sum, cat) => sum + cat.weight, 0);
    let random = Math.random() * totalWeight;
    let selectedCategory = randomCategories[0].value;
    
    for (const category of randomCategories) {
      random -= category.weight;
      if (random <= 0) {
        selectedCategory = category.value;
        break;
      }
    }
    
    // Select other random parameters
    const randomAspectRatio = randomAspectRatios[Math.floor(Math.random() * randomAspectRatios.length)];
    const randomLightingOption = randomLighting[Math.floor(Math.random() * randomLighting.length)];
    const randomMoodOption = randomMoods[Math.floor(Math.random() * randomMoods.length)];
    const randomCount = Math.floor(Math.random() * 5) + 1; // 1-5 prompts

    const randomData = {
      topic: randomTopic,
      category: selectedCategory,
      aspectRatio: randomAspectRatio,
      lighting: randomLightingOption,
      mood: randomMoodOption,
      promptCount: randomCount
    };

    onGenerateRandom(randomData);
  };

  const handleQuickGenerate = (topic) => {
    const randomData = {
      topic: topic,
      category: randomCategories[Math.floor(Math.random() * randomCategories.length)].value,
      aspectRatio: randomAspectRatios[Math.floor(Math.random() * randomAspectRatios.length)],
      lighting: randomLighting[Math.floor(Math.random() * randomLighting.length)],
      mood: randomMoods[Math.floor(Math.random() * randomMoods.length)],
      promptCount: 3
    };

    onGenerateRandom(randomData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Quick Generate
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      </div>

      {/* Main random generate button */}
      <div className="mb-4">
        <button
          onClick={generateRandomPrompt}
          className="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-md font-medium hover:from-primary-700 hover:to-primary-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <div className="flex items-center justify-center">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Generate Random Prompt
          </div>
        </button>
      </div>

      {/* Expanded quick options */}
      {isExpanded && (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Quick Topic Ideas
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {randomTopics.slice(0, 8).map((topic, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickGenerate(topic)}
                  className="text-left p-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-md border border-gray-200 transition-colors duration-200"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Popular Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              {randomCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const randomData = {
                      topic: randomTopics[Math.floor(Math.random() * randomTopics.length)],
                      category: category.value,
                      aspectRatio: randomAspectRatios[Math.floor(Math.random() * randomAspectRatios.length)],
                      lighting: randomLighting[Math.floor(Math.random() * randomLighting.length)],
                      mood: randomMoods[Math.floor(Math.random() * randomMoods.length)],
                      promptCount: 3
                    };
                    onGenerateRandom(randomData);
                  }}
                  className="px-3 py-2 text-sm bg-primary-50 text-primary-700 rounded-md hover:bg-primary-100 transition-colors duration-200"
                >
                  {category.value.charAt(0).toUpperCase() + category.value.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomPromptGenerator; 