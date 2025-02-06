import React, { useEffect, useRef } from 'react';

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Try to play audio when user interacts with the page
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            // Remove event listeners once audio starts playing
            document.removeEventListener('click', playAudio);
            document.removeEventListener('touchstart', playAudio);
          })
          .catch(e => console.log('Audio playback failed:', e));
      }
    };

    document.addEventListener('click', playAudio);
    document.addEventListener('touchstart', playAudio);

    return () => {
      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden animated-bg">
      {/* Animated background circles */}
      <div className="background-animation">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`circle circle-${i + 1}`} />
        ))}
      </div>

      {/* Falling petals */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="petal absolute"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 3}s`
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center p-8 glass-panel rounded-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 animate-fadeIn text-shadow">
            Happy Rose Day!
          </h1>
          
          {/* Enhanced Animated Rose */}
          <div className="rose-container mb-8">
            <svg className="rose" viewBox="0 0 200 200" width="300" height="300">
              {/* Stem */}
              <path className="rose-stem" d="M100 200 L100 120" />
              
              {/* Leaves */}
              <path className="rose-leaf" d="M100 160 Q120 150 110 130" />
              <path className="rose-leaf" d="M100 140 Q80 130 90 110" />
              
              {/* Base petals */}
              <path className="rose-petal base-petal" d="M70 100 Q100 70 130 100 Q100 130 70 100" />
              <path className="rose-petal base-petal" d="M60 90 Q100 60 140 90 Q100 120 60 90" />
              
              {/* Outer petals */}
              <path className="rose-petal outer-petal-1" d="M65 85 Q100 45 135 85 Q100 125 65 85" />
              <path className="rose-petal outer-petal-2" d="M60 95 Q100 55 140 95 Q100 135 60 95" />
              <path className="rose-petal outer-petal-3" d="M55 90 Q100 50 145 90 Q100 130 55 90" />
              
              {/* Inner petals */}
              <path className="rose-petal inner-petal-1" d="M80 95 Q100 75 120 95 Q100 115 80 95" />
              <path className="rose-petal inner-petal-2" d="M75 90 Q100 70 125 90 Q100 110 75 90" />
              <path className="rose-petal inner-petal-3" d="M85 85 Q100 65 115 85 Q100 105 85 85" />
              
              {/* Center */}
              <circle className="rose-center" cx="100" cy="90" r="8" />
            </svg>
          </div>

          <p className="text-xl md:text-2xl text-white animate-fadeIn animation-delay-500 text-shadow">
            A rose for you, blooming with love ❤️
          </p>
          
          <p className="mt-4 text-white text-shadow-sm animate-pulse">
            Click anywhere to play music 🎵
          </p>
        </div>
      </div>

      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="Die With A Smile-(SambalpuriStar.In).mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;