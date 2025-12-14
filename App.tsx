import React, { useState, useCallback } from 'react';
import { Activity, Cpu, RotateCcw, AlertCircle, FileText, CheckCircle2, Copy } from 'lucide-react';
import { analyzeNewsText } from './services/geminiService';
import ResultDisplay from './components/ResultDisplay';
import { AnalysisResult, HistoryItem } from './types';
import { SAMPLE_FAKE_NEWS, SAMPLE_REAL_NEWS } from './constants';
import clsx from 'clsx';

function App() {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleAnalyze = useCallback(async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to analyze.");
      return;
    }
    
    setError(null);
    setIsAnalyzing(true);
    setResult(null);

    try {
      const analysis = await analyzeNewsText(inputText);
      setResult(analysis);
      
      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        excerpt: inputText.substring(0, 60) + (inputText.length > 60 ? '...' : ''),
        result: analysis
      };
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 5)); // Keep last 5
    } catch (err: any) {
      console.error(err);
      setError("Analysis failed. Please try again later. " + (err.message || ''));
    } finally {
      setIsAnalyzing(false);
    }
  }, [inputText]);

  const loadSample = (type: 'REAL' | 'FAKE') => {
    setInputText(type === 'REAL' ? SAMPLE_REAL_NEWS : SAMPLE_FAKE_NEWS);
    setError(null);
    setResult(null);
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar (History & Branding) */}
      <aside className="w-full md:w-80 bg-slate-950 border-r border-slate-800 p-6 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-8 text-cyan-400">
          <Cpu className="w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tighter text-white">Veritas AI</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="mb-6">
             <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Recent Analysis</h3>
             <div className="space-y-3">
                {history.length === 0 && (
                  <p className="text-slate-600 text-sm italic">No history yet.</p>
                )}
                {history.map(item => (
                  <div key={item.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group" onClick={() => {
                    // Ideally load this item back into view
                  }}>
                    <div className="flex justify-between items-start mb-1">
                      <span className={clsx(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded",
                        item.result.classification === 'REAL' ? "bg-emerald-900 text-emerald-400" : "bg-red-900 text-red-400"
                      )}>
                        {item.result.classification}
                      </span>
                      <span className="text-[10px] text-slate-600">{new Date(item.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 group-hover:text-slate-300 transition-colors">
                      {item.excerpt}
                    </p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-xs text-slate-600">
          <p>© 2025 Veritas AI Research</p>
          <p className="mt-1">Powered by Gemini 2.5 Flash</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto max-w-5xl mx-auto w-full">
        
        {/* Input Section */}
        <section className="mb-8 animate-fade-in-down">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">News Analyzer</h2>
              <p className="text-slate-400 text-sm">Paste article text to detect authenticity using NLP & SVM simulation.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => loadSample('REAL')} className="text-xs px-3 py-1.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">
                Sample Real
              </button>
              <button onClick={() => loadSample('FAKE')} className="text-xs px-3 py-1.5 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors">
                Sample Fake
              </button>
            </div>
          </div>

          <div className="relative group">
            <textarea
              className="w-full h-48 bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none font-mono text-sm leading-relaxed"
              placeholder="Paste news article content here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isAnalyzing}
            />
            {inputText && !isAnalyzing && (
               <button 
                onClick={handleClear}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                title="Clear text"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-lg flex items-center gap-3 text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !inputText.trim()}
              className={clsx(
                "flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-cyan-900/20",
                isAnalyzing || !inputText.trim()
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-cyan-600 hover:bg-cyan-500 text-white hover:shadow-cyan-500/25 active:scale-95"
              )}
            >
              {isAnalyzing ? (
                <>
                  <Activity className="w-5 h-5 animate-spin" />
                  Running SVM Classification...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  Analyze Text
                </>
              )}
            </button>
          </div>
        </section>

        {/* Results Section */}
        {result && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6 text-slate-400">
               <CheckCircle2 className="w-5 h-5 text-cyan-500" />
               <span className="text-sm font-medium uppercase tracking-wider">Analysis Complete</span>
               <span className="h-px bg-slate-800 flex-1 ml-2"></span>
            </div>
            <ResultDisplay result={result} />
          </section>
        )}
        
        {!result && !isAnalyzing && (
          <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-xl text-slate-600">
             <Activity className="w-12 h-12 mx-auto mb-3 opacity-20" />
             <p>Ready to analyze. Paste text above to begin.</p>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;