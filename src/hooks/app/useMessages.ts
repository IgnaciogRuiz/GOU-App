import { useEffect, useState } from "react";
import { getMessages } from "../../api/graphql";
import { useAuth } from "../../contexts"; 

export const useMessages = (chatId: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const fetchMessages = async () => {
    try {
      setLoading(true);
      if (!chatId || !token) return;
      const msgs = await getMessages(chatId, token);
      setMessages(msgs);
    } catch (err: any) {
      console.error("Error cargando mensajes:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatId && token) fetchMessages();
  }, [chatId, token]);

  return { messages, setMessages, loading, error, refetch: fetchMessages };
};
