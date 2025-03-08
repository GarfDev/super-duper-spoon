import { useState, FormEvent } from "react";
import {Button, Input, ScrollShadow } from "@heroui/react";
import clsx from "clsx";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const initialMessages: Message[] = [
  { sender: "bot", text: "Hello! How can I help you today?" },
  { sender: "user", text: "I'm looking for some advice on starting a new project." },
  { sender: "bot", text: "Great! Let's discuss your project ideas." }
];


const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");


  return (
    <div className="w-full h-full mx-auto my-4 rounded-md shadow-md overflow-hidden">
   
      {/* Chat messages area */}
      <ScrollShadow className="h-full rounded-xl p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={clsx("flex mb-5", {
              "justify-end": msg.sender === "user",
              "justify-start": msg.sender === "bot",
            })}
          >
            <div className={clsx("px-4 py-3 rounded-lg max-w-[80%]", {
              "bg-zinc-800 text-white": msg.sender === "user",
              "bg-[transparent] text-white": msg.sender === "bot"
            })}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </ScrollShadow>
    </div>
  );
};

export default ChatWindow;


// Required features
// - [ ] Show transcripts