import React, { useState } from "react"

import GenerateButton from "~components/GenerateButton"
import GenerateModal from "~components/GenerateModal"

export default function GenerateReply() {
  const [generateModal, setGenerateModal] = useState(false)

  const insertGeneratedReply = (value: string) => {
    const chatBoxPlaceholder = document.querySelector(
      'div[data-placeholder="Write a message…"]'
    )

    chatBoxPlaceholder.classList.toggle("msg-form__placeholder")

    const chatBox = document.querySelector("div.msg-form__contenteditable")

    chatBox.setAttribute("data-artdeco-is-focused", "true")

    const chatBoxText = document.querySelector(
      "div.msg-form__contenteditable>p"
    )

    chatBoxText.textContent = value

    const sendButton = document.querySelector(
      "button.msg-form__send-button"
    ) as HTMLButtonElement

    if (sendButton) {
      sendButton.disabled = false
    }
  }

  return (
    <>
      <GenerateButton setGenerateModal={setGenerateModal} />
      {generateModal && (
        <GenerateModal
          insertGeneratedReply={insertGeneratedReply}
          setGenerateModal={setGenerateModal}
        />
      )}
    </>
  )
}
