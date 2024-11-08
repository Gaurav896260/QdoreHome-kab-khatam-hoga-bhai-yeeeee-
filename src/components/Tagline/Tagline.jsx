import React from 'react';

const Tagline = () => {
    return (
        <div className="fixed bottom-0 w-full bg-gray-800 bg-tagline-gradient py-3 z-50 overflow-hidden">
            <div className="whitespace-nowrap animate-marquee text-lg flex">
                <p className="mx-4">
                Qdore Home- Where every corner tells a story. |
                </p>
                <p className="mx-4">
                Qdore Home- Where every corner tells a story.| Qdore Home- Where every corner tells a story. | Qdore Home- Where every corner tells a story.
                </p>
            </div>
            <style jsx="true">{`
  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  .animate-marquee {
    animation: marquee 15s linear infinite;
  }
`}</style>
        </div>
    );
};

export default Tagline;
