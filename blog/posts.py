import os
import json

posts_folder = 'posts/'
output_file = 'posts.json'

# Ensure the output directory exists, if a directory is specified
output_dir = os.path.dirname(output_file)
if output_dir:  # Only create directories if the path is not empty
    os.makedirs(output_dir, exist_ok=True)

# Get a list of all Markdown files in the folder, excluding hidden files
markdown_files = [
    os.path.splitext(file)[0]  # Remove the .md extension
    for file in os.listdir(posts_folder)
    if file.endswith('.md') and not file.startswith('.')  # Exclude hidden files
]

# Sort the files by year (first 4 characters of the file name)
markdown_files.sort(key=lambda x: x[:4], reverse=True)

# Write the sorted list of file names as a JSON array
with open(output_file, 'w') as f:
    json.dump(markdown_files, f, indent=2)

print(f'Generated {output_file} with {len(markdown_files)} files.')