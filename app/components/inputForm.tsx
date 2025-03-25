import { ChatRequestOptions } from "ai";
import { Loader2, Mic, MicOff, Plus, Send } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import SelectedImages from "./selectedImages";

// Add type definitions for the Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  error: string;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
}

interface Window {
  SpeechRecognition?: new () => SpeechRecognition;
  webkitSpeechRecognition?: new () => SpeechRecognition;
}

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
  const [images, setImages] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    // Initialize speech recognition when component mounts
    if (
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      const SpeechRecognitionAPI =
        (window as Window).SpeechRecognition ||
        (window as Window).webkitSpeechRecognition;
      if (!SpeechRecognitionAPI) {
        return;
      }
      const recognitionInstance = new SpeechRecognitionAPI();

      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "fr-FR";

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        // Create a synthetic event to update the input
        const syntheticEvent = {
          target: { value: input + transcript },
        } as ChangeEvent<HTMLInputElement>;

        handleInputChange(syntheticEvent);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event: SpeechRecognitionEvent) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [input, handleInputChange]);

  const toggleListening = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleImageSelection = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const imagePromises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Process the file
      const reader = new FileReader();

      imagePromises.push(
        new Promise<string>((resolve, reject) => {
          // set onload on reader
          reader.onload = (e) => {
            const base64String = e.target?.result?.toString();
            // const base64String = e.target?.result?.toString().split(",")[1];
            resolve(base64String as string);
          };
          // set onerror on reader
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        })
      );
    }

    try {
      const base64Strings = await Promise.all(imagePromises); // Wait for all conversions
      // setImages(base64Strings as string[]);
      setImages((prevImages: string[]) => {
        // Explicitly type the result as a string array
        const updatedImages: string[] = [
          ...prevImages,
          ...(base64Strings as string[]),
        ];
        // const updatedImages: string[] = base64Strings as string[];
        return updatedImages;
      });
    } catch (error) {
      console.error("Error reading image:", error);
    }
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(event, {
          data: {
            images: JSON.stringify(images),
          },
        });
      }}
      className="w-full flex flex-row gap-2 items-center h-full mt-5"
    >
      <div className="border border-[#0842A0]/20 hover:border-[#0842A0]/50 rounded-lg flex flex-row relative transition-all">
        <Plus
          onClick={() => document.getElementById("fileInput")?.click()} // Click event handler
          className="cursor-pointer p-3 h-10 w-10 stroke-[#0842A0]"
        />
        <SelectedImages images={images} setImages={setImages} />
      </div>
      <input
        className="hidden"
        id="fileInput"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageSelection}
      />
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder={
            isLoading
              ? "Generating . . ."
              : isListening
                ? "Listening..."
                : placeholder
          }
          value={input}
          disabled={isLoading || isListening}
          onChange={handleInputChange}
          className="border-b outline-none w-full py-2 px-4 text-[#0842A0] placeholder:text-[#0842A099] text-right focus:placeholder-transparent disabled:bg-transparent rounded-lg border border-[#0842A0]/20 focus:border-[#0842A0]/50 transition-all"
        />
        <button
          type="button"
          onClick={toggleListening}
          disabled={isLoading}
          className="absolute left-2 top-1/2 transform -translate-y-1/2"
        >
          {isListening ? (
            <MicOff className="h-5 w-5 stroke-red-500" />
          ) : (
            <Mic className="h-5 w-5 stroke-[#0842A0]" />
          )}
        </button>
      </div>
      <button
        type="submit"
        className="rounded-full shadow-md border flex flex-row"
      >
        {isLoading ? (
          <Loader2
            onClick={stop}
            className="p-3 h-10 w-10 stroke-stone-500 animate-spin"
          />
        ) : (
          <Send className="p-3 h-10 w-10 stroke-stone-500" />
        )}
      </button>
    </form>
  );
};

export default InputForm;
