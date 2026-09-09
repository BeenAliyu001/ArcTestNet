import React from 'react';

export default function FxMarketPanel() {
  return (
    <div className="space-y-6">
      {/* FX Market Metrics Card */}
      <div className="bg-arc-card border border-arc-border rounded-lg p-5">
        <div className="flex justify-between items-center mb-4 border-b border-arc-border pb-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-arc-textBright font-semibold">
            EURC / USDC LIVE MARKET
          </h3>
          <span className="text-xs font-mono text-arc-green font-bold">+0.14%</span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs font-mono mb-4">
          <div className="bg-arc-bg p-3 rounded border border-arc-border">
            <span className="text-arc-textMuted block mb-1">SPOT RATE</span>
            <span className="text-lg font-bold text-arc-textBright">0.9215</span>
          </div>
          <div className="bg-arc-bg p-3 rounded border border-arc-border">
            <span className="text-arc-textMuted block mb-1">24H RANGE</span>
            <span className="text-arc-textBright">0.9190 - 0.9242</span>
          </div>
        </div>

        <div className="space-y-2 text-xs font-mono border-t border-arc-border pt-3">
          <div className="flex justify-between text-arc-textMuted">
            <span>INSTITUTIONAL SPREAD</span>
            <span className="text-arc-textBright">0.0002 EURC</span>
          </div>
          <div className="flex justify-between text-arc-textMuted">
            <span>ESTIMATED EXECUTION</span>
            <span className="text-arc-green">&lt; 1.0s (Arc Speed)</span>
          </div>
        </div>
      </div>

      {/* Arc Network Panel */}
      <div className="bg-arc-card border border-arc-border rounded-lg p-5">
        <h3 className="text-xs font-mono uppercase tracking-wider text-arc-textBright font-semibold mb-4 border-b border-arc-border pb-3">
          ARC NETWORK ANALYTICS
        </h3>
        <div className="space-y-2 text-xs font-mono">
          <div className="flex justify-between text-arc-textMuted">
            <span>CHAIN ID</span>
            <span className="text-arc-textBright font-bold">ARC TESTNET</span>
          </div>
          <div className="flex justify-between text-arc-textMuted">
            <span>NATIVE GAS TOKEN</span>
            <span className="text-arc-accent font-bold">USDC</span>
          </div>
          <div className="flex justify-between text-arc-textMuted">
            <span>ROUTER STATUS</span>
            <span className="text-arc-green">ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}