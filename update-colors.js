#!/usr/bin/env node
/**
 * Comprehensive Color Update Script
 * Replaces ALL old muted colors with new bright colors
 * Run: node update-colors.js
 */

const fs = require('fs');
const path = require('path');

const colorMappings = {
  // Primary green replacements
  '#A8C5B8': '#14B8A6',
  'hsl(160, 25%, 72%)': 'hsl(172, 80%, 40%)',
  'bg-[#A8C5B8]': 'bg-primary',
  'text-[#A8C5B8]': 'text-primary',
  'border-[#A8C5B8]': 'border-primary',
  'from-[#A8C5B8]': 'from-primary',
  'to-[#A8C5B8]': 'to-primary',
  
  // Secondary blue replacements
  '#A8B8CA': '#2563EB',
  '#A8BFC5': '#2563EB',
  'hsl(192, 20%, 72%)': 'hsl(221, 83%, 53%)',
  'bg-[#A8B8CA]': 'bg-secondary',
  'text-[#A8B8CA]': 'text-secondary',
  'border-[#A8B8CA]': 'border-secondary',
  'from-[#A8B8CA]': 'from-secondary',
  'to-[#A8B8CA]': 'to-secondary',
  
  // Shade variants
  '#96B5AD': '#14B8A6',
  '#96B8AD': '#14B8A6',
  '#9EBDB4': '#14B8A6',
  'to-[#96B5AD]': 'to-primary/80',
  'to-[#96B8AD]': 'to-primary/80',
  'hover:bg-[#96B5AD]': 'hover:bg-primary/90',
  
  // RGBA values
  'rgba(168, 197, 184': 'rgba(20, 184, 166',
  'rgba(168, 184, 202': 'rgba(37, 99, 235',
};

function replaceColorsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  Object.entries(colorMappings).forEach(([oldColor, newColor]) => {
    const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    if (regex.test(content)) {
      content = content.replace(regex, newColor);
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
console.log('🎨 Starting comprehensive color update...\n');
const srcPath = path.join(__dirname, 'src');
const updatedFiles = walkDirectory(srcPath);
console.log(`\n✨ Complete! Updated ${updatedFiles} files.`);