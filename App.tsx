import React, { useState } from 'react';
import { generateRobloxScript } from './services/gemini';
import { GeneratorStatus } from './types';
import ScriptViewer from './components/ScriptViewer';
import { IconSparkles, IconLoading, IconCode } from './components/Icons';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<GeneratorStatus>(GeneratorStatus.IDLE);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setStatus(GeneratorStatus.GENERATING);
    setErrorMsg('');
    setGeneratedCode('');

    try {
      const code = await generateRobloxScript(prompt);
      setGeneratedCode(code);
      setStatus(GeneratorStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to generate script. Ensure your API key is valid or try a different prompt.");
      setStatus(GeneratorStatus.ERROR);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500/30">
      
      {/* Header */}
      <header className="mb-12 text-center max-w-2xl w-full">
        <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)]">
          <img 
             src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Roblox_player_icon_black.svg" 
             className="w-8 h-8 mr-3 invert opacity-90"
             alt="Roblox Logo"
          />
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-blue-300">
            Cosmics Lua Script Gen
          </h1>
        </div>
        <p className="text-slate-400 text-lg">
          Describe functionality, get optimized Roblox Lua code. 
          <br className="hidden sm:block" />
          Powered by Gemini 3.0 Pro.
        </p>
      </header>

      {/* Main Grid */}
      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-18rem)] min-h-[500px]">
        
        {/* Input Column */}
        <div className="flex flex-col h-full space-y-4">
          <div className="flex-1 bg-slate-800/50 rounded-xl p-1 border border-slate-700/50 shadow-xl backdrop-blur-sm flex flex-col">
            <div className="px-4 py-3 border-b border-slate-700/50 flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-300">Prompt</span>
              <span className="text-xs text-slate-500 bg-slate-900/50 px-2 py-1 rounded">Ctrl + Enter to run</span>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="E.g., Create a kill brick that gives the player 100 points when they die, resets their stats, and plays a sound effect."
              className="flex-1 w-full bg-transparent p-4 resize-none focus:outline-none text-slate-200 placeholder-slate-500 font-medium text-base sm:text-lg leading-relaxed"
            />
          </div>

          <div className="h-fit">
            <button
              onClick={handleGenerate}
              disabled={status === GeneratorStatus.GENERATING || !prompt.trim()}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 transition-all duration-300 transform active:scale-[0.98] ${
                status === GeneratorStatus.GENERATING
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : !prompt.trim() 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-indigo-500/25'
              }`}
            >
              {status === GeneratorStatus.GENERATING ? (
                <>
                  <IconLoading className="w-6 h-6" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <IconSparkles className="w-6 h-6" />
                  <span>Generate Script</span>
                </>
              )}
            </button>
            {status === GeneratorStatus.ERROR && (
               <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                 {errorMsg}
               </div>
            )}
          </div>
        </div>

        {/* Output Column */}
        <div className="h-full flex flex-col">
          {generatedCode ? (
            <ScriptViewer code={generatedCode} />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-800/30 rounded-xl border border-dashed border-slate-700 text-slate-500 p-8 text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                <IconCode className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-400 mb-2">Ready to Code</h3>
              <p className="max-w-xs mx-auto text-sm">
                Enter a prompt on the left to generate a custom Roblox Lua script instantly.
              </p>
            </div>
          )}
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-12 text-slate-600 text-sm font-medium">
        Generated scripts should be reviewed before use in production.
      </footer>
    </div>
  );
};

export default App;