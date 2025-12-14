import React from 'react';
import { AnalysisResult, Classification } from '../types';
import FeatureChart from './FeatureChart';
import { ShieldCheck, ShieldAlert, AlertTriangle, Terminal, Activity } from 'lucide-react';
import clsx from 'clsx';

interface ResultDisplayProps {
  result: AnalysisResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const isReal = result.classification === Classification.REAL;
  const isFake = result.classification === Classification.FAKE;

  const headerColor = isReal ? 'text-emerald-400' : isFake ? 'text-red-400' : 'text-amber-400';
  const borderColor = isReal ? 'border-emerald-500/30' : isFake ? 'border-red-500/30' : 'border-amber-500/30';
  const bgColor = isReal ? 'bg-emerald-500/5' : isFake ? 'bg-red-500/5' : 'bg-amber-500/5';

  return (
    <div className="animate-fade-in space-y-6">
      {/* Main Verdict Card */}
      <div className={clsx("p-6 rounded-2xl border backdrop-blur-sm", borderColor, bgColor)}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {isReal && <ShieldCheck className="w-8 h-8 text-emerald-400" />}
            {isFake && <ShieldAlert className="w-8 h-8 text-red-400" />}
            {!isReal && !isFake && <AlertTriangle className="w-8 h-8 text-amber-400" />}
            
            <div>
              <h2 className={clsx("text-3xl font-bold tracking-tight", headerColor)}>
                {result.classification}
              </h2>
              <p className="text-slate-400 text-sm font-mono">
                CONFIDENCE: {result.confidenceScore}%
              </p>
            </div>
          </div>
          
          <div className="hidden md:block text-right">
             <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Model</div>
             <div className="text-sm text-slate-300 font-mono">NLP-SVM-V2</div>
          </div>
        </div>

        <p className="text-lg text-slate-200 leading-relaxed border-t border-slate-700/50 pt-4">
          {result.summary}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <FeatureChart features={result.features} isReal={isReal} />
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          {/* Key Indicators */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 h-full">
            <h3 className="text-slate-300 font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Key Indicators
            </h3>
            <ul className="space-y-3">
              {result.keyIndicators.map((indicator, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                  <span className={clsx("mt-1.5 w-1.5 h-1.5 rounded-full shrink-0", isReal ? "bg-emerald-500" : "bg-red-500")} />
                  {indicator}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Technical Footnote (Simulated) */}
      <div className="bg-black/20 border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-400 flex items-start gap-3">
        <Terminal className="w-4 h-4 mt-0.5 text-slate-500 shrink-0" />
        <div>
          <span className="text-cyan-500 font-bold block mb-1">SYSTEM_LOG &gt; VECTOR_ANALYSIS</span>
          {result.svmVectorAnalysis}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;