"use client";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import InputForm from "../component/inputForm";
import Messages from "../component/messages";
import PageLayout from "../components/PageLayout";
import ChatResponseRobot from "../components/robots/ChatResponseRobot";

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
    <PageLayout>
      <ChatResponseRobot responding={responding} />
      <InputForm
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
      />
      <Messages messages={messages} isLoading={isLoading} />
    </PageLayout>
  );
}
