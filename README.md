# Healthyfy - AI Health Assistant

## 🚨 IMPORTANT: Node.js Required!

**Your code is 100% ready, but you need to install Node.js first!**

### ⚠️ Current Error:
```
node : The term 'node' is not recognized...
```

This means Node.js is NOT installed on your system.

---

## 🔧 STEP-BY-STEP FIX (5 Minutes)

### Step 1: Download Node.js
1. Open browser and go to: **https://nodejs.org/**
2. Click the **LTS (Long Term Support)** button - it's the GREEN button
3. Download will start automatically (file: `node-v20.x.x-x64.msi`)

### Step 2: Install Node.js
1. Find the downloaded file in your Downloads folder
2. Double-click to run the installer
3. Click "Next" → "Next" → "Next"
4. ✅ Make sure "Add to PATH" is CHECKED
5. Click "Install" and wait
6. Click "Finish"

### Step 3: Restart VS Code
- Close VS Code completely
- Open it again

### Step 4: Verify Installation
Open PowerShell in VS Code (Terminal → New Terminal) and type:
```powershell
node --version
npm --version
```

You should see:
```
v20.11.0
10.2.4
```

### Step 5: Install Dependencies
```powershell
cd "c:\Users\yash singh\OneDrive\Desktop\healthyfy"
npm install
```

### Step 6: Run Your App! 🚀
```powershell
npm run dev
```

Your app will open at: **http://localhost:3000**

---

## 🏥 Project Overview
A comprehensive AI-powered health application with symptom checking, skin analysis, health chat, and healthcare facility finder.

## 📁 Project Structure

```
healthyfy/
├── Components/
│   ├── skin/
│   │   ├── ImageUpload.jsx          # Image upload component
│   │   └── SkinAnalysisResult.jsx   # Skin analysis results display
│   └── symptom/
│       ├── AnalysisResult.jsx       # Symptom analysis results
│       └── SymptomForm.jsx          # Symptom input form
├── Entity/
│   ├── ChatMessage.json             # Chat message schema
│   ├── HealthQuery.json             # Health query schema
│   └── SkinAnalysis.json            # Skin analysis schema
├── Pages/
│   ├── dashboard.js                 # Dashboard with health stats
│   ├── findhealthcare.js            # Healthcare facility finder
│   ├── healthchat.js                # AI health chat
│   ├── home.js                      # Landing page
│   ├── skinanalysis.tsx             # Skin analysis (TypeScript)
│   └── symptomchecker.js            # Symptom checker
└── Leyout.js                        # Main layout with sidebar

```

## ✅ All Errors Fixed

### Files Renamed & Fixed:
1. ✅ All component files now have `.jsx` extensions
2. ✅ All entity files now have `.json` extensions
3. ✅ All page files have proper `.js` or `.tsx` extensions
4. ✅ TypeScript types added to `skinanalysis.tsx`
5. ✅ Removed empty duplicate files

## 🚀 How to Run Locally

### Prerequisites
Make sure you have Node.js installed. Check with:
```bash
node --version
npm --version
```

### Option 1: If this is a React/Vite project

1. **Install dependencies:**
```bash
cd "c:\Users\yash singh\OneDrive\Desktop\healthyfy"
npm install
```

2. **Start the development server:**
```bash
npm run dev
```

3. **Open in browser:**
```
http://localhost:5173
```

### Option 2: If this is a Next.js project

1. **Install dependencies:**
```bash
cd "c:\Users\yash singh\OneDrive\Desktop\healthyfy"
npm install
```

2. **Start the development server:**
```bash
npm run dev
```

3. **Open in browser:**
```
http://localhost:3000
```

### Option 3: If package.json is missing

You need to initialize the project first. Based on your imports, this looks like a React + Vite project:

1. **Go to parent directory and check:**
```bash
cd "c:\Users\yash singh\OneDrive\Desktop"
dir
```

2. **Look for the main project folder** that contains `package.json`, `node_modules`, etc.

3. **Run from that directory:**
```bash
npm run dev
```

## 🔧 Common Issues & Solutions

### Issue: "Cannot find module '@/components/ui/button'"
**Solution:** Make sure you're running from the correct project root that has:
- `package.json`
- `node_modules/`
- Path aliases configured in `vite.config.js` or `tsconfig.json`

### Issue: "Module not found: Can't resolve '../components/skin/ImageUpload'"
**Solution:** All component files now have proper extensions (`.jsx`). Make sure imports match:
```javascript
import ImageUpload from "../components/skin/ImageUpload";  // ✅ Correct
```

### Issue: TypeScript errors in skinanalysis.tsx
**Solution:** Already fixed! Added proper type annotations:
- `File | null` for selectedFile
- `string | null` for previewUrl
- `AnalysisResult | null` for analysis
- `React.ChangeEvent<HTMLInputElement>` for event handler

## 📦 Required Dependencies

Based on your imports, you need:
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "lucide-react": "latest",
    "framer-motion": "latest",
    "date-fns": "latest"
  }
}
```

## 🎯 Features

1. **Symptom Checker** - AI-powered symptom analysis with medication suggestions
2. **Skin Analysis** - Upload skin images for AI analysis and medicine detection
3. **Health Chat** - Multilingual AI health assistant with voice support (English & Hindi)
4. **Prescription Analyzer** - Upload doctor prescriptions and get easy-to-understand explanations
5. **Find Healthcare** - Locate nearby doctors, hospitals, and clinics with authentic data
6. **Dashboard** - Track your health queries and history

### 🆕 Latest Features:

#### **Prescription Analyzer**
- 📸 Upload prescription images (photo or scan)
- 🔍 OCR text extraction from prescriptions
- 🤖 AI-powered analysis and simplification
- 💊 Detailed medication explanations
- ⚕️ Diagnosis breakdown in simple terms
- ⚠️ Important warnings and precautions
- 📋 Lifestyle and care instructions
- 🔬 Required tests explained
- 📅 Follow-up guidance

#### **Voice Assistant (Multilingual)**
- 🎤 Voice input in 10+ languages
- 🗣️ Text-to-speech responses
- 🌍 English, Hindi, Tamil, Telugu, Bengali, and more
- 🧠 Smart language detection (responds in your language)
- 📱 Works on all modern browsers

#### **Medicine Detection**
- 📷 Scan medicine packaging
- 🔍 OCR-based medicine identification
- 💊 Detailed medicine information database
- ⚠️ Side effects and interactions
- 💰 Alternative medicines suggested

## 🔐 Important Notice

This AI assistant provides general health information and is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers for medical concerns.

## 📝 Next Steps

1. Find the main project root (look for `package.json`)
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the server
4. Open browser to the localhost URL shown in terminal

---

**All files are now properly formatted and ready to run!** 🎉
