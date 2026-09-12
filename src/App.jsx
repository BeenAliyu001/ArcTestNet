import  { useState } from 'react';
import Header from './components/Header';
import FxSwapCard from './components/FxSwapCard';
import SettlementHistory from './components/SettlementHistory';
import FxMarketPanel from './components/FxMarketPanel';
import FxChartCard from './components/FxChartCard';
import { useArcWallet } from './hooks/useArcWallet';
import { useTokenBalances } from './hooks/useTokenBalances';

export default function App() {
  const wallet = useArcWallet();
  const { balances, refetchBalances } = useTokenBalances(wallet.account);
  const [transactions, setTransactions] = useState([]);

  const handleSwapSuccess = (txData) => {
    refetchBalances();
    if (txData) {
      setTransactions((prev) => [txData, ...prev]);
    }
  };

  return (
    <div className="min-h-screen bg-arc-bg text-arc-textBright font-sans antialiased">
      <Header wallet={wallet} />

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Balances Summary Banner */}
        {wallet.account && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-arc-card border border-arc-border p-4 rounded-lg flex justify-between items-center shadow-sm">
              <div>
                <p className="text-xs font-mono text-arc-textMuted">ARC TESTNET USDC BALANCE</p>
                <p className="text-2xl font-mono font-bold text-arc-textBright">{balances.USDC} USDC</p>
              </div>
              <span className="text-xs bg-arc-accent/10 text-arc-accent border border-arc-accent/20 px-2.5 py-1 rounded font-mono font-semibold">
                NATIVE GAS
              </span>
            </div>

            <div className="bg-arc-card border border-arc-border p-4 rounded-lg flex justify-between items-center shadow-sm">
              <div>
                <p className="text-xs font-mono text-arc-textMuted">ARC TESTNET EURC BALANCE</p>
                <p className="text-2xl font-mono font-bold text-arc-textBright">{balances.EURC} EURC</p>
              </div>
              <span className="text-xs bg-arc-green/10 text-arc-green border border-arc-green/20 px-2.5 py-1 rounded font-mono font-semibold">
                STABLECOIN
              </span>
            </div>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <FxSwapCard wallet={wallet} balances={balances} onSwapSuccess={handleSwapSuccess} />
            <FxChartCard />
            <SettlementHistory transactions={transactions} />
          </div>

          <div className="lg:col-span-1">
            <FxMarketPanel />
          </div>
        </div>
      </main>
    </div>
  );
}