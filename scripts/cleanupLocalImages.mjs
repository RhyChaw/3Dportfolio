import { unlinkSync, readdirSync, existsSync, statSync, readFileSync } from "fs";
import { join, extname } from "path";
import readline from "readline";

// Directories to clean up
const IMAGE_DIRECTORIES = [
  { path: 'src/proj', description: 'Project images' },
  { path: 'src/compLogos', description: 'Company logos' },
  { path: 'src/assets', description: 'General assets (BE CAREFUL!)' },
  { path: 'src/traditional', description: 'Traditional home images' }
];

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];

// Essential files to NEVER delete (even if they match)
const PROTECTED_FILES = [
  'react.svg', // React logo
  'vite.svg',  // Vite logo
  'logo.svg',
  'favicon.ico'
];

/**
 * Ask user for confirmation
 */
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

/**
 * Get all image files from a directory
 */
function getImageFiles(dirPath) {
  try {
    if (!existsSync(dirPath)) {
      return [];
    }
    
    const files = readdirSync(dirPath);
    return files.filter(file => {
      const ext = extname(file).toLowerCase();
      return IMAGE_EXTENSIONS.includes(ext) && !PROTECTED_FILES.includes(file);
    });
  } catch (error) {
    console.warn(`⚠️  Cannot read directory: ${dirPath}`);
    return [];
  }
}

/**
 * Calculate total size of files
 */
function calculateSize(files) {
  let totalBytes = 0;
  files.forEach(file => {
    try {
      const stats = statSync(file);
      totalBytes += stats.size;
    } catch (err) {
      // Skip if file doesn't exist
    }
  });
  return totalBytes;
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Check if URL mapping exists
 */
function checkUrlMappingExists() {
  if (!existsSync('IMAGE_URL_MAPPING.json')) {
    console.log('\n❌ ERROR: IMAGE_URL_MAPPING.json not found!\n');
    console.log('Please run "node scripts/uploadImagesToStorage.mjs" first');
    console.log('to upload images to Firebase Storage before cleaning up.\n');
    return false;
  }
  
  try {
    const mapping = JSON.parse(readFileSync('IMAGE_URL_MAPPING.json', 'utf8'));
    const totalImages = mapping.totalImages || 0;
    
    if (totalImages === 0) {
      console.log('\n⚠️  WARNING: No images found in mapping file!\n');
      console.log('Please verify that images were uploaded successfully.\n');
      return false;
    }
    
    console.log(`✅ Found mapping file with ${totalImages} uploaded images\n`);
    return true;
  } catch (error) {
    console.log('\n❌ ERROR: Cannot read IMAGE_URL_MAPPING.json\n');
    return false;
  }
}

/**
 * Main cleanup function
 */
async function cleanupImages() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║         🧹 Local Image Cleanup Script 🧹                  ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Check if mapping file exists
  if (!checkUrlMappingExists()) {
    process.exit(1);
  }

  console.log('⚠️  WARNING: This will DELETE local image files!\n');
  console.log('Make sure you have:');
  console.log('  1. ✅ Uploaded images to Firebase Storage');
  console.log('  2. ✅ Updated Firestore with URLs');
  console.log('  3. ✅ Tested that images load from Firebase');
  console.log('  4. ✅ Backed up your project (just in case)\n');

  // Scan for images
  let allFiles = [];
  let totalSize = 0;

  console.log('📁 Scanning for images...\n');

  for (const dir of IMAGE_DIRECTORIES) {
    const imageFiles = getImageFiles(dir.path);
    
    if (imageFiles.length > 0) {
      console.log(`   ${dir.description}: ${imageFiles.length} files`);
      
      const fullPaths = imageFiles.map(f => join(dir.path, f));
      allFiles.push(...fullPaths);
      totalSize += calculateSize(fullPaths);
    }
  }

  if (allFiles.length === 0) {
    console.log('\n✨ No images found to clean up!\n');
    process.exit(0);
  }

  console.log(`\n📊 Total: ${allFiles.length} images (${formatBytes(totalSize)})\n`);

  // Show preview of files to delete
  console.log('Files to be deleted:');
  allFiles.slice(0, 10).forEach(file => {
    console.log(`   - ${file}`);
  });
  if (allFiles.length > 10) {
    console.log(`   ... and ${allFiles.length - 10} more files`);
  }
  console.log('');

  // Ask for confirmation
  const answer = await askQuestion('❓ Do you want to delete these files? (yes/no): ');

  if (answer.toLowerCase() !== 'yes') {
    console.log('\n❌ Cleanup cancelled. No files were deleted.\n');
    process.exit(0);
  }

  // Delete files
  console.log('\n🗑️  Deleting files...\n');

  let deletedCount = 0;
  let failedCount = 0;

  for (const file of allFiles) {
    try {
      unlinkSync(file);
      console.log(`   ✅ Deleted: ${file}`);
      deletedCount++;
    } catch (error) {
      console.log(`   ❌ Failed: ${file} (${error.message})`);
      failedCount++;
    }
  }

  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║              ✅ Cleanup Complete! ✅                       ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log(`📊 Summary:`);
  console.log(`   ✅ Deleted: ${deletedCount} files`);
  if (failedCount > 0) {
    console.log(`   ❌ Failed: ${failedCount} files`);
  }
  console.log(`   💾 Space saved: ${formatBytes(totalSize)}\n`);

  console.log('🎯 Next Steps:');
  console.log('   1. Test your app to ensure images load from Firebase');
  console.log('   2. Add image directories to .gitignore (optional)');
  console.log('   3. Commit changes: git add . && git commit -m "Remove images, use Firebase Storage"');
  console.log('   4. Push to repo: git push\n');
}

// Run cleanup
cleanupImages();

