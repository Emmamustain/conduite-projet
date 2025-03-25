import { Message } from "ai/react";
import { Bot, User2 } from "lucide-react";
import Markdown from "./markdown";

type Props = {
  messages: Message[];
  isLoading: boolean;
};

const Messages = ({ messages, isLoading }: Props) => {
  // Filter out consecutive duplicate messages
  const filteredMessages = messages.filter((message, index) => {
    if (index === 0) return true;
    return message.content !== messages[index - 1].content;
  });

  return (
    <div
      id="chatbox"
      className="flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap"
    >
      {filteredMessages.map((m, index) => {
        return (
          <div
            key={index}
            className={`p-6 shadow-lg rounded-xl ml-10 relative ${m.role === "user"
              ? "bg-[#FF8FB1] text-white"
              : "bg-white border-2 border-[#FF8FB1]/20 text-[#1a1a1a]"
              }`}
          >
            <Markdown text={m.content} />
            {m.role === "user" ? (
              <User2 className="absolute -left-10 top-4 border-2 border-[#FF8FB1] rounded-full p-1 bg-white shadow-lg" />
            ) : (
              <Bot
                className={`absolute -left-10 top-4 border-2 border-[#FF8FB1] rounded-full p-1 bg-white shadow-lg stroke-[#FF8FB1] ${isLoading && index === messages.length - 1
                  ? "animate-bounce"
                  : ""
                  }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
