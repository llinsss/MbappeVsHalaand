import React, { useEffect, useMemo, useState } from 'react';
import { Wallet } from 'lucide-react';

const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const Navbar = () => {
    const [providers, setProviders] = useState([]);
    const [connectedAccount, setConnectedAccount] = useState('');
    const [connecting, setConnecting] = useState(false);
    const [error, setError] = useState('');

    // Discover injected wallets (EIP-6963) and fall back to window.ethereum
    useEffect(() => {
        const discovered = [];

        const handleProvider = (event) => {
            discovered.push(event.detail.provider);
            setProviders([...discovered]);
        };

        window.addEventListener('eip6963:announceProvider', handleProvider);
        window.dispatchEvent(new Event('eip6963:requestProvider'));

        return () => {
            window.removeEventListener('eip6963:announceProvider', handleProvider);
        };
    }, []);

    const primaryProvider = useMemo(() => {
        if (providers.length > 0) return providers[0];
        if (typeof window !== 'undefined' && window.ethereum) return window.ethereum;
        return null;
    }, [providers]);

    const connectWallet = async () => {
        setError('');
        if (!primaryProvider) {
            setError('No wallet detected. Please install a browser wallet.');
            return;
        }

        try {
            setConnecting(true);
            const accounts = await primaryProvider.request({ method: 'eth_requestAccounts' });
            if (accounts?.length) {
                setConnectedAccount(accounts[0]);
            } else {
                setError('No accounts returned from wallet.');
            }
        } catch (err) {
            setError(err?.message || 'Failed to connect to wallet.');
        } finally {
            setConnecting(false);
        }
    };

    return (
        <nav className="w-full py-4 px-6 flex items-center justify-between border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-black tracking-tighter text-white">
                    MBAPPE <span className="text-[#00ff88]">VS</span> HAALAND
                </span>
            </div>

            <div className="flex flex-col items-end gap-1">
                <button
                    onClick={connectWallet}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-300 text-sm font-bold text-white disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={connecting}
                >
                    <Wallet className="w-4 h-4 text-[#00ff88]" />
                    {connecting ? (
                        <span>Connecting...</span>
                    ) : connectedAccount ? (
                        <span>{formatAddress(connectedAccount)}</span>
                    ) : (
                        <>
                            <span className="hidden md:inline">Connect Wallet</span>
                            <span className="md:hidden">Connect</span>
                        </>
                    )}
                </button>
                {error && <span className="text-[10px] text-red-400">{error}</span>}
            </div>
        </nav>
    );
};

export default Navbar;
