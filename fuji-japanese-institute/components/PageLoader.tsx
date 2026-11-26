import React from 'react';

const PageLoader: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="relative flex flex-col items-center">
                {/* Pulsing Background */}
                <div className="absolute w-32 h-32 bg-fuji-red/20 rounded-full animate-ping"></div>

                {/* Logo Container */}
                <div className="relative z-10 w-24 h-24 bg-white rounded-full shadow-lg p-3 flex items-center justify-center border-2 border-fuji-light">
                    <img
                        src="/logo.png"
                        alt="Fuji Japanese Institute"
                        width="80"
                        height="80"
                        className="w-full h-full object-contain animate-pulse"
                    />
                </div>

                {/* Loading Dots */}
                <div className="mt-8 flex space-x-2">
                    <div className="w-3 h-3 bg-fuji-red rounded-full animate-bounce delay-75"></div>
                    <div className="w-3 h-3 bg-fuji-indigo rounded-full animate-bounce delay-150"></div>
                    <div className="w-3 h-3 bg-fuji-red rounded-full animate-bounce delay-300"></div>
                </div>
            </div>
        </div>
    );
};

export default PageLoader;
