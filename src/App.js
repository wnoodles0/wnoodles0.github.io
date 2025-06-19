import React, { useState, useEffect, useRef } from 'react';
import InputForm from './components/InputForm';
import PromptOutput from './components/PromptOutput';
import RandomPromptGenerator from './components/RandomPromptGenerator';
import ApiKeyManager from './components/ApiKeyManager';
import SuggestedTopics from './components/SuggestedTopics';
import { generatePromptsWithAI } from './utils/promptGenerator';

function App() {
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [selectedService, setSelectedService] = useState('openai');
  const [error, setError] = useState('');
  const [useApi, setUseApi] = useState(false);
  const inputFormRef = useRef();

  // Load saved prompts from localStorage on component mount
  useEffect(() => {
    const savedPrompts = localStorage.getItem('flux_generated_prompts');
    if (savedPrompts) {
      try {
        const parsed = JSON.parse(savedPrompts);
        setPrompts(parsed);
      } catch (error) {
        console.error('Error loading saved prompts:', error);
      }
    }
  }, []);

  // Save prompts to localStorage whenever they change
  useEffect(() => {
    if (prompts.length > 0) {
      localStorage.setItem('flux_generated_prompts', JSON.stringify(prompts));
    }
  }, [prompts]);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError('');
    try {
      let generatedPrompts;
      if (useApi && apiKey) {
        generatedPrompts = await generatePromptsWithAI(
          apiKey,
          selectedModel,
          selectedService,
          formData,
          formData.promptCount
        );
      } else {
        // fallback to local prompt generation
        const { generateMultiplePrompts } = await import('./utils/promptGenerator');
        generatedPrompts = generateMultiplePrompts(formData, formData.promptCount);
      }
      setPrompts(generatedPrompts);
    } catch (error) {
      console.error('Error generating prompts:', error);
      setError('Failed to generate prompts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandomGenerate = async (randomData) => {
    setIsLoading(true);
    setError('');
    try {
      let generatedPrompts;
      if (useApi && apiKey) {
        generatedPrompts = await generatePromptsWithAI(
          apiKey,
          selectedModel,
          selectedService,
          randomData,
          randomData.promptCount
        );
      } else {
        const { generateMultiplePrompts } = await import('./utils/promptGenerator');
        generatedPrompts = generateMultiplePrompts(randomData, randomData.promptCount);
      }
      setPrompts(generatedPrompts);
    } catch (error) {
      console.error('Error generating random prompts:', error);
      setError('Failed to generate random prompts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeyChange = (newApiKey) => {
    setApiKey(newApiKey);
  };

  const handleModelChange = (newModel) => {
    setSelectedModel(newModel);
  };

  const handleServiceChange = (newService) => {
    setSelectedService(newService);
  };

  const handleUseApiChange = (checked) => {
    setUseApi(checked);
  };

  // Autofill topic in InputForm
  const handleSuggestedTopic = (topic) => {
    if (inputFormRef.current && inputFormRef.current.setTopic) {
      inputFormRef.current.setTopic(topic);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 font-sans" data-theme="pastel">
      {/* Header */}
      <header className="bg-pink-100 shadow-pastel border-b border-pink-200 rounded-b-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" fill="#f9a8d4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                </svg>
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-pink-700">Flux Prompt Generator</h1>
                <p className="text-sm text-pink-400">Create amazing image prompts for Flux AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-300 hover:text-pink-500"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Topics */}
            <SuggestedTopics onSelect={handleSuggestedTopic} />

            {/* Random Prompt Generator */}
            <RandomPromptGenerator onGenerateRandom={handleRandomGenerate} />

            {/* Main Input Form */}
            <InputForm ref={inputFormRef} onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>

          {/* Right Column - API Config and Output */}
          <div className="space-y-6">
            {/* API Key Manager */}
            <ApiKeyManager
              onApiKeyChange={handleApiKeyChange}
              onModelChange={handleModelChange}
              onServiceChange={handleServiceChange}
              onUseApiChange={handleUseApiChange}
              useApi={useApi}
            />

            {/* Prompt Output */}
            <PromptOutput prompts={prompts} isLoading={isLoading} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-pink-100 border-t border-pink-200 mt-16 rounded-t-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-pink-400">
            <p>
              Flux Prompt Generator - Create amazing image prompts for Flux AI
            </p>
            <p className="mt-2">
              Built with React, Tailwind CSS, and DaisyUI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App; 