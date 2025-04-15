"use client";
import { useChat } from "ai/react";
import { useTranslations } from "next-intl";
import InputForm from "../../components/inputForm";
import Messages from "../../components/messages";
import PageLayout from "../../components/PageLayout";
import EmotionalRobot from "../../components/robots/EmotionalRobot";

export default function ChatPage() {
  const t = useTranslations("chat");
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "/api/genai",
    });

  return (
    <PageLayout showBackButton={false}>
      <h1 className="text-4xl font-bold mb-8 text-[#FF6B9D]">{t("title")}</h1>
      <div className="w-[250px] h-[250px] mx-auto mb-8">
        <EmotionalRobot emotion="happy" size={250} />
      </div>
      <InputForm
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
        placeholder={t("placeholder")}
      />
      <Messages messages={messages} isLoading={isLoading} />
    </PageLayout>
  );
}
