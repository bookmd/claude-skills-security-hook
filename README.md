# Claude Skills Security Hook

A security system that allows Claude to safely run custom Skills while preventing dangerous commands in Cursor IDE.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-lightgrey.svg)

## 🎯 Why Use This?

- **🛡️ Enable Claude Skills** - Let Claude run your custom scripts safely
- **🚫 Block dangerous commands** - Prevent accidental system damage  
- **✅ Whitelist approach** - Only approved commands can execute
- **🔒 Skills protection** - Run automation scripts without security risks

## 🚀 Quick Start

### 1. Download and Install

```bash
# Clone the repository
git clone https://github.com/bookmd/claude-skills-security-hook.git

# Create directories
mkdir -p .claude/hooks .cursor

# Copy files
cp claude-skills-security-hook/cursor-settings.json .cursor/settings.json
cp -r claude-skills-security-hook/hooks/* .claude/hooks/

# Install dependencies
cd .claude/hooks
npm install
```

### 2. Restart Cursor

Close and reopen Cursor completely.

### 3. Test Installation

```bash
cd .claude/hooks
echo '{"tool_name": "Shell", "tool_input": {"command": "ls"}}' | node index.js
```

Should display: `✅ ALLOWED: Safe command`

## 🔐 Security Rules

### ✅ **ALLOWED Commands**
- Safe system commands: `ls`, `pwd`, `echo`, `git`
- Package management: `npm`, `node`
- File reading: `cat package.json`
- **Custom skills from `scripts/` directory**

### 🚫 **BLOCKED Commands**
- **Sensitive files**: `.env`, `password`, `secret`, `key`, `token`
- **Dangerous operations**: `rm -rf`, `sudo`, `chmod 777`, `del`, `format`
- **Everything else** not explicitly allowed

## 📁 File Structure

```
your-project/
├── .cursor/
│   └── settings.json          ← Cursor configuration
├── .claude/
│   └── hooks/
│       ├── index.js          ← Security hook
│       ├── package.json      ← Dependencies
│       └── node_modules/     ← Installed packages
└── scripts/                  ← Your custom skills (optional)
    ├── backup.js
    ├── compress.js
    └── analyze.js
```

## 🛠️ Creating Custom Skills

Create scripts in a `scripts/` directory:

```javascript
// scripts/backup.js
console.log('🗂️ Starting backup...');
// Your backup logic here
console.log('✅ Backup completed!');
```

Then ask Claude: *"Run the backup script"*

Claude will safely execute: `node scripts/backup.js`

## 🔧 Configuration

The hook can be customized by editing `.claude/hooks/index.js`:

```javascript
// Add more safe commands
const safeCommands = ['ls', 'pwd', 'echo', 'git', 'your-command'];

// Add more dangerous patterns to block
const dangerousCommands = ['rm -rf', 'sudo', 'your-dangerous-pattern'];
```

## 🐛 Troubleshooting

### Hook not working?
1. Check files are in correct locations
2. Ensure Node.js is installed
3. Restart Cursor completely
4. Check terminal for error messages

### Commands still blocked?
1. Verify command is in the `safeCommands` array
2. Check for typos in command patterns
3. Review hook logs in terminal

## 📋 Requirements

- **Node.js** ≥ 14.0.0
- **Cursor IDE** with Claude integration
- **npm** for dependency management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Claude Code Hooks documentation](https://egghead.io/secure-your-claude-skills-with-custom-pre-tool-use-hooks~dhqko)
- Built for the Claude/Cursor developer community

---

**⚠️ Important**: This hook provides a security layer but should not be your only line of defense. Always review scripts before running and maintain good security practices.

**🎉 Ready to use Claude Skills securely!**