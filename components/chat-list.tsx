
import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-message'
import { useEffect, useLayoutEffect, useRef } from 'react';

export interface ChatList {
  messages: {role: 'user'|'assistant',content:string}[]
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4 pb-12" >
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} />
          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
    </div>
  )
}
