import React from 'react';
import { Terminal as TerminalIcon, X, Minimize, Maximize, ExternalLink, MessageSquare } from 'lucide-react';

interface TerminalHeaderProps {
  activeTab: 'terminal' | 'chat';
  setActiveTab: (tab: 'terminal' | 'chat') => void;
  isMaximized: boolean;
  setIsMaximized: (value: boolean) => void;
  isPoppedOut: boolean;
  setIsPoppedOut: (value: boolean) => void;
  handleClose: (e: React.MouseEvent) => void;
  handleDragStart: (e: React.MouseEvent) => void;
  handleDrag: (e: React.MouseEvent) => void;
  handleDragEnd: () => void;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  activeTab,
  setActiveTab,
  isMaximized,
  setIsMaximized,
  isPoppedOut,
  setIsPoppedOut,
  handleClose,
  handleDragStart,
  handleDrag,
  handleDragEnd
}) => {
  const isMac = navigator.platform.toLowerCase().includes('mac');

  return (
    <div 
      className={`terminal-header flex items-center justify-between p-2 border-b border-gray-800 ${
        isMac ? 'bg-gray-800' : 'bg-gray-950'
      }`}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      {isMac ? (
        <div className="flex items-center w-full">
          <div className="flex space-x-2 px-3">
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            />
            <button
              onClick={() => setIsMaximized(false)}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
            />
            <button
              onClick={() => setIsMaximized(true)}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
            />
          </div>
          <div className="flex items-center ml-4 space-x-4">
            <button
              onClick={() => setActiveTab('terminal')}
              className={`text-sm ${
                activeTab === 'terminal' ? 'text-white' : 'text-gray-400 hover:text-white'
              } transition-colors`}
            >
              Terminal
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`text-sm ${
                activeTab === 'chat' ? 'text-white' : 'text-gray-400 hover:text-white'
              } transition-colors`}
            >
              Chat
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full px-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {activeTab === 'terminal' ? (
                <TerminalIcon className="w-4 h-4 text-gray-400 mr-2" />
              ) : (
                <MessageSquare className="w-4 h-4 text-gray-400 mr-2" />
              )}
              <button
                onClick={() => setActiveTab('terminal')}
                className={`text-sm ${
                  activeTab === 'terminal' ? 'text-white' : 'text-gray-400 hover:text-white'
                } transition-colors mr-4`}
              >
                Terminal
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`text-sm ${
                  activeTab === 'chat' ? 'text-white' : 'text-gray-400 hover:text-white'
                } transition-colors`}
              >
                Chat
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPoppedOut(!isPoppedOut)}
              className="p-1.5 hover:bg-gray-800 rounded-sm transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1.5 hover:bg-gray-800 rounded-sm transition-colors"
            >
              {isMaximized ? (
                <Minimize className="w-4 h-4 text-gray-400" />
              ) : (
                <Maximize className="w-4 h-4 text-gray-400" />
              )}
            </button>
            <button
              onClick={handleClose}
              className="p-1.5 hover:bg-red-500 rounded-sm transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminalHeader;