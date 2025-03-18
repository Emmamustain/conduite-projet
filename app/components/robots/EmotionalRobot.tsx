import { useEffect, useState } from 'react';

type Emotion = 'neutral' | 'happy' | 'sad' | 'angry' | 'afraid' | 'surprise';

interface EmotionalRobotProps {
    emotion: Emotion;
    size?: number;
}

export default function EmotionalRobot({ emotion = 'neutral', size = 150 }: EmotionalRobotProps) {
    const [animate, setAnimate] = useState(false);

    // Trigger animation when emotion changes
    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => setAnimate(false), 500);
        return () => clearTimeout(timer);
    }, [emotion]);

    // Animation class for bouncing effect
    const animationClass = animate ? 'animate-bounce' : '';

    // Get the base color based on emotion
    const baseColor = {
        neutral: '#D3D3D3',
        happy: '#B0E0E6',
        sad: '#CBC3E3',
        angry: '#FFB6C1',
        afraid: '#FFDAB9',
        surprise: '#B0E0E6'
    }[emotion];

    return (
        <div className={`${animationClass} transition-all duration-300`}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 100 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Robot head */}
                <g>
                    {/* Head base - more rounded like the reference */}
                    <circle cx="50" cy="35" r="25" fill="#CCCCCC" />
                    <circle cx="50" cy="35" r="22" fill="#DDDDDD" />

                    {/* Screen/face area */}
                    <rect x="35" y="25" width="30" height="20" rx="3" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="0.5" />

                    {/* Face expressions */}
                    {emotion === 'neutral' && (
                        <>
                            {/* Neutral eyes */}
                            <circle cx="42" cy="35" r="3" fill="#000000" />
                            <circle cx="58" cy="35" r="3" fill="#000000" />
                            {/* Neutral mouth */}
                            <line x1="42" y1="42" x2="58" y2="42" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                        </>
                    )}

                    {emotion === 'happy' && (
                        <>
                            {/* Happy eyes */}
                            <circle cx="42" cy="35" r="3" fill="#000000" />
                            <circle cx="58" cy="35" r="3" fill="#000000" />
                            {/* Happy mouth */}
                            <path d="M 42 42 Q 50 48 58 42" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" />
                        </>
                    )}

                    {emotion === 'sad' && (
                        <>
                            {/* Sad eyes */}
                            <circle cx="42" cy="35" r="3" fill="#000000" />
                            <circle cx="58" cy="35" r="3" fill="#000000" />
                            {/* Sad mouth */}
                            <path d="M 42 45 Q 50 39 58 45" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" />
                        </>
                    )}

                    {emotion === 'angry' && (
                        <>
                            {/* Angry eyes with eyebrows */}
                            <circle cx="42" cy="35" r="3" fill="#000000" />
                            <circle cx="58" cy="35" r="3" fill="#000000" />
                            <line x1="38" y1="30" x2="46" y2="32" stroke="#000000" strokeWidth="2" />
                            <line x1="54" y1="32" x2="62" y2="30" stroke="#000000" strokeWidth="2" />
                            {/* Angry mouth */}
                            <line x1="42" y1="45" x2="58" y2="45" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                        </>
                    )}

                    {emotion === 'afraid' && (
                        <>
                            {/* Afraid eyes */}
                            <circle cx="42" cy="35" r="3" fill="#000000" />
                            <circle cx="58" cy="35" r="3" fill="#000000" />
                            {/* Afraid mouth */}
                            <path d="M 42 45 Q 50 42 58 45" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" />
                        </>
                    )}

                    {emotion === 'surprise' && (
                        <>
                            {/* Surprised eyes */}
                            <circle cx="42" cy="35" r="4" fill="#000000" />
                            <circle cx="58" cy="35" r="4" fill="#000000" />
                            {/* Surprised mouth */}
                            <circle cx="50" cy="45" r="3" fill="#000000" />
                        </>
                    )}

                    {/* Antenna */}
                    <line x1="50" y1="5" x2="50" y2="10" stroke="#999999" strokeWidth="2" />
                    <circle cx="50" cy="3" r="3" fill="#999999" />

                    {/* Ears/side details */}
                    <circle cx="25" cy="35" r="3" fill="#AAAAAA" />
                    <circle cx="75" cy="35" r="3" fill="#AAAAAA" />
                </g>

                {/* Body */}
                <g>
                    {/* Main body - rounded like the reference */}
                    <ellipse cx="50" cy="75" rx="15" ry="20" fill="#CCCCCC" />
                    <ellipse cx="50" cy="75" rx="12" ry="17" fill="#DDDDDD" />

                    {/* Neck */}
                    <rect x="45" y="55" width="10" height="5" rx="2" fill="#BBBBBB" />

                    {/* Body details */}
                    <circle cx="50" cy="70" r="3" fill="#AAAAAA" />
                    <circle cx="50" cy="80" r="3" fill="#AAAAAA" />
                </g>

                {/* Arms */}
                <g>
                    {/* Left arm */}
                    <path d="M 35 70 H 20 C 18 70 15 70 15 75 C 15 80 18 80 20 80 H 35" stroke="#CCCCCC" strokeWidth="5" strokeLinecap="round" />
                    <circle cx="15" cy="75" r="5" fill="#DDDDDD" stroke="#CCCCCC" strokeWidth="1" />

                    {/* Right arm */}
                    <path d="M 65 70 H 80 C 82 70 85 70 85 75 C 85 80 82 80 80 80 H 65" stroke="#CCCCCC" strokeWidth="5" strokeLinecap="round" />
                    <circle cx="85" cy="75" r="5" fill="#DDDDDD" stroke="#CCCCCC" strokeWidth="1" />
                </g>

                {/* Legs */}
                <g>
                    {/* Left leg */}
                    <path d="M 42 95 V 110 C 42 112 42 115 40 115 H 38" stroke="#CCCCCC" strokeWidth="5" strokeLinecap="round" />
                    <rect x="35" y="112" width="8" height="3" rx="1" fill="#AAAAAA" />

                    {/* Right leg */}
                    <path d="M 58 95 V 110 C 58 112 58 115 60 115 H 62" stroke="#CCCCCC" strokeWidth="5" strokeLinecap="round" />
                    <rect x="57" y="112" width="8" height="3" rx="1" fill="#AAAAAA" />
                </g>

                {/* Math symbols floating around - only for math context */}
                <g opacity="0.6">
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        dur="10s"
                        repeatCount="indefinite"
                    />
                    <text x="20" y="30" fontSize="10" fill="#4DA6FF">
                        ÷
                    </text>
                    <text x="75" y="30" fontSize="10" fill="#4DA6FF">
                        ×
                    </text>
                    <text x="20" y="70" fontSize="10" fill="#4DA6FF">
                        -
                    </text>
                    <text x="75" y="70" fontSize="10" fill="#4DA6FF">
                        +
                    </text>
                </g>
            </svg>
        </div>
    );
} 