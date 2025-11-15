#!/usr/bin/env node

/**
 * Test script to validate the asset library
 * Run with: node test-asset-library.js
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Asset Library...\n');

// Load assets.json
const assetsPath = path.join(__dirname, 'assets', 'assets.json');
const assetsData = JSON.parse(fs.readFileSync(assetsPath, 'utf8'));

console.log('📦 Metadata Loaded:');
console.log(`   Version: ${assetsData.metadata.version}`);
console.log(`   Source: ${assetsData.metadata.source}`);
console.log(`   License: ${assetsData.metadata.license}`);
console.log(`   Total Assets: ${assetsData.metadata.total_assets}\n`);

// Test each category
let totalAssets = 0;
let totalFiles = 0;
let missingFiles = 0;

console.log('📁 Testing Categories:\n');

for (const category of assetsData.metadata.categories) {
  const assets = assetsData.assets[category];
  const assetCount = Object.keys(assets).length;
  totalAssets += assetCount;
  
  let categoryMissing = 0;
  
  for (const [, asset] of Object.entries(assets)) {
    const filePath = path.join(__dirname, asset.file);
    if (fs.existsSync(filePath)) {
      totalFiles++;
    } else {
      categoryMissing++;
      missingFiles++;
      console.log(`   ❌ Missing: ${asset.file}`);
    }
  }
  
  const status = categoryMissing === 0 ? '✅' : '⚠️';
  console.log(`   ${status} ${category}: ${assetCount} assets (${categoryMissing} missing)`);
}

console.log('\n' + '='.repeat(50));
console.log('📊 Test Results:');
console.log('='.repeat(50));
console.log(`   Total assets in metadata: ${totalAssets}`);
console.log(`   Total files found: ${totalFiles}`);
console.log(`   Missing files: ${missingFiles}`);

// Test object matching algorithm
console.log('\n🔍 Testing Object Matching:\n');

function matchObjectToAsset(detectedName, assetsLibrary) {
  const name = detectedName.toLowerCase();
  
  // Search through all categories
  for (const category in assetsLibrary.assets) {
    for (const assetId in assetsLibrary.assets[category]) {
      const asset = assetsLibrary.assets[category][assetId];
      
      // 1. Exact name match
      if (asset.name.toLowerCase() === name) {
        return asset;
      }
      
      // 2. Keyword match
      if (asset.keywords.some(keyword => 
        name.includes(keyword) || keyword.includes(name)
      )) {
        return asset;
      }
    }
  }
  
  // 3. No match - return mystery object
  return assetsLibrary.assets.fallback.mystery_object;
}

// Test cases
const testCases = [
  'teddy bear',
  'stuffed animal',
  'soccer ball',
  't-shirt',
  'book',
  'mobile phone',
  'unknown object'
];

testCases.forEach(testCase => {
  const match = matchObjectToAsset(testCase, assetsData);
  console.log(`   "${testCase}" → ${match.name} ${match.emoji}`);
});

// Final result
console.log('\n' + '='.repeat(50));
if (missingFiles === 0 && totalAssets === assetsData.metadata.total_assets) {
  console.log('✅ ALL TESTS PASSED!');
  console.log('   Asset library is complete and ready for use.');
} else {
  console.log('⚠️  SOME ISSUES FOUND:');
  if (missingFiles > 0) {
    console.log(`   - ${missingFiles} files are missing`);
  }
  if (totalAssets !== assetsData.metadata.total_assets) {
    console.log(`   - Asset count mismatch: ${totalAssets} vs ${assetsData.metadata.total_assets}`);
  }
}
console.log('='.repeat(50) + '\n');
