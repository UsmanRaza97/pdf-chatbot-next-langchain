import { type UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconRefresh, IconStop } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    // | 'append'
    | 'isLoading'
    // | 'reload'
    // | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string,
  messages:{role: 'user'|'assistant',content:string}[],
  reload:boolean,
  onSubmit: any
}

export function ChatPanel({
  id,
  isLoading,
//   stop,
//   append,
  reload,
  input,
  setInput,
  messages,
  onSubmit
}: ChatPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
     
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={onSubmit}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
