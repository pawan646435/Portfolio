"use client";

// components/ui/ChatWidget.tsx
//
// Text-only chat widget. Shows a static intro message disclosing this
// is an AI, not Pawan live, then answers questions grounded in
// lib/portfolio-knowledge.ts via /api/chat, rendered as markdown.
//
// (Previously had Web Speech API voice input/output — removed, the
// browser TTS quality wasn't good enough. Revisit if a good free
// voice option comes up.)
//
// Ties into the Codex Black & Gold theme via the CSS custom properties
// defined in app/globals.css (--accent-gold, --font-classical, etc).

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useApp } from "@/lib/context/AppContext";
import { useMediaQuery } from "@/lib/hooks";

const AVATAR = {
  idle: "/avatar/idle.png",
  thinking: "/avatar/thinking.png",
  speaking: "/avatar/speaking.png",
};

const GREETING =
  "Hi, I'm an AI chatbot trained on Pawan's background — I'll be answering on his behalf. Ask me anything about his projects, skills, or experience!";

const markdownComponents: ComponentProps<typeof ReactMarkdown>["components"] = {
  p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
  strong: ({ children }) => (
    <strong className="font-classical font-semibold text-text-primary tracking-wide">
      {children}
    </strong>
  ),
  ul: ({ children }) => <ul className="space-y-1.5 my-2 ml-1">{children}</ul>,
  ol: ({ children }) => (
    <ol className="space-y-1.5 my-2 ml-1 list-decimal list-inside marker:text-accent-gold">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="flex gap-2 leading-relaxed">
      <span className="text-accent-gold mt-[2px] shrink-0">◆</span>
      <span>{children}</span>
    </li>
  ),
  h1: ({ children }) => (
    <h1 className="font-classical text-lg text-text-primary mb-1 mt-2 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-classical text-base text-text-primary mb-1 mt-2 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-classical text-[15px] text-text-primary/90 mb-1 mt-2 first:mt-0">
      {children}
    </h3>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent-gold underline underline-offset-2 decoration-accent-gold/40 hover:decoration-accent-gold"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="bg-accent-gold/10 text-text-primary px-1.5 py-0.5 rounded text-[13px] font-mono">
      {children}
    </code>
  ),
  hr: () => <hr className="border-accent-gold/20 my-3" />,
};

function messageText(parts: { type: string; text?: string }[]) {
  return parts
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("");
}

export default function ChatWidget() {
  const { hasEntered, setOverlayOpen } = useApp();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  // RoomEngine's wheel/keyboard/swipe room-navigation listeners check
  // overlayOpen before acting (same mechanism RoomWorks' project overlay
  // uses) — syncing it here stops scrolling/swiping inside the chat from
  // being misread as a room-navigation gesture.
  useEffect(() => {
    setOverlayOpen(open);
    return () => setOverlayOpen(false);
  }, [open, setOverlayOpen]);

  const { messages, sendMessage, status } = useChat<UIMessage>({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    messages: [
      {
        id: "greeting",
        role: "assistant",
        parts: [{ type: "text", text: GREETING }],
      },
    ],
  });

  const isThinking = status === "submitted";
  const isStreaming = status === "streaming";

  const avatarState = isThinking ? "thinking" : isStreaming ? "speaking" : "idle";

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  if (!hasEntered) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isThinking || isStreaming) return;
    sendMessage({ text });
    setInput("");
  };

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with Pawan"}
        className={`fixed ${
          isMobile ? "bottom-20 right-4" : "bottom-6 right-6"
        } z-[600] h-16 w-16 rounded-full
                   overflow-hidden shadow-[0_0_24px_rgba(201,168,76,0.45)]
                   ring-2 ring-accent-gold/70 hover:ring-accent-gold
                   transition-all duration-500 animate-[chat-breathe_4s_ease-in-out_infinite]`}
      >
        <Image
          src={AVATAR.idle}
          alt="Chat with Pawan"
          width={64}
          height={64}
          className="object-cover h-full w-full"
        />
      </button>

      {/* Panel */}
      {open && (
        <div
          className={`fixed ${
            isMobile ? "bottom-36 right-4" : "bottom-24 right-6"
          } z-[600] w-[380px] max-w-[92vw] h-[560px]
                     max-h-[70vh] flex flex-col rounded-2xl overflow-hidden
                     bg-bg-secondary border border-border
                     shadow-[0_8px_40px_rgba(0,0,0,0.6)]`}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-bg-base">
            <div className="relative h-10 w-10 rounded-full overflow-hidden ring-1 ring-accent-gold/60">
              <Image
                src={AVATAR[avatarState]}
                alt=""
                width={40}
                height={40}
                className="object-cover h-full w-full transition-opacity duration-300"
              />
            </div>
            <div className="flex-1">
              <p className="font-classical text-text-primary text-xl leading-tight tracking-wide">
                Chat with Pawan
              </p>
              <p className="text-accent-gold/60 text-xs">
                {isThinking
                  ? "thinking…"
                  : isStreaming
                  ? "typing…"
                  : "AI trained on his background — not a live reply"}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-accent-gold/60 hover:text-accent-gold text-xl leading-none px-1"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4 text-[14px] text-text-primary/90"
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {messages.map((m) => {
              const text = messageText(m.parts);
              return (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "user" ? (
                    <div className="max-w-[80%] rounded-xl px-3.5 py-2.5 bg-accent-gold/15 text-text-primary border border-accent-gold/30 leading-relaxed">
                      {text}
                    </div>
                  ) : (
                    <div className="max-w-[85%] rounded-xl px-3.5 py-3 bg-surface border border-white/5">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                        {text}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              );
            })}

            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-surface border border-white/5 rounded-xl px-3.5 py-2.5">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-gold/70 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-gold/70 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-gold/70 animate-bounce" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={submit}
            className="flex items-center gap-2 px-3 py-3 border-t border-border bg-bg-base"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 bg-transparent text-text-primary placeholder:text-text-primary/30 text-sm outline-none px-3 py-2.5 rounded-lg border border-white/10 focus:border-accent-gold/50 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isThinking || isStreaming}
              className="text-bg-base bg-accent-gold hover:bg-accent-gold-bright disabled:opacity-30 disabled:cursor-not-allowed rounded-lg px-4 py-2.5 text-sm font-medium tracking-wide transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <style jsx global>{`
        @keyframes chat-breathe {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(201, 168, 76, 0.35);
          }
          50% {
            box-shadow: 0 0 34px rgba(201, 168, 76, 0.65);
          }
        }
      `}</style>
    </>
  );
}
