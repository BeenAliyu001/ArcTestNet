import { useState, useEffect, useCallback } from 'react';
import { ARC_TESTNET_PARAMS } from '../constants/arcNetwork';

export function useArcWallet() {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to check if connected to Arc Testnet
  const checkNetwork = (currentChainId) => {
    const isArc = currentChainId?.toLowerCase() === ARC_TESTNET_PARAMS.chainId.toLowerCase();
    setIsCorrectNetwork(isArc);
    return isArc;
  };

  // Switch network or add Arc Testnet to user's wallet
  const switchToArcTestnet = async () => {
    if (!window.ethereum) return;
    try {
      // Attempt to switch to Arc Testnet
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ARC_TESTNET_PARAMS.chainId }],
      });
    } catch (switchError) {
      // Error code 4902 indicates the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [ARC_TESTNET_PARAMS],
          });
        } catch (addError) {
          setError('Failed to add Arc Testnet to wallet');
        }
      } else {
        setError('Failed to switch network to Arc Testnet');
      }
    }
  };

  // Connect wallet handler
  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('No EVM wallet detected. Please install MetaMask or Rabby.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Request accounts from provider
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const currentChain = await window.ethereum.request({ method: 'eth_chainId' });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setChainId(currentChain);
        const correct = checkNetwork(currentChain);

        // Prompt network switch if connected to wrong chain
        if (!correct) {
          await switchToArcTestnet();
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet handler
  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    setIsCorrectNetwork(false);
  };

  // Listen for account and chain changes automatically
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        disconnectWallet();
      }
    };

    const handleChainChanged = (newChainId) => {
      setChainId(newChainId);
      checkNetwork(newChainId);
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  return {
    account,
    chainId,
    isCorrectNetwork,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    switchToArcTestnet,
  };
}