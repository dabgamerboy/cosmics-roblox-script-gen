import React, { useState } from 'react';
import { IconCopy, IconCheck, IconCode } from './Icons';

interface ScriptViewerProps {
  code: string;
}

const ScriptViewer: React.FC<ScriptViewerProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700/50">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-700">
        <div className="flex items-center space-x-2 text-slate-300">
          <IconCode className="w-5 h-5 text-indigo-400" />
          <span className="font-semibold text-sm">Output Script</span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
            copied 
              ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
              : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-transparent'
          }`}
        >
          {copied ? <IconCheck className="w-4 h-4" /> : <IconCopy className="w-4 h-4" />}
          <span>{copied ? 'Copied!' : 'Copy Code'}</span>
        </button>
      </div>
      <div className="relative flex-1 overflow-hidden group">
        <pre className="absolute inset-0 p-4 overflow-auto text-sm font-mono leading-relaxed text-blue-100 selection:bg-indigo-500/30">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default ScriptViewer;