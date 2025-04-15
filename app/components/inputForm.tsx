import { ChatRequestOptions } from "ai";
import { Loader2, Send } from "lucide-react";
import { ChangeEvent, FormEvent } from "react";

type Props = {
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  input: string;
  isLoading: boolean;
  stop: () => void;
  placeholder?: string;
};

const InputForm = ({
  handleInputChange,
  handleSubmit,
  input,
  isLoading,
  stop,
  placeholder = "ask something . . . ",
}: Props) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(event);
      }}
      className="w-full flex flex-row gap-3 items-center h-full mt-5"
    >
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder={isLoading ? "Generating . . ." : placeholder}
          value={input}
          disabled={isLoading}
          onChange={handleInputChange}
          className="w-full py-4 px-6 text-lg text-[#0842A0] placeholder:text-[#0842A099] rounded-full border-2 border-[#FFB6C1] focus:border-[#FF6B9D] transition-all outline-none shadow-md disabled:bg-transparent font-comic-sans"
        />
      </div>
      <button
        type="submit"
        className="rounded-full shadow-md border-2 border-[#FFB6C1] hover:border-[#FF6B9D] hover:scale-105 transition-all bg-white p-2"
      >
        {isLoading ? (
          <Loader2
            onClick={stop}
            className="p-2 h-12 w-12 stroke-[#FF6B9D] animate-spin"
          />
        ) : (
          <Send className="p-2 h-12 w-12 stroke-[#FF6B9D]" />
        )}
      </button>
    </form>
  );
};

export default InputForm;
