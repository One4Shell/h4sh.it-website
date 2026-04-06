import React from 'react';

export const HeroVideoBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* YouTube Iframe Container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] md:w-[100vw] md:h-[56.25vw] min-h-[100vh] min-w-[177.77vh]">
        <iframe
          className="w-full h-full"
          src="https://www.youtube-nocookie.com/embed/hOgVAYpHPCc?autoplay=1&mute=1&loop=1&playlist=hOgVAYpHPCc&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0&disablekb=1&fs=0&playsinline=1&iv_load_policy=3&enablejsapi=1"
          frameBorder="0"
          title="h4sh Hero Background Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
    </div>
  );
};
