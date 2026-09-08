#!/bin/sh
# Pre-commit hook for forthexp-wp-theme
# Rebuilds react-dist if files in react/ are staged.

THEME_DIR="$(git rev-parse --show-toplevel 2>/dev/null)"
if [ -z "$THEME_DIR" ]; then
  exit 0
fi

cd "$THEME_DIR" || exit 1

# Check if any staged files are inside react/
STAGED_REACT=$(git diff --cached --name-only | grep "^react/")

if [ -n "$STAGED_REACT" ]; then
  echo "[pre-commit] Staged changes detected in react/. Rebuilding react-dist..."
  
  if [ -d "react" ]; then
    if [ -s "$HOME/.nvm/nvm.sh" ]; then
      export NVM_DIR="$HOME/.nvm"
      . "$NVM_DIR/nvm.sh"
    fi

    npm --prefix react run build || {
      echo "[pre-commit] ERROR: react build failed!"
      exit 1
    }
    
    # Stage updated react-dist files
    git add react-dist/
    echo "[pre-commit] react-dist rebuilt and staged successfully."
  fi
fi

exit 0
