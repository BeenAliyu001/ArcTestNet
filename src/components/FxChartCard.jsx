import { useState } from 'react';

// Institutional Lightweight Chart Component
export default function FxChartCard() {
  const [timeframe, setTimeframe] = useState('1D');

  // Simulated candlestick/line height data points for UI presentation
  const chartPoints = [60, 55, 62, 58, 65, 70, 68, 74, 72, 80, 85, 82, 88, 90, 87, 92];

  return (
    <div className="bg-arc-card border border-arc-border rounded-lg p-5">
      {/* Chart Header Controls */}
      <div className="flex justify-between items-center mb-4 border-b border-arc-border pb-3">
        <div className="flex items-center space-x-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-arc-textBright font-semibold">
            EURC / USDC REAL-TIME MARKET CHART
          </h3>
          <span className="text-[10px] font-mono text-arc-textMuted bg-arc-bg px-2 py-0.5 rounded border border-arc-border">
            DEMO MARKET DATA
          </span>
        </div>

        {/* Timeframe Selectors */}
        <div className="flex space-x-1 font-mono text-xs">
          {['1H', '1D', '1W', '1M'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-0.5 rounded transition-colors ${
                timeframe === tf
                  ? 'bg-arc-accent text-white font-bold'
                  : 'text-arc-textMuted hover:text-arc-textBright bg-arc-bg'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Price Line Graphic */}
      <div className="h-44 w-full flex items-end justify-between space-x-1 pt-4 pb-2 px-2 bg-arc-bg/40 rounded border border-arc-border/40">
        {chartPoints.map((val, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
            {/* Hover Tooltip */}
            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-arc-card text-arc-green text-[10px] font-mono px-1.5 py-0.5 rounded border border-arc-border transition-opacity whitespace-nowrap pointer-events-none z-20">
              {(0.9150 + val * 0.0001).toFixed(4)}
            </div>
            {/* Visual Bar Indicator */}
            <div
              style={{ height: `${val}%` }}
              className="w-full bg-arc-accent/30 group-hover:bg-arc-accent border-t-2 border-arc-accent transition-all rounded-t-sm"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between text-[10px] font-mono text-arc-textMuted mt-3 px-1">
        <span>00:00 UTC</span>
        <span>08:00 UTC</span>
        <span>16:00 UTC</span>
        <span>CURRENT</span>
      </div>
    </div>
  );
}