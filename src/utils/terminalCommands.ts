import { NavigateFunction } from 'react-router-dom';

export interface CommandResult {
  output?: string;
  error?: string;
  isSystem?: boolean;
}

interface CommandContext {
  navigate: NavigateFunction;
  setActiveTab: (tab: 'terminal' | 'chat') => void;
  clearHistory: () => void;
  closeTerminal: () => void;
}

const commands = {
  help: (): CommandResult => ({
    output: `Available commands:
  help     - Show this help message
  clear    - Clear terminal
  cd       - Change directory
  ls       - List directory contents
  open     - Open a page (e.g., open /courses)
  chat     - Switch to chat mode
  pwd      - Print working directory
  echo     - Print text to terminal
  date     - Show current date and time
  exit     - Close terminal`,
    isSystem: true
  }),

  clear: ({ clearHistory }: CommandContext): CommandResult => {
    clearHistory();
    return {};
  },

  pwd: (): CommandResult => ({
    output: '/home/project',
    isSystem: true
  }),

  ls: (): CommandResult => ({
    output: `src/
node_modules/
public/
index.html
package.json
tsconfig.json
vite.config.ts`,
    isSystem: true
  }),

  cd: (args: string[]): CommandResult => {
    if (!args.length) {
      return { error: 'cd: missing directory argument' };
    }
    return { output: `Changed directory to ${args[0]}`, isSystem: true };
  },

  date: (): CommandResult => ({
    output: new Date().toString(),
    isSystem: true
  }),

  echo: (args: string[]): CommandResult => ({
    output: args.join(' '),
    isSystem: true
  }),

  open: (args: string[], { navigate }: CommandContext): CommandResult => {
    if (!args.length) {
      return { error: 'open: missing path argument' };
    }
    navigate(args[0]);
    return { output: `Navigating to ${args[0]}...`, isSystem: true };
  },

  chat: ({ setActiveTab }: CommandContext): CommandResult => {
    setActiveTab('chat');
    return { output: 'Switching to chat mode...', isSystem: true };
  },

  exit: ({ closeTerminal }: CommandContext): CommandResult => {
    closeTerminal();
    return {};
  }
};

export const executeCommand = (
  input: string,
  context: CommandContext
): CommandResult => {
  const args = input.trim().split(/\s+/);
  const command = args[0].toLowerCase();
  const commandArgs = args.slice(1);

  const commandFn = commands[command as keyof typeof commands];
  
  if (!commandFn) {
    return {
      error: `Command not found: ${command}. Type 'help' for available commands.`
    };
  }

  try {
    return commandFn(commandArgs, context);
  } catch (error) {
    return {
      error: `Error executing command: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};