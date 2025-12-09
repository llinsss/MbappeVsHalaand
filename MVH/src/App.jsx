import React, { useState } from 'react';
import FaceOff from './components/FaceOff';
import BettingCard from './components/BettingCard';
import ShareModal from './components/ShareModal';



import Navbar from './components/Navbar';
function App() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [lastBet, setLastBet] = useState(null);

  // In a real app, this would come from the generated asset
  // For now, we'll use a path that we expect the image to be at, or a fallback
  const heroImage = "/haaland_vs_mbappe.png";

  const handlePlaceBet = (betDetails) => {
    console.log("Bet placed:", betDetails);
    setLastBet(betDetails);

    // Simulate API call
    setTimeout(() => {
      setIsShareModalOpen(true);
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--color-bg-primary)] text-white overflow-x-hidden font-sans selection:bg-[#00ff88] selection:text-black">
      <Navbar />

      <main className="flex flex-col items-center justify-center flex-1 px-4 py-2">



        {/* Hero Section */}
        <FaceOff imagePath={heroImage} />

        {/* Betting Section */}
        <div className="relative z-20 -mt-20">
          <BettingCard onPlaceBet={handlePlaceBet} />
        </div>

        {/* Footer / Trust Indicators */}
        <div className="mt-6 text-center text-gray-500 text-xs">
          <p className="mb-2">Secure Crypto Staking • Instant Payouts • Verified Stats</p>
          <p>© 2025 Goal Rush Platform</p>
        </div>
      </main>

      {/* Modals */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        betDetails={lastBet}
      />
    </div>
  );
}

export default App;
