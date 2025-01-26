import express from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';

const router = express.Router();
const execAsync = promisify(exec);

const ALLOWED_COMMANDS = [
  'node',
  'npm',
  'ls',
  'pwd',
  'echo',
  'cat',
  'mkdir',
  'touch',
  'rm',
  'cp',
  'mv'
];

const isCommandAllowed = (cmd) => {
  const command = cmd.split(' ')[0];
  return ALLOWED_COMMANDS.includes(command);
};

router.post('/execute', async (req, res) => {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ error: 'No command provided' });
  }

  if (!isCommandAllowed(command)) {
    return res.status(403).json({ error: 'Command not allowed' });
  }

  try {
    const { stdout, stderr } = await execAsync(command);
    res.json({ output: stdout || stderr });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;