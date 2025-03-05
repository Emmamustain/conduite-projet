export default function WavingRobot() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <circle cx="100" cy="85" r="50" fill="#FFB6C1" />
      <circle cx="100" cy="85" r="45" fill="white" />

      {/* Eyes */}
      <circle cx="80" cy="75" r="10" fill="#4DA6FF">
        <animate
          attributeName="r"
          values="10;8;10"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="120" cy="75" r="10" fill="#4DA6FF">
        <animate
          attributeName="r"
          values="10;8;10"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Smile */}
      <path
        d="M 75 95 Q 100 115 125 95"
        stroke="#FF6B9D"
        strokeWidth="4"
        fill="none"
      />

      {/* Waving Arm */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 150 85; 20 150 85; 0 150 85"
          dur="2s"
          repeatCount="indefinite"
        />
        <path
          d="M 150 85 L 170 65"
          stroke="#FFB6C1"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="170" cy="65" r="8" fill="#FFB6C1" />
      </g>

      {/* Body */}
      <path d="M 70 135 L 130 135 L 120 185 L 80 185 Z" fill="#FFB6C1" />
    </svg>
  );
}
