export default function ChatRobot() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <circle cx="50" cy="45" r="30" fill="#87CEEB" />
      <circle cx="50" cy="45" r="25" fill="white" />

      {/* Eyes */}
      <circle cx="40" cy="40" r="5" fill="#4DA6FF">
        <animate
          attributeName="r"
          values="5;4;5"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="60" cy="40" r="5" fill="#4DA6FF">
        <animate
          attributeName="r"
          values="5;4;5"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Smile */}
      <path
        d="M 40 50 Q 50 60 60 50"
        stroke="#4DA6FF"
        strokeWidth="2"
        fill="none"
      />

      {/* Body */}
      <path d="M 35 75 L 65 75 L 60 95 L 40 95 Z" fill="#87CEEB" />

      {/* Chat Bubble */}
      <g>
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="2s"
          repeatCount="indefinite"
        />
        <path d="M 70 30 L 85 30 L 85 45 L 75 40 L 70 45 Z" fill="#4DA6FF" />
        <circle cx="75" cy="37" r="2" fill="white" />
        <circle cx="80" cy="37" r="2" fill="white" />
      </g>
    </svg>
  );
}
