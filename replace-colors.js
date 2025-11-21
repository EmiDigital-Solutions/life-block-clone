#!/usr/bin/env node
/**
 * Color Replacement Script
 * Replaces all old color codes with new muted palette
 * Run: node replace-colors.js
 */

const fs = require('fs');
const path = require('path');

const colorMappings = {
  // Old teal to new muted green
  '#14B8A6': '#A8C5B8',
  '#0D9488': '#96B5AD',
  '#0F8775': '#96B5AD',
  '#12A594': '#9EBDB4',
  '#10a897': '#96B5AD',
  
  // Old blue to new muted blue  
  '#2563EB': '#A8BFC5',
  '#1d4ed8': '#98AFB5',
  
  // RGB equivalents
  'rgb(20, 184, 166)': 'rgb(168, 197, 184)',
  'rgb(18, 165, 148)': 'rgb(158, 187, 174)',
  'rgb(15, 135, 117)': 'rgb(148, 177, 164)',
  'rgb(13, 148, 136)': 'rgb(150, 181, 173)',
  'rgb(15, 118, 110)': 'rgb(148, 177, 164)',
  
  'rgb(37, 99, 235)': 'rgb(168, 191, 197)',
  'rgb(29, 78, 216)': 'rgb(158, 181, 187)',
  'rgb(30, 64, 175)': 'rgb(148, 171, 177)',
};

function replaceColorsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  Object.entries(colorMappings).forEach(([oldColor, newColor]) => {
    if (content.includes(oldColor)) {
      content = content.replaceAll(oldColor, newColor);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated: ${filePath}`);
    return true;
  }
  return false;
}

function walkDirectory(dir, pattern = /\.(tsx?|css)$/) {
  const files = fs.readdirSync(dir);
  let updatedCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      updatedCount += walkDirectory(filePath, pattern);
    } else if (stat.isFile() && pattern.test(file)) {
      if (replaceColorsInFile(filePath)) {
        updatedCount++;
      }
    }
  });
  
  return updatedCount;
}

// Run the replacement
console.log('🎨 Starting color replacement...\n');
const srcPath = path.join(__dirname, 'src');
const updatedFiles = walkDirectory(srcPath);
console.log(`\n✨ Complete! Updated ${updatedFiles} files.`);
