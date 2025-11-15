#!/usr/bin/env python3
"""
Script to copy FluentUI Emoji 3D assets based on asset-mapping.json
This copies the necessary emoji PNG files from the FluentUI repository
"""

import json
import shutil
from pathlib import Path

# Configuration - using relative paths for portability
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
SOURCE_DIR = Path("/tmp/fluentui-emoji/assets")  # External source, can be overridden via env var
TARGET_DIR = PROJECT_ROOT / "assets"
MAPPING_FILE = TARGET_DIR / "asset-mapping.json"

def copy_asset(category, asset_id, source_name):
    """Copy a single asset from source to target directory"""
    # Construct source path
    source_path = SOURCE_DIR / source_name / "3D"
    
    # Find the PNG file in the 3D directory
    if source_path.exists():
        png_files = list(source_path.glob("*.png"))
        
        if png_files:
            source_file = png_files[0]
            target_file = TARGET_DIR / category / f"{asset_id}.png"
            
            # Ensure target directory exists
            target_file.parent.mkdir(parents=True, exist_ok=True)
            
            # Copy the file
            shutil.copy2(source_file, target_file)
            print(f"✓ Copied: {category}/{asset_id}.png (from {source_name})")
            return True
        else:
            print(f"✗ Missing: {source_name} (3D PNG not found)")
            return False
    else:
        print(f"✗ Missing: {source_name} (folder not found)")
        return False

def main():
    """Main function to copy all assets"""
    print("Starting asset copy process...")
    print(f"Source: {SOURCE_DIR}")
    print(f"Target: {TARGET_DIR}")
    print()
    
    # Check if source directory exists
    if not SOURCE_DIR.exists():
        print(f"ERROR: Source directory not found: {SOURCE_DIR}")
        print("Please ensure FluentUI Emoji repository is cloned to /tmp/fluentui-emoji")
        return
    
    # Load asset mapping
    if not MAPPING_FILE.exists():
        print(f"ERROR: Mapping file not found: {MAPPING_FILE}")
        return
    
    with open(MAPPING_FILE, 'r') as f:
        asset_mapping = json.load(f)
    
    # Counters
    total = 0
    copied = 0
    missing = 0
    
    # Process each category
    for category, items in asset_mapping.items():
        print(f"\n--- Processing {category} ---")
        for item in items:
            total += 1
            if copy_asset(category, item['id'], item['source']):
                copied += 1
            else:
                missing += 1
    
    # Print summary
    print("\n" + "=" * 50)
    print("Asset Copy Summary:")
    print(f"  Total assets: {total}")
    print(f"  Successfully copied: {copied}")
    print(f"  Missing/Not found: {missing}")
    print(f"  Success rate: {(copied/total*100):.1f}%")
    print("=" * 50)

if __name__ == "__main__":
    main()
