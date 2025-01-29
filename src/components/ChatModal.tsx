import { useState, useEffect, useRef } from "react";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatId: string;
}

export default function ChatModal({ isOpen, onClose, chatId }: ChatModalProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const chatWindowRef = useRef<HTMLDivElement | null>(null);

  // Função para buscar mensagens do dia (API WAHA)
  const fetchMessages = async () => {
    try {
      const today = new Date().toISOString().split("T")[0]; // Data no formato YYYY-MM-DD
      const response = await fetch(
        `http://localhost:3000/api/messages?chatId=${chatId}&date=${today}`
      );
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    }
  };

  // Atualizar mensagens automaticamente a cada 5 segundos
  useEffect(() => {
    if (isOpen) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval); // Limpa o intervalo ao fechar o modal
    }
  }, [isOpen]);

  // Scroll automático para a última mensagem
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  // Função para enviar mensagem (apenas simulado aqui)
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      fromMe: true,
      message: { body: newMessage },
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage(""); // Limpa o campo de entrada
  };

  // Função para fazer download do histórico de mensagens
  const handleDownloadMessages = () => {
    const content = messages
      .map(
        (msg) =>
          `${msg.fromMe ? "Você" : "Contato"}: ${msg.message.body} (${msg.timestamp})`
      )
      .join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `historico_chat_${chatId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="chat-header">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h3>Chat com o contato</h3>
          <button className="download-btn" onClick={handleDownloadMessages}>
            Baixar histórico
          </button>
        </div>
        <div className="chat-window" ref={chatWindowRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.fromMe ? "sent" : "received"}`}
            >
              <p>{msg.message.body}</p>
              <small>{msg.timestamp}</small>
            </div>
          ))}
        </div>
        <div className="chat-input-area">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite uma mensagem..."
          />
          <button onClick={handleSendMessage}>Enviar</button>
        </div>
      </div>
    </div>
  );
}
