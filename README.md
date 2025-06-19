# Flux Prompt Generator

A modern React web application for generating high-quality image prompts optimized for Flux AI. Create stunning, detailed prompts with customizable parameters and optional AI-powered enhancement.

## Features

### 🎨 **Smart Prompt Generation**
- Generate multiple prompts at once (1-20)
- Customizable categories: lifestyle, fantasy, business, background, food
- Multiple aspect ratios: 1:1, 4:5, 9:16, 16:9
- Lighting and mood customization
- Built-in prompt templates and variations

### 🤖 **AI-Powered Enhancement**
- Optional integration with OpenAI GPT-4o and Claude 3.5
- Enhanced prompt generation using AI models
- Automatic fallback to template-based generation
- Secure API key storage (local only)

### 🎯 **Quick Generate**
- Random prompt generation with smart weighting
- Pre-built topic suggestions
- Category-based quick generation
- One-click inspiration

### 📋 **User Experience**
- Copy individual prompts or all at once
- Persistent storage of generated prompts
- Responsive design for all devices
- Clean, modern UI with Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flux-prompt-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Building for Production

```bash
npm run build
# or
yarn build
```

## Usage

### Basic Prompt Generation

1. **Enter a topic or description** in the main input field
2. **Select a category** from the dropdown (lifestyle, fantasy, business, background, food)
3. **Choose an aspect ratio** for your desired image format
4. **Customize lighting and mood** or use the defaults
5. **Set the number of prompts** to generate (1-20)
6. **Click "Generate Prompt(s)"** to create your prompts

### AI-Enhanced Generation

1. **Configure AI Service** in the right panel
2. **Select your preferred AI model** (GPT-4o, Claude 3.5, etc.)
3. **Enter your API key** (stored locally and securely)
4. **Generate prompts** - the AI will enhance your inputs for better results

### Quick Generate

- **Random Prompt**: Click the main "Generate Random Prompt" button
- **Topic Ideas**: Expand the Quick Generate section for inspiration
- **Category Quick**: Generate prompts for specific categories

## Project Structure

```
src/
├── components/
│   ├── ApiKeyManager.js      # API key and model selection
│   ├── InputForm.js          # Main input form
│   ├── PromptOutput.js       # Display and copy prompts
│   └── RandomPromptGenerator.js # Quick generate features
├── utils/
│   └── promptGenerator.js    # Core prompt generation logic
├── App.js                    # Main application component
├── index.js                  # Application entry point
└── index.css                 # Global styles and Tailwind
```

## Configuration

### Environment Variables

The application can be configured with environment variables:

```bash
# Optional: Set default API endpoint
REACT_APP_API_BASE_URL=https://api.openai.com/v1

# Optional: Set default model
REACT_APP_DEFAULT_MODEL=gpt-4o
```

### API Keys

To use AI-enhanced generation, you'll need API keys from:

- **OpenAI**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
- **Claude**: Get your API key from [Anthropic Console](https://console.anthropic.com/)

## Features in Detail

### Prompt Categories

- **Lifestyle**: Natural, authentic, candid photography style
- **Fantasy**: Magical, ethereal, dreamlike atmosphere
- **Business**: Professional, clean, modern aesthetic
- **Background**: Seamless, versatile, high quality
- **Food**: Appetizing, high resolution, professional food photography

### Aspect Ratios

- **1:1 (Square)**: Perfect for social media posts
- **4:5 (Portrait)**: Instagram-friendly portrait format
- **9:16 (Mobile)**: Mobile-first vertical format
- **16:9 (Widescreen)**: Traditional landscape format

### Lighting Options

- Soft sunlight, golden hour, blue hour
- Studio lighting, natural light, dramatic lighting
- Backlit, side lighting, overcast, sunset glow

### Mood Options

- Calm, energetic, mysterious, romantic
- Professional, playful, serene, dramatic
- Cozy, elegant

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)
- AI integration with OpenAI and Anthropic APIs

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include browser console errors if applicable

---

**Happy prompt generating! 🎨✨** 