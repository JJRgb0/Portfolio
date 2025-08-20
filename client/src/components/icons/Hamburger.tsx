import React from "react";

const Hamburger = ({ size = 64, onClick, className, toggle }: { size?: number; onClick?: () => void; className?: string, toggle: boolean }) => {
    return (
        <svg
            className={`${className} ${toggle ? 'is-open' : ''}`}
            width={size}
            onClick={onClick}
            height={size}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
        >
            <defs>
                {/* 🎨 Gradient colors (replace with your heading palette) */}
                <linearGradient id="sunGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F5E6D0" />
                    <stop offset="50%" stopColor="#F0D6B5" />
                    <stop offset="100%" stopColor="#E9C49A" />
                </linearGradient>

                {/* 🌫️ Glow-only filter */}
                <filter id="outerGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                    <feComposite in="blur" in2="SourceGraphic" operator="out" result="glow" />
                    <feColorMatrix
                        in="glow"
                        type="matrix"
                        values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 1.2 0"
                        result="boost"
                    />
                    <feMerge>
                        <feMergeNode in="boost" />
                    </feMerge>
                </filter>
            </defs>

            {/* 🟦 Lines */}
            <rect
                className="bar bar-top"
                x="10"
                y="18"
                width="80"
                height="10"
                rx="5"
                ry="5"
                fill="url(#sunGlow)"
                filter="url(#outerGlow)"
            />
            <rect
                className="bar bar-middle"
                x="10"
                y="45"
                width="80"
                height="10"
                rx="5"
                ry="5"
                fill="url(#sunGlow)"
                filter="url(#outerGlow)"
            />
            {/* third row shorter on the left */}
            <rect
                className="bar bar-bottom"
                x={`${toggle ? "10" : "25"}`}
                y="72"
                width={`${toggle ? "80" : "65"}`}
                height="10"
                rx="5"
                ry="5"
                fill="url(#sunGlow)"
                filter="url(#outerGlow)"
            />
        </svg>
    );
};

export default Hamburger;
