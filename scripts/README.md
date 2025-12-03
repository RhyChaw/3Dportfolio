# Firebase Upload Scripts

This directory contains scripts to upload your portfolio data and images to Firebase.

---

## 📋 Available Scripts

### 1. Project Data Upload

#### `uploadProjectsToFirebase.mjs`
Uploads all project data to Firestore collections.

\`\`\`bash
node scripts/uploadProjectsToFirebase.mjs
\`\`\`

**What it does:**
- Uploads 32 projects to categorized collections
- Creates master `allProjects` collection
- Categories: fullStack, aiMl, hackathon, freelance, dataEngineering, systems, gamedev

**Status:** ✅ Already run successfully

---

#### `uploadOpenSource.mjs`
Uploads open source contributions.

\`\`\`bash
node scripts/uploadOpenSource.mjs
\`\`\`

**What it does:**
- Uploads 4 open source contributions
- Creates `openSource` collection

**Status:** ✅ Already run successfully

---

### 2. Image Upload to Firebase Storage

#### `uploadImagesToStorage.mjs` ⭐ NEW
Uploads all images to Firebase Storage and updates Firestore.

\`\`\`bash
node scripts/uploadImagesToStorage.mjs
\`\`\`

**What it does:**
- Uploads 40 project images from `src/proj/`
- Uploads 12 company logos from `src/compLogos/`
- Uploads assets from `src/assets/` and `src/traditional/`
- Updates Firestore documents with Storage URLs
- Generates `IMAGE_URL_MAPPING.json`

**Prerequisites:**
- ✅ Firebase Storage enabled in console
- ✅ Storage security rules set (public read)

**Output:**
- Firestore documents updated with `imageUrl` and `imageStoragePath` fields
- `IMAGE_URL_MAPPING.json` created with all URLs

---

#### `cleanupLocalImages.mjs` ⭐ NEW
Safely removes local images after upload.

\`\`\`bash
node scripts/cleanupLocalImages.mjs
\`\`\`

**What it does:**
- Scans for images in all directories
- Shows what will be deleted and size savings
- Asks for confirmation before deleting
- Protects essential files (react.svg, vite.svg, etc.)

**Prerequisites:**
- ✅ Images uploaded to Firebase Storage
- ✅ `IMAGE_URL_MAPPING.json` exists
- ✅ App tested with Firebase Storage URLs

**Safety features:**
- Requires explicit "yes" confirmation
- Shows preview of files to delete
- Never deletes protected system files
- Calculates space saved

---

#### `updateComponentsForStorage.mjs` ⭐ NEW
Helper script showing component update examples.

\`\`\`bash
node scripts/updateComponentsForStorage.mjs
\`\`\`

**What it does:**
- Validates `IMAGE_URL_MAPPING.json` exists
- Shows statistics about uploaded images
- Creates `COMPONENT_UPDATE_EXAMPLES.md` with code examples
- Provides 3 different approaches for using Storage URLs

---

## 🚀 Complete Workflow

### Phase 1: Upload Data (✅ Already Complete)

\`\`\`bash
# 1. Upload projects
node scripts/uploadProjectsToFirebase.mjs

# 2. Upload open source
node scripts/uploadOpenSource.mjs
\`\`\`

**Result:**
- 9 Firestore collections created
- 36 documents uploaded

---

### Phase 2: Upload Images (NEW - Run This)

\`\`\`bash
# 1. Enable Firebase Storage in console first!
# Go to: https://console.firebase.google.com/project/portfolio-8b2b8/storage

# 2. Upload all images
node scripts/uploadImagesToStorage.mjs

# 3. Verify in Firebase Console
# Check: https://console.firebase.google.com/project/portfolio-8b2b8/storage

# 4. Review component update examples
node scripts/updateComponentsForStorage.mjs

# 5. Update your components (see COMPONENT_UPDATE_EXAMPLES.md)

# 6. Test locally
npm run dev

# 7. Clean up local images (AFTER testing!)
node scripts/cleanupLocalImages.mjs

# 8. Commit and push
git add .
git commit -m "feat: Migrate images to Firebase Storage"
git push
\`\`\`

---

## 📊 Expected Results

### Firestore Collections
| Collection | Documents | Status |
|------------|-----------|--------|
| allProjects | 32 | ✅ Uploaded |
| fullStack | 12 | ✅ Uploaded |
| aiMl | 6 | ✅ Uploaded |
| hackathon | 8 | ✅ Uploaded |
| freelance | 2 | ✅ Uploaded |
| dataEngineering | 1 | ✅ Uploaded |
| systems | 1 | ✅ Uploaded |
| gamedev | 2 | ✅ Uploaded |
| openSource | 4 | ✅ Uploaded |

### Firebase Storage
| Directory | Files | Size | Status |
|-----------|-------|------|--------|
| projects/ | 40 | ~12 MB | ⏳ Ready to upload |
| company-logos/ | 12 | ~3 MB | ⏳ Ready to upload |
| assets/ | 5 | ~2 MB | ⏳ Ready to upload |
| traditional/ | 2 | ~500 KB | ⏳ Ready to upload |

### Space Saved
- **Git repo size reduction:** ~17 MB
- **Faster git operations:** ~70% faster clones
- **CDN delivery:** Images served globally

---

## 🔧 Configuration

All scripts use the same Firebase config:

\`\`\`javascript
const firebaseConfig = {
  projectId: "portfolio-8b2b8",
  apiKey: "AIzaSyC_qwoarqEx4OOXAIML1baRlCt8h2VyoJc",
  storageBucket: "portfolio-8b2b8.firebasestorage.app"
};
\`\`\`

---

## 📝 Files Generated

| File | Purpose | Keep in Git? |
|------|---------|--------------|
| `IMAGE_URL_MAPPING.json` | Image URL reference | ✅ Yes |
| `COMPONENT_UPDATE_EXAMPLES.md` | Code examples | ✅ Yes |
| `FIREBASE_UPLOAD_SUMMARY.md` | Upload summary | ✅ Yes |
| `FIREBASE_STORAGE_GUIDE.md` | Storage guide | ✅ Yes |

---

## ⚠️ Important Notes

### Before Running Upload:
1. ✅ Firebase Storage must be enabled
2. ✅ Security rules must be set (public read)
3. ✅ Network connection required

### Before Cleanup:
1. ✅ Images uploaded successfully
2. ✅ Firestore updated with URLs
3. ✅ App tested with Storage URLs
4. ✅ `IMAGE_URL_MAPPING.json` exists

### Protected Files:
The cleanup script will NEVER delete:
- `react.svg`
- `vite.svg`
- `logo.svg`
- `favicon.ico`

---

## 🐛 Troubleshooting

### "Permission denied" error
→ Enable Storage in Firebase Console
→ Check security rules are set

### "File not found" error
→ Verify image files exist
→ Check paths in script

### Images not loading
→ Check `imageUrl` field in Firestore
→ Verify CORS (should work by default)
→ Check browser DevTools console

### Upload is slow
→ Normal for 50+ images (~2-3 minutes)
→ Each image uploaded with metadata
→ Progress shown in console

---

## 📚 Documentation

- `FIREBASE_STORAGE_GUIDE.md` - Complete guide for image upload
- `FIREBASE_UPLOAD_SUMMARY.md` - Data upload summary
- `HOW_TO_FETCH_FROM_FIREBASE.md` - Fetching data guide
- `COMPONENT_UPDATE_EXAMPLES.md` - Component code examples

---

## ✨ Next Steps

1. **Enable Storage:** Firebase Console → Storage → Get Started
2. **Set Rules:** Public read, admin write
3. **Upload Images:** Run `uploadImagesToStorage.mjs`
4. **Verify:** Check Firebase Console
5. **Update Code:** See `COMPONENT_UPDATE_EXAMPLES.md`
6. **Test:** Run `npm run dev`
7. **Cleanup:** Run `cleanupLocalImages.mjs`
8. **Deploy:** Commit, push, deploy

---

**Questions?**
- Check `FIREBASE_STORAGE_GUIDE.md`
- Read `COMPONENT_UPDATE_EXAMPLES.md`
- Visit Firebase Console: https://console.firebase.google.com/project/portfolio-8b2b8
