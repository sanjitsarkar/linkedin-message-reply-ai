import React, { useEffect, useRef, useState } from "react"

import InsertIcon from "~components/Icons/InsertIcon"
import RegenerateIcon from "~components/Icons/RegenerateIcon"
import SendIcon from "~components/Icons/SendIcon"
import { useReply } from "~contexts/ReplyContext"

const GenerateModal = ({ setGenerateModal, insertGeneratedReply }) => {
  const [chats, setChats] = useState([])
  const [input, setInput] = useState("")
  const endRef = useRef(null)
  const { generateReplyWithAI, reply } = useReply()
  const generateReply = async () => {
    if (!input) return
    await generateReplyWithAI(input)
  }

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chats])
  useEffect(() => {
    if (!reply.loading && reply.data) {
      setChats((prevChats) => [...prevChats, input, reply.data])
      setInput("")
    }
  }, [reply])

  return (
    <div className="!fixed !top-0 !right-0 !left-0 !bottom-0 !z-50 !w-screen !h-screen !flex !items-center !justify-center">
      <div className="flex flex-col gap-4 bg-white p-8 rounded-md shadow-2xl z-50 md:w-5/12 w-10/12 ">
        <div className="flex flex-col gap-4 max-h-96 overflow-y-scroll">
          {chats.map((chat, i) => (
            <p
              key={chat + i}
              className={`${
                i % 2 ? "bg-cyan-200 self-start" : "bg-gray-200 self-end"
              } p-4 rounded-md max-w-full text-wrap break-words`}>
              {chat}
            </p>
          ))}
          <div ref={endRef} />
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Your prompt"
          className="p-4 border-gray-400 border rounded-md w-full outline-none placeholder:text-gray-700 placeholder:text-2xl text-xl"
        />
        <div className="self-end flex gap-4">
          {chats.length > 0 && (
            <button
              onClick={() => {
                insertGeneratedReply(chats[chats.length - 1])
                setGenerateModal(false)
              }}
              className="flex justify-center gap-2 py-2 px-4 bg-white rounded-md items-center text-gray-700 border border-gray-700">
              <InsertIcon className="scale-75" />
              <span className="text-2xl">Insert</span>
            </button>
          )}
          <button
            disabled={!input || reply?.loading}
            onClick={generateReply}
            className="flex justify-center gap-2 py-2 px-4 bg-blue-600 rounded-md items-center text-white">
            {reply.loading ? (
              <span className="text-2xl">Generating...</span>
            ) : (
              <>
                {chats.length ? (
                  <RegenerateIcon className="scale-75" />
                ) : (
                  <SendIcon className="scale-75" />
                )}
                <span className="text-2xl">
                  {chats.length ? "Regenerate" : "Generate"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
      <div
        onClick={() => {
          setGenerateModal(false)
        }}
        className="!w-full !h-full bg-gray-500 bg-opacity-60 !absolute !top-0 !left-0 !z-40 !right-0 !bottom-0"
      />
    </div>
  )
}

export default GenerateModal
