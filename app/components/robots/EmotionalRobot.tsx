import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import happyAnimation from "./animations/happy.json";
import hmmAnimation from "./animations/hmm.json";
import sadAnimation from "./animations/sad.json";
import talkingAnimation from "./animations/talking.json";
import wowAnimation from "./animations/wow.json";

type Emotion = "neutral" | "happy" | "sad" | "surprise" | "talking";

interface EmotionalRobotProps {
  emotion: Emotion;
  size?: number;
}

const emotionAnimations = {
  happy: happyAnimation,
  sad: sadAnimation,
  neutral: hmmAnimation,
  surprise: wowAnimation,
  talking: talkingAnimation,
};

export default function EmotionalRobot({
  emotion = "happy",
  size = 150,
}: EmotionalRobotProps) {
  const [animate, setAnimate] = useState(false);

  // Trigger animation when emotion changes
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [emotion]);

  // Animation class for bouncing effect
  const animationClass = animate ? "animate-bounce" : "";

  return (
    <div className={`${animationClass} transition-all duration-300`}>
      <Lottie
        animationData={emotionAnimations[emotion]}
        loop={emotion === 'happy'}
        style={{ width: size, height: size }}
      />
    </div>
  );
}
