# Installation Guide - Claude Security Hook

## Step 1: Prepare Files

1. **Create directories:**
```bash
mkdir -p .claude/hooks
mkdir -p .cursor
```

2. **Copy files:**
```bash
# Copy settings
cp claude-skills-security-hook/cursor-settings.json .cursor/settings.json

# Copy the Hook
cp -r claude-skills-security-hook/hooks/* .claude/hooks/
```

## Step 2: Install Dependencies

```bash
cd .claude/hooks
npm install @anthropic-ai/claude-agent-sdk
```

## Step 3: Test

```bash
# Check that the Hook works:
cd .claude/hooks
echo '{"tool_name": "Shell", "tool_input": {"command": "ls"}}' | node index.js

# Should display:
# 🔍 Hook activated: Shell
# 📝 Command: ls
# ✅ ALLOWED: Safe command
```

## Step 4: Activation

1. **Restart Cursor**
2. **Try asking Claude:** "Show me what's in this directory"
3. **Check that the Hook is working**

## Troubleshooting:

### If the Hook doesn't work:
1. Check that files are in the right place
2. Check that there are execution permissions
3. Check that Node.js is installed
4. Restart Cursor

### If there are errors:
1. Check the logs in terminal
2. Check that JSON syntax is valid
3. Check that file paths are correct

## Final File Structure:

```
Project/
├── .cursor/
│   └── settings.json          ← Cursor settings
├── .claude/
│   └── hooks/
│       ├── index.js          ← The Hook
│       ├── package.json      ← Dependencies
│       └── node_modules/     ← Packages
└── claude-skills-security-hook/  ← Downloaded repo
    ├── README.md
    ├── installation-guide.md
    ├── cursor-settings.json
    └── hooks/
        ├── index.js
        └── package.json
```