function DownloadIcon({ size = 64 }: { size?: number }) {
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

            {/* Download arrow */}
            <path
                d="M32 18v20m0 0l-8-8m8 8l8-8M20 44h24"
                stroke="url(#glowGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glowFilter)"
            />

            {/* Glow gradient */}
            <defs>
                <linearGradient id="glowGradient" x1="0" y1="0" x2="64" y2="64">
                    <stop stopColor="#f2e7d5" stopOpacity="1" />  {/* replace with heading start color */}
                    <stop offset="1" stopColor="#ffa50080" stopOpacity="1" /> {/* replace with heading end color */}
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

export default DownloadIcon;
