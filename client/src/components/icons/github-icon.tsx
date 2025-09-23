function Github({ size = 64 }: { size?: number }) {
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

            {/* GitHub logo path */}
            <path
                d="M32 12c-11.05 0-20 8.95-20 20 0 8.84 5.73 16.34 13.67 18.98 1 .18 1.36-.43 1.36-.96 0-.47-.02-2.05-.03-3.72-5.56 1.21-6.73-2.38-6.73-2.38-.91-2.33-2.23-2.95-2.23-2.95-1.82-1.25.14-1.23.14-1.23 2.01.14 3.07 2.06 3.07 2.06 1.79 3.06 4.7 2.18 5.85 1.67.18-1.3.7-2.18 1.27-2.68-4.44-.5-9.11-2.22-9.11-9.89 0-2.18.78-3.96 2.06-5.36-.21-.5-.9-2.52.2-5.25 0 0 1.67-.54 5.47 2.05A18.9 18.9 0 0132 20.34c1.7.01 3.42.23 5.02.68 3.79-2.59 5.46-2.05 5.46-2.05 1.1 2.73.41 4.75.2 5.25 1.28 1.4 2.06 3.18 2.06 5.36 0 7.69-4.68 9.38-9.14 9.87.72.62 1.36 1.84 1.36 3.71 0 2.68-.02 4.84-.02 5.5 0 .53.36 1.15 1.37.95A20.01 20.01 0 0052 32c0-11.05-8.95-20-20-20z"
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
                    <stop stopColor="#f2e7d5" stopOpacity="1" />  {/* heading start color */}
                    <stop offset="1" stopColor="#ffa50080" stopOpacity="1" /> {/* heading end color */}
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

export default Github;
