import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X } from 'lucide-react';
import { generateResponse } from '../utils/chatResponses';
import { Message } from '../types/chat';
import { useTheme } from '../context/ThemeContext';

const AIChat = () => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        const greetingMessage: Message = {
          id: Date.now().toString(),
          text: "👋 Hi there! I'm your AI Learning Assistant. I'm here to help you with machine learning concepts, answer questions about our courses, or provide guidance on your learning journey. What would you like to know?",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages([greetingMessage]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = generateResponse(userMessage.text);
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  return (
    <>
      <motion.button
        className={`fixed bottom-6 right-6 ${
          isDark ? 'bg-indigo-500' : 'bg-indigo-600'
        } text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-200`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-24 right-6 w-96 h-[600px] ${
              isDark ? 'bg-gray-900' : 'bg-white'
            } rounded-lg shadow-xl flex flex-col transition-colors duration-200`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className={`p-4 border-b flex justify-between items-center ${
                isDark ? 'bg-indigo-500 border-gray-700' : 'bg-indigo-600'
              } text-white rounded-t-lg transition-colors duration-200`}
            >
              <h3 className="font-semibold">AI Learning Assistant</h3>
              <motion.button
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
                className={`hover:${isDark ? 'bg-indigo-600' : 'bg-indigo-700'} p-1 rounded transition-colors duration-200`}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: message.sender === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                        message.sender === 'user'
                          ? isDark ? 'bg-indigo-500 text-white' : 'bg-indigo-600 text-white'
                          : isDark ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-800'
                      } transition-colors duration-200`}
                    >
                      {message.text}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className={`${
                    isDark ? 'bg-gray-800' : 'bg-gray-100'
                  } p-3 rounded-lg flex items-center space-x-2 transition-colors duration-200`}>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className={`w-2 h-2 ${isDark ? 'bg-gray-400' : 'bg-gray-500'} rounded-full`}
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                      className={`w-2 h-2 ${isDark ? 'bg-gray-400' : 'bg-gray-500'} rounded-full`}
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                      className={`w-2 h-2 ${isDark ? 'bg-gray-400' : 'bg-gray-500'} rounded-full`}
                    />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className={`p-4 border-t ${isDark ? 'border-gray-700' : ''} transition-colors duration-200`}
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about ML..."
                  className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } transition-colors duration-200`}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className={`${
                    isDark ? 'bg-indigo-500' : 'bg-indigo-600'
                  } text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200`}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;