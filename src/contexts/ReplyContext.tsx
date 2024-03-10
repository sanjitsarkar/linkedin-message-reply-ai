import { createContext, useContext, useState } from "react"

import { DUMMY_REPLY, INITIAL_DATA_STATE } from "~utils/constants"
import openai from "~utils/openAI"

const ReplyContext = createContext<{
  reply?: { data?: string; loading: boolean; error?: string }
  generateReplyWithAI?: (prompt: string) => Promise<void>
}>({})
const ReplyProvider = ({ children }) => {
  const [reply, setReply] = useState(INITIAL_DATA_STATE)

  const generateReplyWithAI = async (prompt: string) => {
    try {
      setReply({
        ...reply,
        loading: true
      })
      const respnse = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo"
      })
      if (respnse) {
        setReply({
          ...reply,
          data: respnse.choices[0].message.content,
          loading: false
        })
      }
    } catch (err: any) {
      setReply({
        ...reply,
        error: err.mesage,
        data: DUMMY_REPLY,
        loading: false
      })
    }
  }
  return (
    <ReplyContext.Provider value={{ reply, generateReplyWithAI }}>
      {children}
    </ReplyContext.Provider>
  )
}

const useReply = () => useContext(ReplyContext)
export { useReply, ReplyProvider }
