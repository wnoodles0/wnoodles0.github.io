import React, { useState, useEffect } from 'react';
import { validateApiKey } from '../utils/validateApiKey';

const PROVIDERS = [
  { value: 'openai', label: 'OpenAI', models: [
    { value: 'gpt-4o', label: 'GPT-4o' },
    { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' }
  ]},
  { value: 'claude', label: 'Claude', models: [
    { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet' },
    { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus' },
    { value: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet' }
  ]},
  { value: 'gemini', label: 'Gemini', models: [
    { value: 'gemini-pro', label: 'Gemini Pro' }
  ]}
];

const ApiKeyManager = ({
  onApiKeyChange,
  onModelChange,
  onServiceChange,
  onUseApiChange,
  useApi
}) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedService, setSelectedService] = useState('openai');
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [validation, setValidation] = useState({ valid: null, message: '' });
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('flux_api_key');
    const savedService = localStorage.getItem('flux_service') || 'openai';
    const savedModel = localStorage.getItem('flux_model') || 'gpt-4o';
    const savedUseApi = localStorage.getItem('flux_use_api') === 'true';
    if (savedApiKey) {
      setApiKey(savedApiKey);
      onApiKeyChange(savedApiKey);
    }
    setSelectedService(savedService);
    setSelectedModel(savedModel);
    onServiceChange(savedService);
    onModelChange(savedModel);
    onUseApiChange(savedUseApi);
  }, [onApiKeyChange, onServiceChange, onModelChange, onUseApiChange]);

  useEffect(() => {
    if (apiKey) {
      setValidating(true);
      validateApiKey(selectedService, apiKey).then(res => {
        setValidation(res);
        setValidating(false);
      });
    } else {
      setValidation({ valid: null, message: '' });
    }
  }, [apiKey, selectedService]);

  const handleApiKeyChange = (e) => {
    const newApiKey = e.target.value;
    setApiKey(newApiKey);
    onApiKeyChange(newApiKey);
    localStorage.setItem('flux_api_key', newApiKey);
  };

  const handleServiceChange = (e) => {
    const newService = e.target.value;
    setSelectedService(newService);
    onServiceChange(newService);
    const service = PROVIDERS.find(s => s.value === newService);
    if (service && service.models.length > 0) {
      const newModel = service.models[0].value;
      setSelectedModel(newModel);
      onModelChange(newModel);
      localStorage.setItem('flux_model', newModel);
    }
    localStorage.setItem('flux_service', newService);
  };

  const handleModelChange = (e) => {
    const newModel = e.target.value;
    setSelectedModel(newModel);
    onModelChange(newModel);
    localStorage.setItem('flux_model', newModel);
  };

  const handleUseApiToggle = (e) => {
    const checked = e.target.checked;
    onUseApiChange(checked);
    localStorage.setItem('flux_use_api', checked);
  };

  const currentService = PROVIDERS.find(s => s.value === selectedService);

  return (
    <div className="bg-pink-50 rounded-2xl shadow-pastel p-6 mb-6">
      <h3 className="text-lg font-bold text-pink-600 mb-4 font-sans">
        API Key & Provider
      </h3>
      <div className="space-y-4">
        {/* Provider Selection */}
        <div>
          <label className="block text-sm font-semibold text-mint-700 mb-2">
            Provider
          </label>
          <select
            value={selectedService}
            onChange={handleServiceChange}
            className="w-full px-3 py-2 rounded-xl border border-mint-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white font-sans"
          >
            {PROVIDERS.map(service => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
        </div>
        {/* Model Selection */}
        <div>
          <label className="block text-sm font-semibold text-mint-700 mb-2">
            Model
          </label>
          <select
            value={selectedModel}
            onChange={handleModelChange}
            className="w-full px-3 py-2 rounded-xl border border-mint-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white font-sans"
          >
            {currentService?.models.map(model => (
              <option key={model.value} value={model.value}>
                {model.label}
              </option>
            ))}
          </select>
        </div>
        {/* API Key Input */}
        <div>
          <label className="block text-sm font-semibold text-mint-700 mb-2">
            API Key
          </label>
          <div className="relative flex items-center">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={apiKey}
              onChange={handleApiKeyChange}
              placeholder={`Enter your ${currentService?.label} API key`}
              className="w-full px-3 py-2 pr-10 rounded-xl border border-mint-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white font-sans"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-2 text-pink-400 hover:text-pink-600"
              tabIndex={-1}
            >
              {showApiKey ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
            <span className="ml-3">
              {validating ? (
                <span className="loading loading-spinner loading-xs text-mint-500"></span>
              ) : validation.valid === true ? (
                <span className="text-green-500 font-bold">✅</span>
              ) : validation.valid === false ? (
                <span className="text-red-400 font-bold">❌</span>
              ) : null}
            </span>
          </div>
          {validation.message && (
            <div className={`text-xs mt-1 ${validation.valid ? 'text-green-600' : 'text-red-400'}`}>{validation.message}</div>
          )}
          <p className="mt-1 text-xs text-mint-500">
            Your API key is stored locally and never sent to our servers
          </p>
        </div>
        {/* Use API Toggle */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            className="toggle toggle-md toggle-success"
            checked={!!useApi}
            onChange={handleUseApiToggle}
            id="use-api-toggle"
          />
          <label htmlFor="use-api-toggle" className="text-sm font-semibold text-mint-700">
            Use API for Prompt Generation
          </label>
        </div>
        {/* Info Box */}
        <div className="bg-mint-50 border border-mint-200 rounded-xl p-3 mt-2">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-mint-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-mint-700">
                <strong>Optional:</strong> Provide an API key to use AI services for enhanced prompt generation. 
                Without an API key or if API is off, the app will generate prompts using built-in templates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyManager; 