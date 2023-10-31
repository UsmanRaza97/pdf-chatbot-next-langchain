import { type UseChatHelpers } from "ai/react";

import { PromptForm } from "@/components/prompt-form";
import { ButtonScrollToBottom } from "@/components/button-scroll-to-bottom";
import { Chips } from "./ui/chips";

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    // | 'append'
    | "isLoading"
    // | 'reload'
    // | 'stop'
    | "input"
    | "setInput"
  > {
  id?: string;
  messages: { role: "user" | "assistant"; content: string }[];
  reload: boolean;
  onSubmit: any;
  handleChip: (text:string)=>void
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
  onSubmit,
  handleChip
}: ChatPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <ButtonScrollToBottom />
      <div className="flex flex-row justify-center mx-auto sm:max-w-3xl ">
        <Chips isLoading={isLoading} handleClick={handleChip} chipBody="Why should i use it?" />
        <Chips isLoading={isLoading} handleClick={handleChip} chipBody="How it is helpful?" />
        <Chips isLoading={isLoading} handleClick={handleChip} chipBody="Can i have a free trial?" />
        <Chips isLoading={isLoading} handleClick={handleChip} chipBody="What are the payment plans?" />
      </div>
      <div className="mx-auto sm:max-w-3xl sm:px-4">
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
  );
}
