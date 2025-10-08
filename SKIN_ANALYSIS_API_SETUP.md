# Skin Disease Identification Setup Guide

## Google Cloud Vision API Setup

To enable skin disease identification from photos, you need to set up Google Cloud Vision API:

### 1. Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Vision API for your project

### 2. Create API Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key

### 3. Configure Environment Variable
Add your API key to your environment:

**For development:**
```bash
# Create .env file in your project root
echo "REACT_APP_GOOGLE_VISION_API_KEY=your_api_key_here" > .env
```

**For production:**
Set the environment variable in your deployment platform:
```bash
REACT_APP_GOOGLE_VISION_API_KEY=your_api_key_here
```

### 4. Features Enabled
With this setup, your app can now:
- ✅ Analyze skin images for disease identification
- ✅ Detect medical features and conditions
- ✅ Provide confidence scores for analysis
- ✅ Generate personalized recommendations
- ✅ Show detailed medical disclaimers

### 5. API Capabilities
The Google Cloud Vision API provides:
- **Label Detection**: Identifies objects and medical features in images
- **Medical Analysis**: Recognizes skin conditions and abnormalities
- **Confidence Scoring**: Provides accuracy percentages for identifications
- **Multi-language Support**: Works with images from any region

### 6. Privacy & Security
- Images are processed securely through Google's API
- No images are stored permanently
- Analysis results include appropriate medical disclaimers
- Users must consent to image analysis

### 7. Error Handling
The system includes:
- ✅ Graceful fallbacks when API is unavailable
- ✅ File validation (size, format)
- ✅ Network error handling
- ✅ User-friendly error messages

## Usage
Once configured, users can:
1. Upload skin images through the AI Skin Analysis page
2. Receive AI-powered condition identification
3. Get personalized care recommendations
4. See confidence scores for analysis accuracy

## Support
For API issues or questions:
- Check Google Cloud Console for API quotas and errors
- Monitor API usage in Google Cloud Console
- Review error logs in browser developer tools
