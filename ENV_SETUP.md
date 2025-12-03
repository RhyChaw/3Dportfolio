# Environment Variables Setup

## 🔐 Firebase Credentials Secured!

Your Firebase credentials are now stored in environment variables for better security.

---

## 📁 Files Created

### 1. `.env` (Your actual credentials)
- ✅ Contains your real Firebase configuration
- ✅ Added to `.gitignore` (will NOT be committed)
- ⚠️ **NEVER commit this file to git**

### 2. `.env.example` (Template for others)
- ✅ Template with placeholder values
- ✅ Safe to commit to git
- ✅ Shows others what environment variables are needed

### 3. `firebase.js` (Updated)
- ✅ Now uses `import.meta.env.VITE_*` variables
- ✅ No hardcoded credentials
- ✅ Works with Vite automatically

---

## 🚀 How It Works

### For Development (Local)
Vite automatically loads `.env` file when you run:

```bash
npm run dev
```

Your app will use the credentials from `.env`

### For Production (Vercel/Netlify)
Add environment variables in your hosting platform:

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add each variable:
   - `VITE_FIREBASE_API_KEY` = `AIzaSyC_qwoarqEx4OOXAIML1baRlCt8h2VyoJc`
   - `VITE_FIREBASE_AUTH_DOMAIN` = `portfolio-8b2b8.firebaseapp.com`
   - etc.

**Netlify:**
1. Go to Site Settings → Environment Variables
2. Add each variable (same as above)

---

## 📋 Environment Variables Reference

| Variable | Example Value | Description |
|----------|---------------|-------------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyC_q...` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | `project.firebaseapp.com` | Auth domain |
| `VITE_FIREBASE_PROJECT_ID` | `project-id` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | `project.appspot.com` | Storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `123456789` | Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | `1:123:web:abc` | Firebase app ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-XXXXXXXXX` | Analytics measurement ID |

---

## 🔒 Security Notes

### ✅ Safe Practices
- `.env` is in `.gitignore` ✅
- Environment variables used instead of hardcoded values ✅
- `.env.example` provides template without exposing secrets ✅

### ⚠️ Important
- **Never commit `.env`** to git
- **Never share `.env`** file publicly
- **Always use `.env.example`** as template for others
- **Set production variables** in hosting platform dashboard

---

## 🧪 Testing

Verify your setup works:

```bash
# Start dev server
npm run dev

# Check if Firebase connects (no errors in console)
# Open browser and check for Firebase errors
```

If you see Firebase connection errors, check:
1. `.env` file exists
2. All variables are set correctly
3. No extra spaces or quotes around values
4. Restart dev server after changing `.env`

---

## 👥 For Team Members

If someone else clones your repo:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in their Firebase credentials in `.env`

3. Start the dev server:
   ```bash
   npm run dev
   ```

---

## 📚 Additional Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Firebase Configuration](https://firebase.google.com/docs/web/setup)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)

---

## ✨ What Changed

### Before:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC_qwoarqEx4OOXAIML1baRlCt8h2VyoJc",
  // ... hardcoded values
};
```

### After:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // ... environment variables
};
```

**Benefits:**
- 🔐 Credentials not in source code
- 🔄 Easy to change per environment
- 👥 Safe to share code publicly
- 🚀 Works seamlessly with hosting platforms

---

**Status:** ✅ Environment variables configured successfully!

