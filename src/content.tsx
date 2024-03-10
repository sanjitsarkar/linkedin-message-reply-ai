import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"

import { ReplyProvider } from "~contexts/ReplyContext"
import GenerateReply from "~features/GenerateReply"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
export const getInlineAnchor: PlasmoGetInlineAnchor = () => {
  return document?.querySelector("div.msg-form__contenteditable")
}
export const getShadowHostId = () => "content-script-ui"
const ContentScriptUI = () => {
  return (
    <ReplyProvider>
      <GenerateReply />
    </ReplyProvider>
  )
}

export default ContentScriptUI
