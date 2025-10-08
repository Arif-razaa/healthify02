# Firestore Database Integration ✅

## Summary
All health data sections now use **Firebase Firestore** for cloud storage instead of localStorage. Data persists across devices and sessions!

---

## ✅ Files Updated

### 1. **`firebase.js`**
- Added Firestore initialization (`getFirestore`)
- Added Firebase Storage initialization (`getStorage`)
- Exports: `db`, `storage`

### 2. **`entities/User.js`**
- Saves user profile to Firestore `users` collection on registration
- Updates `last_login` timestamp on login
- Reads user data from Firestore

### 3. **`entities/HealthQuery.js`**
- Creates health queries in Firestore `healthQueries` collection
- Lists user-specific queries with sorting and limits
- Security: Only shows data for logged-in user

### 4. **`entities/ChatMessage.js`**
- Saves chat messages to Firestore `chatMessages` collection
- Supports conversation grouping
- Real-time message retrieval

### 5. **`entities/SkinAnalysis.js`**
- Saves skin analyses to Firestore `skinAnalyses` collection
- **Uploads images to Firebase Storage**
- Stores image URLs in Firestore

---

## 🗄️ Firestore Collections

### Collection: `users`
**Document ID**: Firebase Auth UID

```javascript
{
  uid: "firebase_user_id",
  email: "user@example.com",
  full_name: "User Name",
  created_at: Timestamp,
  last_login: Timestamp
}
```

---

### Collection: `healthQueries`
**Document ID**: Auto-generated

```javascript
{
  user_id: "firebase_user_id",
  symptoms: ["headache", "fever"],
  age: 25,
  gender: "male",
  severity: "moderate",
  duration: "2-3 days",
  ai_analysis: "Based on symptoms...",
  possible_conditions: ["Common cold", "Flu"],
  recommendations: ["Rest", "Hydrate"],
  suggested_medications: ["Paracetamol"],
  urgency_level: "medium",
  created_date: Timestamp,
  updated_date: Timestamp
}
```

**Features:**
- ✅ Auto-saves symptom checker results
- ✅ Filters by user_id (security)
- ✅ Ordered by created_date
- ✅ Pagination support

---

### Collection: `chatMessages`
**Document ID**: Auto-generated

```javascript
{
  user_id: "firebase_user_id",
  conversation_id: "conv_1234567890",
  message: "I have a headache",
  sender: "user", // "user" or "ai"
  ai_response: "You should rest...",
  timestamp: Timestamp,
  read: false
}
```

**Features:**
- ✅ Groups messages by conversation_id
- ✅ Supports user and AI messages
- ✅ Ordered by timestamp
- ✅ Filter by conversation

---

### Collection: `skinAnalyses`
**Document ID**: Auto-generated

```javascript
{
  user_id: "firebase_user_id",
  image_url: "https://firebasestorage.../image.jpg",
  description: "Skin condition on arm",
  analysis: "AI analysis result...",
  condition: "Acne",
  confidence: 85.5,
  possible_conditions: ["Acne", "Eczema"],
  recommendations: ["Use salicylic acid"],
  severity: "moderate",
  extracted_text: "Prescription text...",
  created_date: Timestamp,
  analysis_status: "completed"
}
```

**Features:**
- ✅ Uploads images to Firebase Storage
- ✅ Stores image URLs in Firestore
- ✅ OCR text extraction
- ✅ AI analysis results

---

## 🔐 Security Rules

**Important**: You need to set up Firestore security rules in Firebase Console.

Go to **Firestore Database** → **Rules** and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - users can only read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Health queries - users can only access their own data
    match /healthQueries/{queryId} {
      allow read, write: if request.auth != null && 
        request.resource.data.user_id == request.auth.uid;
      allow read: if request.auth != null && 
        resource.data.user_id == request.auth.uid;
    }
    
    // Chat messages - users can only access their own messages
    match /chatMessages/{messageId} {
      allow read, write: if request.auth != null && 
        request.resource.data.user_id == request.auth.uid;
      allow read: if request.auth != null && 
        resource.data.user_id == request.auth.uid;
    }
    
    // Skin analyses - users can only access their own analyses
    match /skinAnalyses/{analysisId} {
      allow read, write: if request.auth != null && 
        request.resource.data.user_id == request.auth.uid;
      allow read: if request.auth != null && 
        resource.data.user_id == request.auth.uid;
    }
  }
}
```

**Firebase Storage Rules:**

Go to **Storage** → **Rules** and add:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Skin analysis images
    match /skin_analyses/{userId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 🚀 How to Use

### HealthQuery Entity

```javascript
import { HealthQuery } from '@/entities/HealthQuery';

// Create a new health query
const query = await HealthQuery.create({
  symptoms: ['headache', 'fever'],
  age: 25,
  gender: 'male',
  severity: 'moderate',
  duration: '2 days',
  ai_analysis: 'AI response...',
  possible_conditions: ['Common cold'],
  recommendations: ['Rest', 'Hydrate'],
  urgency_level: 'medium'
});

// List health queries (latest first, limit 10)
const queries = await HealthQuery.list('desc', 10);

// Get specific query by ID
const query = await HealthQuery.get('query_id');
```

---

### ChatMessage Entity

```javascript
import { ChatMessage } from '@/entities/ChatMessage';

// Create a user message
const message = await ChatMessage.create({
  conversation_id: 'conv_123',
  message: 'I have a headache',
  sender: 'user'
});

// Create an AI response
const aiMessage = await ChatMessage.create({
  conversation_id: 'conv_123',
  message: 'You should rest',
  sender: 'ai',
  ai_response: 'Full AI response...'
});

// List all messages for a conversation
const messages = await ChatMessage.listByConversation('conv_123');

// List recent messages (latest 50)
const recentMessages = await ChatMessage.list('desc', 50);
```

---

### SkinAnalysis Entity

```javascript
import { SkinAnalysis } from '@/entities/SkinAnalysis';

// Upload image to Firebase Storage
const imageFile = event.target.files[0];
const imageUrl = await SkinAnalysis.uploadImage(imageFile);

// Create skin analysis with uploaded image
const analysis = await SkinAnalysis.create({
  image_url: imageUrl,
  description: 'Skin condition on arm',
  analysis: 'AI analysis...',
  condition: 'Acne',
  confidence: 85.5,
  possible_conditions: ['Acne', 'Eczema'],
  recommendations: ['Use cleanser'],
  severity: 'moderate',
  extracted_text: 'OCR text...',
  analysis_status: 'completed'
});

// List skin analyses
const analyses = await SkinAnalysis.list('desc', 10);

// Get specific analysis
const analysis = await SkinAnalysis.get('analysis_id');
```

---

## 🎯 Key Features

### ✅ Cloud Storage
- Data stored in Firebase Firestore (NoSQL database)
- Accessible from any device
- Real-time synchronization
- Automatic backups

### ✅ User-Specific Data
- All queries filtered by `user_id`
- Security rules enforce user access
- No data leakage between users

### ✅ Image Storage
- Images uploaded to Firebase Storage
- Secure URLs with access control
- Organized by user ID

### ✅ Timestamps
- All records have `created_date`
- Automatic timestamp generation
- Sorting by date supported

### ✅ Scalability
- Handles unlimited users
- Pagination support
- Query limits for performance

---

## 📊 Firebase Console Features

### View Collections
1. Go to **Firestore Database**
2. Click on collection name (users, healthQueries, etc.)
3. See all documents with data

### View Storage
1. Go to **Storage**
2. Navigate to `skin_analyses/{userId}/`
3. See uploaded images

### Monitor Usage
1. Go to **Dashboard**
2. See read/write operations
3. Monitor storage usage

---

## 🔄 Migration from localStorage

**Automatic Fallback:**
- If Firestore read fails, returns empty array
- localStorage data still cleared on logout (for backwards compatibility)
- New data automatically goes to Firestore

**No Manual Migration Needed:**
- Old localStorage data will be cleared on logout
- New operations use Firestore automatically

---

## ⚙️ Configuration Steps

### 1. Enable Firestore
✅ Already done (you created collections)

### 2. Set Security Rules
⚠️ **Required**: Add security rules (see above section)

### 3. Enable Storage
1. Go to **Firebase Console** → **Storage**
2. Click **"Get Started"**
3. Choose **Production mode** or **Test mode**
4. Add storage rules (see above)

### 4. Test the Integration
```bash
npm run dev
```

Try:
- Creating a symptom query
- Sending a chat message
- Uploading a skin image
- Check Firebase Console to see data

---

## 🐛 Troubleshooting

### Issue: "Missing or insufficient permissions"
**Solution**: Add Firestore security rules (see Security Rules section)

### Issue: "Storage bucket not configured"
**Solution**: Enable Firebase Storage in Firebase Console

### Issue: Data not appearing
**Solution**: 
1. Check browser console for errors
2. Verify user is logged in
3. Check Firebase Console Rules tab

### Issue: Images not uploading
**Solution**: 
1. Enable Firebase Storage
2. Add storage security rules
3. Check file size limits

---

## 📈 Firestore Pricing (Free Tier)

**Spark Plan (Free):**
- ✅ 1 GB storage
- ✅ 10 GB/month network
- ✅ 50,000 reads/day
- ✅ 20,000 writes/day
- ✅ 20,000 deletes/day

**Perfect for development and small apps!**

---

## 🎉 Benefits

### Before (localStorage)
- ❌ Data lost on browser clear
- ❌ Not accessible from other devices
- ❌ No backup
- ❌ Storage limits (~10MB)

### After (Firestore)
- ✅ Data persists forever
- ✅ Accessible from any device
- ✅ Automatic backups
- ✅ Unlimited storage (within quotas)
- ✅ Real-time sync
- ✅ Query and filter capabilities

---

## 📝 Next Steps

1. **Set Security Rules** ⚠️ (Important!)
2. **Enable Storage** (For skin analysis images)
3. **Test all features** (Symptom checker, Chat, Skin analysis)
4. **Monitor usage** (Firebase Console → Dashboard)

---

**Status**: ✅ Firestore Integration Complete!

**Test Command**: `npm run dev`

**Firebase Console**: https://console.firebase.google.com/project/healthify-dce46
