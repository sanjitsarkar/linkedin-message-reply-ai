import GenerateIcon from "~components/Icons/GenerateIcon"

const GenerateButton = ({ setGenerateModal }) => {
  return (
    <button
      onClick={() => {
        setGenerateModal((prevState) => !prevState)
      }}
      className="absolute right-[60px] bottom-[10px] bg-white p-2 rounded-full shadow-2xl">
      <GenerateIcon />
    </button>
  )
}

export default GenerateButton
