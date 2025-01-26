import React, { useState, useEffect } from 'react';
import { Play, Download, Upload, Check, X, Files, Settings, Terminal as TerminalIcon, Layout, ChevronRight, FolderOpen, File, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import MonacoEditor from '@monaco-editor/react';

interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

interface ProjectTest {
  id: string;
  name: string;
  testCases: TestCase[];
}

interface FileStructure {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileStructure[];
}

const ProjectIDE = ({ projectId, language }: { projectId: string; language: string }) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{passed: boolean; message: string}[]>([]);
  const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark');
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [terminalHeight, setTerminalHeight] = useState(200);
  const [activePanel, setActivePanel] = useState<'files' | 'tests'>('files');
  const [showTerminal, setShowTerminal] = useState(true);
  const [activeFile, setActiveFile] = useState('main.py');
  const [layout, setLayout] = useState<'split' | 'full'>('split');

  // Sample file structure (in a real app, fetch from API)
  const fileStructure: FileStructure[] = [
    {
      name: 'src',
      type: 'folder',
      children: [
        {
          name: 'main.py',
          type: 'file',
          content: '# Main implementation file\n\ndef predict_sentiment(text):\n    pass'
        },
        {
          name: 'utils.py',
          type: 'file',
          content: '# Utility functions'
        }
      ]
    },
    {
      name: 'tests',
      type: 'folder',
      children: [
        {
          name: 'test_sentiment.py',
          type: 'file',
          content: '# Test cases'
        }
      ]
    },
    {
      name: 'requirements.txt',
      type: 'file',
      content: 'torch\ntransformers\nnumpy'
    }
  ];

  const projectTests: ProjectTest = {
    id: 'sentiment-analysis',
    name: 'BERT Sentiment Analysis',
    testCases: [
      {
        input: 'This movie was fantastic!',
        expectedOutput: 'positive',
        description: 'Test positive sentiment'
      },
      {
        input: 'I really hated this product.',
        expectedOutput: 'negative',
        description: 'Test negative sentiment'
      }
    ]
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      const response = await fetch('/api/projects/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, projectId })
      });
      
      const result = await response.json();
      setOutput(result.output);
    } catch (error) {
      setOutput('Error running code');
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunTests = async () => {
    setIsRunning(true);
    try {
      const response = await fetch('/api/projects/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, projectId })
      });
      
      const results = await response.json();
      setTestResults(results);
    } catch (error) {
      setTestResults([{ passed: false, message: 'Error running tests' }]);
    } finally {
      setIsRunning(false);
    }
  };

  const renderFileTree = (items: FileStructure[], level = 0) => {
    return items.map((item) => (
      <div key={item.name} style={{ paddingLeft: `${level * 20}px` }}>
        <button
          onClick={() => item.type === 'file' && setActiveFile(item.name)}
          className={`flex items-center w-full p-1 hover:bg-gray-700 rounded ${
            activeFile === item.name ? 'bg-gray-700' : ''
          }`}
        >
          {item.type === 'folder' ? (
            <>
              <FolderOpen className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="text-gray-300">{item.name}</span>
            </>
          ) : (
            <>
              <File className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-gray-300">{item.name}</span>
            </>
          )}
        </button>
        {item.children && renderFileTree(item.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Top Toolbar */}
      <div className="bg-gray-800 text-white p-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark')}
            className="px-3 py-1 rounded hover:bg-gray-700"
          >
            Theme
          </button>
          <button
            onClick={() => setLayout(layout === 'split' ? 'full' : 'split')}
            className="px-3 py-1 rounded hover:bg-gray-700"
          >
            <Layout className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRunCode}
            disabled={isRunning}
            className="px-4 py-1 bg-green-600 rounded flex items-center hover:bg-green-700 disabled:opacity-50"
          >
            <Play className="w-4 h-4 mr-2" />
            Run
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRunTests}
            disabled={isRunning}
            className="px-4 py-1 bg-indigo-600 rounded flex items-center hover:bg-indigo-700 disabled:opacity-50"
          >
            <Check className="w-4 h-4 mr-2" />
            Test
          </motion.button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div 
          className="bg-gray-900 border-r border-gray-700 flex flex-col"
          style={{ width: sidebarWidth }}
        >
          {/* Sidebar Tabs */}
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActivePanel('files')}
              className={`flex-1 px-4 py-2 text-sm ${
                activePanel === 'files' 
                  ? 'text-white border-b-2 border-indigo-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Files
            </button>
            <button
              onClick={() => setActivePanel('tests')}
              className={`flex-1 px-4 py-2 text-sm ${
                activePanel === 'tests'
                  ? 'text-white border-b-2 border-indigo-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Tests
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-2">
            {activePanel === 'files' ? (
              renderFileTree(fileStructure)
            ) : (
              <div className="space-y-2">
                {projectTests.testCases.map((test, index) => (
                  <div
                    key={index}
                    className="p-2 rounded bg-gray-800 text-sm text-gray-300"
                  >
                    <div className="font-medium mb-1">{test.description}</div>
                    <div className="text-xs text-gray-400">
                      Input: {test.input}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <MonacoEditor
              height="100%"
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme={theme}
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                wordWrap: 'on',
                automaticLayout: true,
                scrollBeyondLastLine: false,
                renderWhitespace: 'selection',
                lineNumbers: 'on',
                glyphMargin: true,
                folding: true,
                lineDecorationsWidth: 10,
                renderIndentGuides: true
              }}
            />
          </div>

          {/* Terminal */}
          {showTerminal && (
            <div 
              className="bg-gray-900 border-t border-gray-700"
              style={{ height: terminalHeight }}
            >
              <div className="flex items-center justify-between p-1 border-b border-gray-700">
                <div className="flex items-center">
                  <TerminalIcon className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-300">Terminal</span>
                </div>
                <button
                  onClick={() => setShowTerminal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-2 font-mono text-sm text-gray-300 h-full overflow-y-auto">
                {output || '> Ready'}
              </div>
            </div>
          )}
        </div>

        {layout === 'split' && (
          <div className="w-1/3 border-l border-gray-700 flex flex-col">
            <div className="p-2 border-b border-gray-700">
              <h3 className="text-white font-medium">Test Results</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    result.passed ? 'bg-green-900/20' : 'bg-red-900/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">
                      Test Case {index + 1}
                    </span>
                    {result.passed ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-300">
                    {result.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectIDE;