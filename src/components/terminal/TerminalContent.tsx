import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Command {
  text: string;
  output?: string;
  isError?: boolean;
  isSystem?: boolean;
}

interface TerminalContentProps {
  activeTab: 'terminal' | 'chat';
  history: Command[];
  messages: Message[];
  isTyping: boolean;
}

const TerminalContent = React.memo(({
  activeTab,
  history,
  messages,
  isTyping
}: TerminalContentProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, history]);

  if (activeTab === 'terminal') {
    return (
      <div className="flex-1 overflow-y-auto p-4 font-mono">
        <div className="text-green-400 mb-4">
          Welcome to Aether Terminal. Type 'help' for available commands.
        </div>
        {history.map((cmd, i) => (
          <div key={i} className="mb-2">
            {cmd.text && (
              <div className="flex items-center text-gray-100">
                <span className="text-green-400 mr-2 select-none">$</span>
                <span>{cmd.text}</span>
              </div>
            )}
            {cmd.output && (
              <div 
                className={`mt-1 ${
                  cmd.isError 
                    ? 'text-red-400' 
                    : cmd.isSystem 
                      ? 'text-blue-300' 
                      : 'text-gray-300'
                }`}
              >
                {cmd.output}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: message.sender === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-100'
                }`}
              >
                <pre className="whitespace-pre-wrap font-sans">{message.text}</pre>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-gray-800 p-3 rounded-lg flex items-center space-x-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
});

TerminalContent.displayName = 'TerminalContent';

export default TerminalContent;