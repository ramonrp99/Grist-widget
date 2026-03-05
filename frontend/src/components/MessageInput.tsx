import { useEffect, useState } from "react"
import { getModels } from "../services/aiService"
import type { TModel } from "../types/TModel"

interface MessageInputProps {
    onSend: (message: string, context: string, model: string) => void
}

export default function MessageInput({onSend}: Readonly<MessageInputProps>) {
    const [models, setModels] = useState<TModel[]>([])

    useEffect(() => {
        getModels().then(models => setModels(models))
    }, [])

    function sendMessage(formData: FormData) {
        const message: string = formData.get('message') as string
        const context: string = formData.get('context') as string
        const model: string = formData.get('model') as string

        onSend(message, context, model)
    }

    return (
        <form
            action={sendMessage}
            className="flex flex-col gap-2"
        >
            <div>
                <input
                    type="text"
                    id="message"
                    name="message"
                    placeholder="Escribe..."
                    autoComplete="off"
                    className="p-1 w-full focus:outline-none"
                />
            </div>
            <div className="flex flex-row justify-between gap-2">
                <div className="flex">
                    <select 
                        name="context"
                        id="context"
                        className="field-sizing-content h-8 p-1 border-2 rounded-full cursor-pointer bg-secondary text-primary border-primary font-semibold hover:bg-message-hover focus:outline-none focus:bg-message-hover"
                    >
                        <option value="row">Fila seleccionada</option>
                        <option value="table">Tabla completa</option>
                    </select>
                </div>
                <div className="flex min-w-0 gap-2">
                    <select 
                        name="model"
                        id="model"
                        className="field-sizing-content flex-1 min-w-0 h-8 p-1 border-2 rounded-full cursor-pointer bg-secondary text-primary border-primary font-semibold hover:bg-message-hover focus:outline-none focus:bg-message-hover"
                    >
                        {
                            models.map(model => <option value={model.model} key={model.model}>{model.name}</option>)
                        }
                    </select>
                    <button
                        type="submit"
                        className="flex h-8 p-1 rounded-full cursor-pointer bg-primary text-secondary hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:bg-primary-hover"
                    >
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>
            </div>
        </form>
    )
}