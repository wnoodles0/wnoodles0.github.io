export async function validateApiKey(provider, key) {
  if (!key) return { valid: false, message: 'API key required' };
  try {
    if (provider === 'openai') {
      const res = await fetch('https://api.openai.com/v1/models', {
        headers: { 'Authorization': `Bearer ${key}` }
      });
      if (res.ok) return { valid: true, message: 'Valid OpenAI key' };
      return { valid: false, message: 'Invalid OpenAI key' };
    }
    if (provider === 'claude') {
      const res = await fetch('https://api.anthropic.com/v1/models', {
        headers: {
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
        }
      });
      if (res.ok) return { valid: true, message: 'Valid Claude key' };
      return { valid: false, message: 'Invalid Claude key' };
    }
    if (provider === 'gemini') {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: 'hello' }] }] })
      });
      if (res.ok) return { valid: true, message: 'Valid Gemini key' };
      return { valid: false, message: 'Invalid Gemini key' };
    }
    return { valid: false, message: 'Unknown provider' };
  } catch (e) {
    return { valid: false, message: 'Network or validation error' };
  }
} 