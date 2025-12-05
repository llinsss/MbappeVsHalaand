import Timer from './Timer';


import { motion } from 'framer-motion';

const FaceOff = ({ imagePath }) => {
    return (
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-2xl mb-8 group">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${imagePath})`, transform: 'scaleX(-1)' }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <h2 className="text-sm font-bold tracking-[0.2em] text-[#00ff88] mb-2 uppercase">
                        Goals by Age 30
                    </h2>
                    <div className="flex items-center justify-center gap-8">
                        <div className="text-right">
                            <h3 className="text-3xl font-bold text-white">MBAPPE</h3>
                            <p className="text-gray-400 text-sm">Striker</p>
                        </div>

                        <div className="w-12 h-12 bg-[#00ff88] text-black font-black flex items-center justify-center rounded-full text-xl shadow-lg">
                            <span>VS</span>
                        </div>

                        <div className="text-left">
                            <h3 className="text-3xl font-bold text-white">HAALAND</h3>
                            <p className="text-gray-400 text-sm">Striker</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FaceOff;
