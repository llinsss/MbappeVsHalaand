import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Twitter, Copy, Check } from 'lucide-react';

const ShareModal = ({ isOpen, onClose, betDetails }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 flex items-center justify-center z-50"
                    >
                        <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                            {/* Confetti/Glow Background */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#00ff88]/10 to-transparent pointer-events-none" />

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="text-center mb-8 pt-4 relative">
                                <div className="w-16 h-16 bg-[#00ff88]/20 text-[#00ff88] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Share2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Bet Placed!</h3>
                                <p className="text-gray-400 text-sm">
                                    You staked <span className="text-white font-bold">{betDetails?.amount} {betDetails?.currency}</span> on {betDetails?.player}
                                </p>
                                {/* Custom message */}
                                <p className="text-gray-300 text-sm mt-2">
                                    Just placed a bet on {betDetails?.player} to have more goals than {betDetails?.player === 'HAALAND' ? 'MBAPPE' : 'HAALAND'} by age 30.
                                </p>
                                {/* Platform name */}
                                <p className="text-gray-500 text-xs mt-4">Goal Rush Platform</p>
                                {/* Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.05, fontSize: '4rem', fontWeight: 'bold', color: '#00ff88' }}>
                                    Goal Rush
                                </div>
                            </div>

                            {/* Share Options */}
                            <div className="space-y-3">
                                <button className="w-full py-3 px-4 bg-[#1DA1F2] hover:bg-[#1a91da] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
                                    <Twitter className="w-5 h-5" />
                                    Share on Twitter
                                </button>

                                <button
                                    onClick={handleCopy}
                                    className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
                                >
                                    {copied ? <Check className="w-5 h-5 text-[#00ff88]" /> : <Copy className="w-5 h-5" />}
                                    {copied ? 'Copied!' : 'Copy Link'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ShareModal;
