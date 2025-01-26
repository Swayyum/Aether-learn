import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal as TerminalIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { generateResponse } from '../utils/chatResponses';
import { executeCommand } from '../utils/terminalCommands';
import TerminalHeader from './terminal/TerminalHeader';
import TerminalContent from './terminal/TerminalContent';
import TerminalInput from './terminal/TerminalInput';
import { Message } from '../types/chat';

interface Command {
  text: string;
  output?: string;
  isError?: boolean;
  isSystem?: boolean;
}

const Terminal = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isPoppedOut, setIsPoppedOut] = useState(false);
  const [activeTab, setActiveTab] = useState<'terminal' | 'chat'>('terminal');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 600, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const portalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!portalRef.current) {
      const div = document.createElement('div');
      div.id = 'terminal-portal';
      document.body.appendChild(div);
      portalRef.current = div;
    }

    return () => {
      if (portalRef.current?.parentElement) {
        portalRef.current.parentElement.removeChild(portalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, activeTab]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (terminalRef.current && !terminalRef.current.contains(event.target as Node)) {
        if (!isPoppedOut) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPoppedOut]);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.button !== 0 || !isPoppedOut) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }, [isPoppedOut, position]);

  const handleDrag = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging || !isPoppedOut) return;
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    const maxX = window.innerWidth - 600;
    const maxY = window.innerHeight - 400;
    setPosition({
      x: Math.min(Math.max(0, newX), maxX),
      y: Math.min(Math.max(0, newY), maxY)
    });
  }, [isDragging, isPoppedOut, dragOffset]);

  const handleDragEnd = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    setIsPoppedOut(false);
    setIsMaximized(false);
    setInput('');
    setHistory([]);
    setMessages([]);
  }, []);

  const handleCommand = useCallback((cmd: string) => {
    if (!cmd.trim()) return;

    const result = executeCommand(cmd, {
      navigate,
      setActiveTab,
      clearHistory: () => setHistory([]),
      closeTerminal: () => setIsOpen(false)
    });

    setHistory(prev => [
      ...prev,
      {
        text: cmd,
        output: result.error || result.output,
        isError: !!result.error,
        isSystem: result.isSystem
      }
    ]);
  }, [navigate, setActiveTab]);

  const handleChat = useCallback((text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = generateResponse(text);
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  }, []);

  const handleSubmit = useCallback((text: string) => {
    if (!text.trim()) return;
    
    if (activeTab === 'terminal') {
      handleCommand(text);
    } else {
      handleChat(text);
    }
    setInput('');
    setHistoryIndex(-1);
  }, [activeTab, handleCommand, handleChat]);

  const TerminalWindow = () => (
    <motion.div
      ref={terminalRef}
      initial={{ opacity: 0, y: isPoppedOut ? -20 : 100 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        height: isMaximized ? '100vh' : '400px',
        width: isPoppedOut ? '600px' : 'auto'
      }}
      exit={{ opacity: 0, y: isPoppedOut ? -20 : 100 }}
      transition={{ duration: 0.2 }}
      className={`${
        isPoppedOut 
          ? 'fixed shadow-2xl'
          : 'fixed bottom-0 left-0 right-0'
      } bg-gray-900 overflow-hidden z-50 flex flex-col`}
      style={isPoppedOut ? {
        top: position.y,
        left: position.x,
        borderRadius: '0.75rem',
        cursor: isDragging ? 'grabbing' : 'auto'
      } : {
        borderTopLeftRadius: isMaximized ? 0 : '0.75rem',
        borderTopRightRadius: isMaximized ? 0 : '0.75rem'
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <TerminalHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMaximized={isMaximized}
        setIsMaximized={setIsMaximized}
        isPoppedOut={isPoppedOut}
        setIsPoppedOut={setIsPoppedOut}
        handleClose={handleClose}
        handleDragStart={handleDragStart}
        handleDrag={handleDrag}
        handleDragEnd={handleDragEnd}
      />

      <TerminalContent
        activeTab={activeTab}
        history={history}
        messages={messages}
        isTyping={isTyping}
      />

      <TerminalInput
        ref={inputRef}
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
        isExecuting={isExecuting}
        isTyping={isTyping}
        historyIndex={historyIndex}
        history={history}
        setHistoryIndex={setHistoryIndex}
        activeTab={activeTab}
      />
    </motion.div>
  );

  return (
    <>
      <motion.button
        className="fixed bottom-6 left-6 bg-gray-900 text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        <TerminalIcon className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          isPoppedOut && portalRef.current ? (
            createPortal(<TerminalWindow />, portalRef.current)
          ) : (
            <TerminalWindow />
          )
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;