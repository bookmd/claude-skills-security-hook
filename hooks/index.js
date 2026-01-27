// Claude Security Hook
const fs = require('fs');
const path = require('path');

async function main() {
  try {
    // Read data from stdin
    let inputData = '';
    process.stdin.setEncoding('utf8');
    
    for await (const chunk of process.stdin) {
      inputData += chunk;
    }
    
    const input = JSON.parse(inputData);
    
    // Log for verification
    console.log(`🔍 Hook activated: ${input.tool_name}`);
    
    // If this is a Bash command
    if (input.tool_name === "Shell" || input.tool_name === "Bash") {
      const command = input.tool_input.command;
      console.log(`📝 Command: ${command}`);
      
      // Block sensitive files
      const sensitivePatterns = ['.env', 'password', 'secret', 'key', 'token'];
      for (const pattern of sensitivePatterns) {
        if (command.includes(pattern)) {
          console.log(`🚫 BLOCKED: Sensitive file access detected (${pattern})`);
          process.exit(2);
        }
      }
      
      // Block dangerous commands
      const dangerousCommands = ['rm -rf', 'sudo', 'chmod 777', 'del', 'format'];
      for (const dangerous of dangerousCommands) {
        if (command.includes(dangerous)) {
          console.log(`🚫 BLOCKED: Dangerous command detected (${dangerous})`);
          process.exit(2);
        }
      }
      
      // Allow safe commands
      const safeCommands = ['ls', 'pwd', 'echo', 'cat package.json', 'npm', 'node', 'git'];
      const isSafe = safeCommands.some(safe => command.startsWith(safe));
      
      if (isSafe) {
        console.log(`✅ ALLOWED: Safe command`);
        process.exit(0);
      }
      
      // Allow scripts from scripts directory
      if (command.match(/^(npm run|node|bun run)\s+scripts\//)) {
        console.log(`✅ ALLOWED: Script from scripts directory`);
        process.exit(0);
      }
      
      // Block everything else
      console.log(`🚫 BLOCKED: Command not in allowed list`);
      process.exit(2);
    }
    
    // Allow other tools (non-Bash)
    console.log(`✅ ALLOWED: Non-shell tool`);
    process.exit(0);
    
  } catch (error) {
    console.error('Hook error:', error);
    process.exit(0); // In case of error, allow (fail-safe)
  }
}

main();