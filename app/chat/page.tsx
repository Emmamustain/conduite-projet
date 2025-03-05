"use client";
import { useChat } from "ai/react";
import Messages from "../component/messages";
import InputForm from "../component/inputForm";
import ChatResponseRobot from "../components/robots/ChatResponseRobot";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/genai",
    });

  const [responding, setResponding] = useState(false);

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].role === "assistant"
    ) {
      setResponding(true);
      const timer = setTimeout(() => {
        setResponding(false);
      }, 2000); // Animation duration

      return () => clearTimeout(timer);
    }
  }, [messages]);

  return (
    <main className="flex min-h-screen flex-col items-center p-12 text-lg">
      <ChatResponseRobot responding={responding} />
      <InputForm
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
      />
      <Messages messages={messages} isLoading={isLoading} />
    </main>
  );
}
