import type { TMessage } from "../types/TMessage"

interface ChatMessageProps {
    message: TMessage
}

export default function ChatMessage({message}: Readonly<ChatMessageProps>) {
    if(message.isUser) {
        return (
            <div className="rounded-lg rounded-tr-none max-w-[70%] ml-auto px-4 py-2 bg-message shadow-xs">
                <p className="text-left break-words">{message.text}</p>
            </div>
        )
    } else {
        return (
            <div>
                <p className="text-left break-words">{message.text}</p>
            </div>
        )
    }
    
}