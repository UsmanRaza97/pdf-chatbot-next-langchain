'use client'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { PromptForm } from '@/components/prompt-form'
import {
  useState
} from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<{role: 'user'|'assistant',content:string}[]>([])
  const [loading, setLoading] = useState(false)
  const [input,setInput]=useState('')

  async function createIndexAndEmbeddings() {
    try {
      const result = await fetch('/api/setup', {
        method: "POST"
      })
      const json = await result.json()
    } catch (err) {
      console.log('err:', err)
    }
  }

  async function sendQuery() {
    if (!input) return
    setResult(prev=>([...prev,{content:input,role:'user'}]))
    setLoading(true)
    try {
      const res = await fetch('/api/read', {
        method: "POST",
        body: JSON.stringify(input)
      })
      const json = await res.json()
      const prevResults = [...result]
      prevResults.push({role:'user',content:input})
      setResult([...prevResults,{role:'assistant',content:json.data}])
      setLoading(false)
    } catch (err) {
      console.log('err:', err)
      setLoading(false)
    }
  }
  return (
    <main className="flex flex-col items-center justify-between p-24">
      {/* <input className='text-black px-2 py-1' onChange={e => setQuery(e.target.value)} />
      <button className="px-7 py-1 rounded-2xl bg-white text-black mt-2 mb-2" onClick={sendQuery}>Ask AI</button>
      {
        loading && <p>Asking AI ...</p>
      }
      {
        result && <p>{result}</p>
      } */}
      { /* consider removing this button from the UI once the embeddings are created ... */}
      {/* <button onClick={createIndexAndEmbeddings}>Create index and embeddings</button> */}
     
      <ChatList messages={result} />
          <ChatPanel
        id={'1'}
        isLoading={loading}
        // stop={false}
        // append={append}
        reload={false}
        messages={result}
        input={input}
        setInput={setInput}
        onSubmit={sendQuery}
      />
    </main>
  )
}
