import React, { forwardRef, useCallback } from 'react';

interface TerminalInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (value: string) => void;
  isExecuting: boolean;
  isTyping: boolean;
  historyIndex: number;
  history: { text: string }[];
  setHistoryIndex: (index: number) => void;
  activeTab: 'terminal' | 'chat';
}

const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>(({
  input,
  setInput,
  onSubmit,
  isExecuting,
  isTyping,
  historyIndex,
  history,
  setHistoryIndex,
  activeTab
}, ref) => {
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isExecuting && !isTyping && input.trim()) {
      e.preventDefault();
      onSubmit(input);
      return;
    }

    if (activeTab === 'terminal') {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setInput(history[history.length - 1 - newIndex].text);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(history[history.length - 1 - newIndex].text);
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInput('');
        }
      }
    }
  }, [input, isExecuting, isTyping, activeTab, historyIndex, history, setHistoryIndex, setInput, onSubmit]);

  return (
    <div className="border-t border-gray-700 p-4">
      <div className="flex items-center space-x-2">
        {activeTab === 'terminal' && (
          <span className="text-green-400 select-none">$</span>
        )}
        <input
          ref={ref}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-gray-100 outline-none placeholder-gray-500 font-mono"
          placeholder={
            isExecuting 
              ? 'Executing...' 
              : activeTab === 'chat'
                ? 'Type your message...'
                : ''
          }
          disabled={isExecuting || isTyping}
          autoComplete="off"
          spellCheck="false"
          autoCapitalize="off"
          autoCorrect="off"
        />
      </div>
    </div>
  );
});

TerminalInput.displayName = 'TerminalInput';

export default React.memo(TerminalInput);