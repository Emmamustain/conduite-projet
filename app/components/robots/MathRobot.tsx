export default function MathRobot() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <circle cx="50" cy="45" r="30" fill="#FFB6C1" />
      <circle cx="50" cy="45" r="25" fill="white" />

      {/* Eyes */}
      <text x="35" y="45" fontSize="15" fill="#4DA6FF">
        +
      </text>
      <text x="55" y="45" fontSize="15" fill="#4DA6FF">
        =
      </text>

      {/* Smile */}
      <path
        d="M 40 50 Q 50 60 60 50"
        stroke="#FF6B9D"
        strokeWidth="2"
        fill="none"
      />

      {/* Body */}
      <path d="M 35 75 L 65 75 L 60 95 L 40 95 Z" fill="#FFB6C1" />

      {/* Math symbols floating around */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="10s"
          repeatCount="indefinite"
        />
        <text x="20" y="30" fontSize="12" fill="#4DA6FF">
          ÷
        </text>
        <text x="75" y="30" fontSize="12" fill="#4DA6FF">
          ×
        </text>
        <text x="20" y="70" fontSize="12" fill="#4DA6FF">
          -
        </text>
        <text x="75" y="70" fontSize="12" fill="#4DA6FF">
          +
        </text>
      </g>
    </svg>
  );
}
