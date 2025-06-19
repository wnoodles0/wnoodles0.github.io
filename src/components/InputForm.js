import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const InputForm = forwardRef(({ onSubmit, isLoading }, ref) => {
  const [formData, setFormData] = useState({
    topic: '',
    category: 'lifestyle',
    aspectRatio: '1:1',
    lighting: 'soft sunlight',
    mood: 'calm',
    promptCount: 3
  });

  // Expose setTopic to parent via ref
  useImperativeHandle(ref, () => ({
    setTopic: (topic) => setFormData(prev => ({ ...prev, topic }))
  }));

  // Load saved form data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('flux_form_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('flux_form_data', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.topic.trim()) {
      onSubmit(formData);
    }
  };

  const categories = [
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'business', label: 'Business' },
    { value: 'background', label: 'Background' },
    { value: 'food', label: 'Food' }
  ];

  const aspectRatios = [
    { value: '1:1', label: '1:1 (Square)' },
    { value: '4:5', label: '4:5 (Portrait)' },
    { value: '9:16', label: '9:16 (Mobile)' },
    { value: '16:9', label: '16:9 (Widescreen)' }
  ];

  const lightingOptions = [
    'soft sunlight',
    'golden hour',
    'blue hour',
    'studio lighting',
    'natural light',
    'dramatic lighting',
    'backlit',
    'side lighting',
    'overcast',
    'sunset glow'
  ];

  const moodOptions = [
    'calm',
    'energetic',
    'mysterious',
    'romantic',
    'professional',
    'playful',
    'serene',
    'dramatic',
    'cozy',
    'elegant'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-pastel p-6 mb-6">
      <h3 className="text-lg font-bold text-pink-600 mb-4 font-sans">
        Prompt Parameters
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Topic/Description */}
        <div>
          <label className="block text-sm font-semibold text-mint-700 mb-2">
            Topic or Description *
          </label>
          <textarea
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            placeholder="Describe what you want to see in the image..."
            required
            rows={3}
            className="w-full px-3 py-2 border border-mint-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 bg-pink-50 font-sans resize-none"
          />
        </div>
        {/* Category and Aspect Ratio Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-mint-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-mint-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white font-sans"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-mint-700 mb-2">
              Aspect Ratio
            </label>
            <select
              name="aspectRatio"
              value={formData.aspectRatio}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-mint-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white font-sans"
            >
              {aspectRatios.map(ratio => (
                <option key={ratio.value} value={ratio.value}>
                  {ratio.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Lighting and Mood Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-mint-700 mb-2">
              Lighting
            </label>
            <select
              name="lighting"
              value={formData.lighting}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-mint-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white font-sans"
            >
              {lightingOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-mint-700 mb-2">
              Mood
            </label>
            <select
              name="mood"
              value={formData.mood}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-mint-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white font-sans"
            >
              {moodOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Number of Prompts */}
        <div>
          <label className="block text-sm font-semibold text-mint-700 mb-2">
            Number of Prompts to Generate
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              name="promptCount"
              min="1"
              max="20"
              value={formData.promptCount}
              onChange={handleInputChange}
              className="range range-pink range-xs flex-1"
            />
            <span className="text-sm font-bold text-pink-600 min-w-[3rem]">
              {formData.promptCount}
            </span>
          </div>
          <p className="mt-1 text-xs text-mint-500">
            Generate between 1 and 20 prompts at once
          </p>
        </div>
        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading || !formData.topic.trim()}
            className={`w-full py-3 px-4 rounded-xl font-bold transition-colors duration-200 shadow-pastel text-lg font-sans ${
              isLoading || !formData.topic.trim()
                ? 'bg-mint-100 text-mint-400 cursor-not-allowed'
                : 'bg-pink-400 text-white hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <span className="loading loading-spinner loading-xs text-white mr-2"></span>
                Generating Prompts...
              </div>
            ) : (
              'Generate Prompt(s)'
            )}
          </button>
        </div>
      </form>
    </div>
  );
});

export default InputForm; 