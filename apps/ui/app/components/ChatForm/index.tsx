import { FormEvent, useState } from "react";
import { Textarea } from "@heroui/input";

const ChatForm = () => {
  const [input, setInput] = useState("");

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setInput("");
  };

  return (
    <div className="fixed bottom-0 max-w-3xl left-0 right-0 m-auto">
      <form
        className="h-full py-2"
        onSubmit={handleSend}
      >
        <Textarea
          className="flex-1 h-full py-2 rounded-sm outline-none border-none"
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
      </form>
    </div>
  );
};

export default ChatForm;
