"use client";

import dynamic from "next/dynamic";
import { ChatWidgetSkeleton } from "@/components/site/Skeleton";

const ChatWidget = dynamic(
  () => import("@/components/chat/ChatWidget").then((m) => m.ChatWidget),
  {
    ssr: false,
    loading: () => <ChatWidgetSkeleton />,
  },
);

export function ChatWidgetLazy() {
  return <ChatWidget />;
}
