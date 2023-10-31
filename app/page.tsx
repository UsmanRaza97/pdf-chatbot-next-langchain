"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { ChatList } from "@/components/chat-list";
import { ChatPanel } from "@/components/chat-panel";
import { Toast } from "@/components/ui/toast";

export default function Home() {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [result, setResult] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState('')

  
  useLayoutEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [result]);

  async function createIndexAndEmbeddings() {
    try {
      const result = await fetch("/api/setup", {
        method: "POST",
      });
      const json = await result.json();
    } catch (err) {
      console.log("err:", err);
    }
  }

  async function sendQuery() {
    if (!input) return;
    setResult((prev) => [...prev, { content: input, role: "user" }]);
    setLoading(true);
    try {
      const res = await fetch("/api/read", {
        method: "POST",
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        setErrors(res?.statusText ?? 'Something went wrong')
        setTimeout(()=>setErrors(''),5000)
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const json = await res.json();
      const prevResults = [...result];
      prevResults.push({ role: "user", content: input });
      setResult([...prevResults, { role: "assistant", content: json.data }]);
      setLoading(false);
    } catch (err) {
      console.log("err:", err);
      setLoading(false);
    }
  }
  return (
    <main ref={chatContainerRef} className="flex flex-col items-center justify-between p-24 h-screen overflow-y-auto">
      {/* consider removing this button from the UI once the embeddings are created ... */}
      {/* <button onClick={createIndexAndEmbeddings}>Create index and embeddings</button> */}

      <ChatList messages={result} />
      <ChatPanel
        id={"1"}
        isLoading={loading}
        // stop={false}
        // append={append}
        reload={false}
        messages={result}
        input={input}
        setInput={setInput}
        onSubmit={sendQuery}
      />
      {errors.length ? <Toast/>:null}
    </main>
  );
}
