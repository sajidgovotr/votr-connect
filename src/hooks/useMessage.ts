import { IMessageContext, MessageContext } from "@/context/message-context"
import { useContext } from "react"

const useMessage = () => {
    const context = useContext(MessageContext) as IMessageContext;
    if (!context) {
        throw new Error('useMessage must be used within a MessageProvider');
    }
    return context;
}

export default useMessage;