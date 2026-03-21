#!/bin/bash
# Build the SuperSkills ZIP file for distribution
set -e

SKILLS_DIR="$HOME/.claude/skills"
BUILD_DIR="/tmp/superskills-build"
OUTPUT="superskills.zip"

# Clean
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR/superskills"

# Copy all skill directories (skip non-skill files)
SKIP_FILES=("AGENTS.md" "CLAUDE.md" "README.md" "LICENSE" "CONTRIBUTING.md" "VERSIONS.md" "validate-skills.sh" "validate-skills-official.sh")

for item in "$SKILLS_DIR"/*/; do
  dirname=$(basename "$item")
  # Skip hidden dirs
  [[ "$dirname" == .* ]] && continue
  cp -r "$item" "$BUILD_DIR/superskills/$dirname"
done

# Add README
cat > "$BUILD_DIR/superskills/README.md" << 'EOF'
# SuperSkills — 106 Pro Skills for Claude Code

## Installation

1. Copy all skill folders to your Claude Code skills directory:

```bash
cp -r superskills/* ~/.claude/skills/
```

2. Restart Claude Code.

3. Use any skill by typing its slash command, e.g. `/react-expert`, `/seo-audit`, `/cold-email`

## Categories

- Frontend Development (11 skills)
- Backend & Frameworks (14 skills)
- Databases & Data (6 skills)
- DevOps & Infrastructure (11 skills)
- API & System Design (5 skills)
- Code Quality & Security (7 skills)
- Conversion Optimization (10 skills)
- SEO & Content (9 skills)
- Sales & Outbound (6 skills)
- Marketing Strategy (9 skills)
- AI & Machine Learning (4 skills)
- Specialized Domains (5 skills)
- Platform-Specific (4 skills)
- Testing & Automation (3 skills)
- Enterprise & Architecture (3 skills)

## Support

Questions? Email netanelpro0123@gmail.com

Enjoy your supercharged Claude Code!
EOF

# Create ZIP
cd "$BUILD_DIR"
zip -r "$OUTPUT" superskills/
mv "$OUTPUT" "$HOME/Desktop/"

echo "✅ Created ~/Desktop/$OUTPUT"
echo "📦 Now upload to Vercel Blob Storage"

# Cleanup
rm -rf "$BUILD_DIR"
