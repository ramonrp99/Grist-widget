import './App.css'
import ChatList from './components/ChatList'
import MessageInput from './components/MessageInput'
import useChat from './hooks/useChat';
import useGrist from './hooks/useGrist';
import { generateCompletion } from './services/aiService';
import type { TGristRow } from './types/TGrist';
import { getMarkdownTable } from './utils/markdown';

export default function App() {
    const {messages, addMessage} = useChat()
    const {isReady, row, table} = useGrist()

    function sendMessage(message: string, context: string, model: string): void {
        addMessage(message, true)

        if(!isReady) {
            addMessage('Ha ocurrido un error inesperado.', false)
            return
        }

        let gristData: TGristRow[] = []

        if(context === 'row') {
            if(row) {
                gristData = [row]
            }
        } else {
            gristData = table
        }

        const mdTable = getMarkdownTable(gristData)

        generateCompletion(message, mdTable, model).then((data) => {
            addMessage(data.text, false)
        })
    }

    return (
        <div className='flex flex-col h-full'>
            <section className='flex-1 overflow-y-auto pb-4 mask-b-from-[calc(100%-1rem)] mask-b-to-100%'>
                <ChatList messages={messages}/>
            </section>
            <section className='p-2 border-2 border-neutral-200 rounded-xl shadow-md'>
                <MessageInput onSend={(message, context, model) => sendMessage(message, context, model)}/>
            </section>
        </div>
    )
}
