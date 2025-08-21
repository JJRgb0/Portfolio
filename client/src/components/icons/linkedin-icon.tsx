import React from "react";

function LinkedinIcon({ size = 64 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Glowing circular border */}
            <circle
                cx="32"
                cy="32"
                r="28"
                stroke="url(#glowGradient)"
                strokeWidth="2"
                fill="none"
                filter="url(#glowFilter)"
            />

            {/* LinkedIn "in" logo */}
            <path
                d="M24 27h-5v17h5V27zm-2.5-9c-1.6 0-2.5 1-2.5 2.3 0 1.2.9 2.3 2.5 2.3s2.5-1.1 2.5-2.3c0-1.3-.9-2.3-2.5-2.3zM41 27c-3.3 0-4.8 1.8-5.4 3h-.1V27h-5v17h5v-9c0-2 .4-4 3-4s3 2.3 3 4v9h5V34c0-4-2.1-7-5.5-7z"
                stroke="url(#glowGradient)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#glowFilter)"
            />

            {/* Glow gradient */}
            <defs>
                <linearGradient id="glowGradient" x1="0" y1="0" x2="64" y2="64">
                    <stop stopColor="#f2e7d5" stopOpacity="1" /> {/* heading start color */}
                    <stop offset="1" stopColor="ffa50080" stopOpacity="1" /> {/* heading end color */}
                </linearGradient>

                {/* Outer glow effect */}
                <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
        </svg>
    );
}

export default LinkedinIcon;
