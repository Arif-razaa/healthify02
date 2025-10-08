# Firebase Setup Checklist 📋

Complete these steps in Firebase Console to activate all features.

---

## ✅ Step 1: Enable Authentication (REQUIRED)

1. Go to: https://console.firebase.google.com/project/healthify-dce46
2. Click **"Authentication"** in left sidebar
3. Click **"Get Started"** button
4. Go to **"Sign-in method"** tab
5. Click on **"Email/Password"**
6. Toggle **"Enable"** to ON
7. Click **"Save"**

**Status**: ⚠️ Required for login/registration

---

## ✅ Step 2: Set Firestore Security Rules (REQUIRED)

1. Go to **"Firestore Database"** in left sidebar
2. Click **"Rules"** tab at the top
3. **Replace** the existing rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Health queries
    match /healthQueries/{queryId} {
      allow create: if request.auth != null && 
        request.resource.data.user_id == request.auth.uid;
      allow read, update, delete: if request.auth != null && 
        resource.data.user_id == request.auth.uid;
    }
    
    // Chat messages
    match /chatMessages/{messageId} {
      allow create: if request.auth != null && 
        request.resource.data.user_id == request.auth.uid;
      allow read, update, delete: if request.auth != null && 
        resource.data.user_id == request.auth.uid;
    }
    
    // Skin analyses
    match /skinAnalyses/{analysisId} {
      allow create: if request.auth != null && 
        request.resource.data.user_id == request.auth.uid;
      allow read, update, delete: if request.auth != null && 
        resource.data.user_id == request.auth.uid;
    }
  }
}
```

4. Click **"Publish"**

**Status**: ⚠️ Required for data security

---

## ✅ Step 3: Enable Firebase Storage (REQUIRED for Skin Analysis)

1. Go to **"Storage"** in left sidebar
2. Click **"Get Started"** button
3. Click **"Next"** (keep default location)
4. Click **"Done"**

### Set Storage Security Rules:

1. In Storage, click **"Rules"** tab
2. **Replace** with:

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

3. Click **"Publish"**

**Status**: ⚠️ Required for skin image uploads

---

## ✅ Step 4: Verify Collections (Already Done ✓)

Your collections are already created:
- ✅ `users`
- ✅ `healthQueries`
- ✅ `chatMessages`
- ✅ `skinAnalyses`

You can view them in **Firestore Database** → **Data** tab

---

## ✅ Step 5: Test the App

```bash
npm run dev
```

### Test 1: Authentication
1. Open http://localhost:5173
2. Click **"Sign Up"**
3. Enter email, password, full name
4. Should redirect to dashboard
5. ✅ Check Firebase Console → Authentication → Users (new user should appear)

### Test 2: Firestore Data
1. Use the **Symptom Checker** feature
2. Submit symptoms
3. ✅ Check Firestore Database → healthQueries (new document should appear)

### Test 3: Chat Messages
1. Go to **Health Chat**
2. Send a message
3. ✅ Check Firestore Database → chatMessages (new document should appear)

### Test 4: Skin Analysis (if enabled)
1. Go to **Skin Analysis**
2. Upload an image
3. ✅ Check Storage → skin_analyses (image should appear)
4. ✅ Check Firestore Database → skinAnalyses (document with image URL)

---

## 🔍 Monitoring & Debug

### View Real-Time Data
1. Open Firebase Console → **Firestore Database**
2. Open your app in browser
3. Perform actions (symptom check, chat, etc.)
4. Refresh Firestore Database to see new documents

### Check Authentication
1. Firebase Console → **Authentication** → **Users**
2. See all registered users
3. View last sign-in time

### Monitor Usage
1. Firebase Console → **Dashboard**
2. See API requests, storage usage
3. Check if within free tier limits

---

## ⚠️ Common Issues & Fixes

### Issue: "Missing or insufficient permissions"
**Cause**: Security rules not set
**Fix**: Complete Step 2 (Set Firestore Security Rules)

### Issue: Login not working
**Cause**: Email/Password auth not enabled
**Fix**: Complete Step 1 (Enable Authentication)

### Issue: Images not uploading
**Cause**: Storage not enabled or rules not set
**Fix**: Complete Step 3 (Enable Firebase Storage)

### Issue: Data not saving
**Cause**: User not logged in
**Fix**: Make sure to login first before using features

---

## 📊 Free Tier Limits

**Firestore:**
- ✅ 1 GB storage
- ✅ 50,000 reads/day
- ✅ 20,000 writes/day
- ✅ 20,000 deletes/day

**Storage:**
- ✅ 5 GB storage
- ✅ 1 GB/day downloads
- ✅ 20,000 uploads/day

**Authentication:**
- ✅ Unlimited users (free forever!)

**You're well within limits for development!**

---

## ✅ Quick Checklist

Before testing your app, make sure:

- [ ] Email/Password authentication enabled
- [ ] Firestore security rules set
- [ ] Firebase Storage enabled (if using skin analysis)
- [ ] Storage security rules set (if using skin analysis)
- [ ] Collections visible in Firestore Database

---

## 🚀 Ready to Test!

Once all steps are complete:

1. Run: `npm run dev`
2. Register a new account
3. Try all features
4. Check Firebase Console to see data appearing in real-time

---

## 📚 Documentation Files

- **`FIREBASE_AUTH_SETUP.md`** - Authentication setup guide
- **`FIRESTORE_INTEGRATION.md`** - Complete Firestore integration docs
- **`FIREBASE_SETUP_CHECKLIST.md`** - This checklist

---

**Project**: healthify-dce46  
**Console**: https://console.firebase.google.com/project/healthify-dce46

**Status**: 🎯 Ready for Firebase Console setup!
