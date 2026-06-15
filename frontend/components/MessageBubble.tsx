import ReactMarkdown from "react-markdown";
import type { ChatMessage } from "@/lib/chat";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
      <span className="font-mono text-xs uppercase tracking-widest text-muted">
        {isUser ? "you" : "ai"}
      </span>
      <div
        className={`max-w-[80ch] rounded-sm border px-4 py-3 text-sm leading-relaxed sm:max-w-[65ch] ${
          isUser
            ? "whitespace-pre-wrap border-accent-dim bg-accent/5 text-foreground"
            : "border-border bg-surface text-foreground [&>*]:my-2 first:[&>*]:mt-0 last:[&>*]:mb-0 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_strong]:font-semibold [&_code]:rounded-sm [&_code]:bg-accent/10 [&_code]:px-1 [&_code]:py-0.5"
        }`}
      >
        {isUser ? message.content : <ReactMarkdown>{message.content}</ReactMarkdown>}
      </div>
    </div>
  );
}
