"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { chatSuggestions, institute } from "@/lib/site-data";
import { Logo, Send, Close, Chat, Sparkle } from "@/components/site/Icons";

type Role = "user" | "assistant";
interface Msg {
  id: string;
  role: Role;
  content: string;
}

const WELCOME =
  "Assalamu alaikum, and welcome to Al-Noor Institute. I can help with our courses, fees, schedule, teachers and how to get started. What would you like to know?";

const uid = () => Math.random().toString(36).slice(2);

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [pinged, setPinged] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const convId = useRef<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setPinged(true), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) {
      setPinged(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;

    const userMsg: Msg = { id: uid(), role: "user", content };
    const assistantId = uid();
    const history = [...messages, userMsg];

    setMessages([...history, { id: assistantId, role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: convId.current,
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok || !res.body) {
        const fallback = await res.text().catch(() => "");
        throw new Error(
          fallback ||
            "The assistant is unavailable right now. Please contact Al-Noor Institute at info@alnoorinstitute.co.uk or 0800 123 4567.",
        );
      }

      const cid = res.headers.get("X-Conversation-Id");
      if (cid) convId.current = cid;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((cur) =>
          cur.map((m) => (m.id === assistantId ? { ...m, content: acc } : m)),
        );
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setMessages((cur) => cur.map((m) => (m.id === assistantId ? { ...m, content: message } : m)));
    } finally {
      setBusy(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  const lastAssistantEmpty =
    busy &&
    messages.length > 0 &&
    messages[messages.length - 1].role === "assistant" &&
    messages[messages.length - 1].content === "";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Chat with Al-Noor Institute"}
        className={`group fixed bottom-5 right-5 z-[60] flex items-center justify-center rounded-full text-gold-bright shadow-[0_16px_40px_rgba(10,31,68,0.4)] transition-transform duration-300 hover:scale-105 sm:bottom-6 sm:right-6 ${
          pinged && !open ? "animate-pulse-ring" : ""
        }`}
        style={{
          width: "3.75rem",
          height: "3.75rem",
          background: "linear-gradient(135deg, #143a76, #06152e)",
        }}
      >
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        >
          <Chat className="h-7 w-7" />
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
        >
          <Close className="h-7 w-7" />
        </span>
      </button>

      {open && (
        <div className="animate-widget-in fixed bottom-24 right-4 z-[60] flex h-[min(620px,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-[0_30px_80px_rgba(10,31,68,0.28)] sm:right-6">
          <div className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-deep px-5 py-4">
            <div className="pattern-dots-navy absolute inset-0 opacity-40" />
            <div className="relative flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                <Logo className="h-7 w-7" />
              </span>
              <div className="flex-1">
                <div className="font-display text-[1.05rem] font-semibold text-white">
                  Al-Noor Assistant
                </div>
                <div className="flex items-center gap-1.5 text-[0.75rem] text-on-navy-muted">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  Online · replies from our knowledge base
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-on-navy-muted transition-colors hover:bg-white/10 hover:text-white"
              >
                <Close className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-paper px-4 py-5">
            <div className="animate-msg-in flex gap-2.5">
              <Avatar />
              <Bubble role="assistant">{WELCOME}</Bubble>
            </div>

            {messages.length === 0 && (
              <div className="animate-msg-in space-y-2 pl-9">
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-muted">
                  Popular questions
                </p>
                <div className="flex flex-col gap-2">
                  {chatSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="group flex items-center gap-2 self-start rounded-full border border-line bg-white px-3.5 py-2 text-left text-[0.84rem] text-ink shadow-[var(--shadow-sm)] transition-all hover:border-gold/60 hover:text-gold-deep"
                    >
                      <Sparkle className="h-3.5 w-3.5 text-gold-deep" />
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="animate-msg-in flex justify-end">
                  <Bubble role="user">{m.content}</Bubble>
                </div>
              ) : (
                <div key={m.id} className="animate-msg-in flex gap-2.5">
                  <Avatar />
                  {m.content ? (
                    <Bubble role="assistant">{m.content}</Bubble>
                  ) : (
                    lastAssistantEmpty && <Typing />
                  )}
                </div>
              ),
            )}
          </div>

          <div className="border-t border-line bg-white px-3 py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-end gap-2 rounded-2xl border border-line bg-paper px-3 py-2 focus-within:border-gold/60"
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask about courses, fees, schedule…"
                className="max-h-24 flex-1 resize-none bg-transparent py-1.5 text-[0.9rem] text-ink placeholder:text-muted focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy text-gold-bright transition-all hover:bg-navy-soft disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-2 text-center text-[0.68rem] text-muted">
              Can&apos;t book here — enrol at {institute.website} or call {institute.phone}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function Avatar() {
  return (
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy/5 ring-1 ring-line">
      <Logo className="h-5 w-5" />
    </span>
  );
}

function Bubble({ role, children }: { role: Role; children: React.ReactNode }) {
  if (role === "user") {
    return (
      <div className="max-w-[80%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-navy px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-white">
        {children}
      </div>
    );
  }
  return (
    <div className="chat-md max-w-[85%] rounded-2xl rounded-tl-md border border-line bg-white px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-body shadow-[var(--shadow-sm)]">
      {typeof children === "string" ? <ReactMarkdown>{children}</ReactMarkdown> : children}
    </div>
  );
}

function Typing() {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-line bg-white px-4 py-3.5 shadow-[var(--shadow-sm)]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="typing-dot h-1.5 w-1.5 rounded-full bg-gold-deep"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}
