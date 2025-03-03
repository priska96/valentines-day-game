import re

# File paths
underwater_tiles_file = "underwaterTiles.ts"
underwater_files = ["underwater.ts", "underwater2.ts", "underwater3.ts"]

def extract_tile_keys(filename):
    """Extract tile keys from the UNDERWATER_TILE_IMAGES object in underwaterTiles.ts."""
    tile_keys = set()
    
    try:
        with open(filename, "r", encoding="utf-8") as file:
            content = file.read()

            # Match everything inside the UNDERWATER_TILE_IMAGES object
            match = re.search(r'UNDERWATER_TILE_IMAGES\s*:\s*\{[^}]+\}\s*=\s*\{([^}]+)\}', content, re.DOTALL)
            if match:
                tile_content = match.group(1)

                # Extract individual keys (identifiers without key-value assignment)
                keys = re.findall(r'\b(underwater_tile\d+)\b', tile_content)
                tile_keys.update(keys)

    except FileNotFoundError:
        print(f"File not found: {filename}")
    print(tile_keys)
    return tile_keys


def extract_used_tiles(filenames):
    """Extract all tile keys used in the underwater map files."""
    used_tiles = set()
    tile_pattern = re.compile(r"'(underwater_tile\d+)'")

    for filename in filenames:
        try:
            with open(filename, "r", encoding="utf-8") as file:
                content = file.read()
                
                # Extract tiles used in map matrices
                tiles = tile_pattern.findall(content)
                used_tiles.update(tiles)

        except FileNotFoundError:
            print(f"File not found: {filename}")

    return used_tiles

# Get all tiles from underwaterTiles.ts
all_tile_keys = extract_tile_keys(underwater_tiles_file)

# Get used tiles from underwater map files
used_tile_keys = extract_used_tiles(underwater_files)

# Find unused tiles
unused_tiles = all_tile_keys - used_tile_keys

# Save results
output_file = "unused_tiles.txt"
with open(output_file, "w", encoding="utf-8") as file:
    file.write("Unused tile keys (consider commenting these out):\n\n")
    for tile in sorted(unused_tiles):
        file.write(f"{tile}\n")

print(f"\nAnalysis complete! Unused tile keys are saved in: {output_file}")
