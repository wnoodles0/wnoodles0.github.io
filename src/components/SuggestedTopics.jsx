import React, { useState } from 'react';

const SUGGESTIONS = {
  lifestyle: [
    'Morning yoga in a sunlit room',
    'A cozy reading nook',
    'Urban cycling adventure',
    'Minimalist workspace',
    'Family picnic in the park',
  ],
  fantasy: [
    'Dragon flying over a crystal lake',
    'Enchanted forest at dusk',
    'Wizard casting a spell',
    'Fairy village in a mushroom grove',
    'Knight and unicorn under moonlight',
  ],
  business: [
    'Team brainstorming in a modern office',
    'Startup pitch meeting',
    'Remote work with multiple screens',
    'Business handshake outdoors',
    'Creative agency workspace',
  ],
  food: [
    'Stack of pancakes with berries',
    'Colorful poke bowl',
    'Artisan bread on wooden board',
    'Iced matcha latte',
    'Gourmet burger with fries',
  ],
  background: [
    'Soft pastel gradient',
    'Abstract geometric shapes',
    'Cloudy sky with sunbeams',
    'Mint green watercolor wash',
    'Lavender field at sunset',
  ]
};

function getRandomSuggestions() {
  const result = {};
  Object.keys(SUGGESTIONS).forEach(cat => {
    const arr = SUGGESTIONS[cat];
    result[cat] = arr.sort(() => 0.5 - Math.random()).slice(0, 3);
  });
  return result;
}

const SuggestedTopics = ({ onSelect }) => {
  const [topics, setTopics] = useState(getRandomSuggestions());

  const handleRefresh = () => {
    setTopics(getRandomSuggestions());
  };

  return (
    <div className="bg-pink-50 rounded-2xl shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg text-pink-600">Suggested Topics</h3>
        <button
          className="bg-mint-200 text-mint-800 rounded-full px-3 py-1 text-xs font-semibold shadow hover:bg-mint-300 transition"
          onClick={handleRefresh}
        >
          Refresh
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(topics).map(([cat, arr]) => (
          <div key={cat}>
            <div className="text-xs font-semibold text-mint-700 mb-1 capitalize">{cat}</div>
            <div className="flex flex-wrap gap-2">
              {arr.map((topic, i) => (
                <button
                  key={topic}
                  className="bg-white rounded-xl px-3 py-2 text-sm shadow hover:bg-pink-100 transition border border-pink-100 font-medium text-pink-700"
                  onClick={() => onSelect(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedTopics; 