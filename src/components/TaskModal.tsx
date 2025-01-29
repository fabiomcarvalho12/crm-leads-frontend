"use client";

import { useState, useRef, useEffect } from "react";
import { Download as DownloadIcon } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { jsPDF } from "jspdf";

interface TaskModalProps {
  onClose: () => void;
  task: { id: string; name: string };
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose, task }) => {
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("High");
  const [chatMessages, setChatMessages] = useState([
    { sender: "contact", message: "Olá, bom dia", timestamp: "10:00 AM" },
    { sender: "user", message: "Bom dia. Sou a atendente virtual do escritório Karol Fernandes Advocacia. Em que posso ajudar?", timestamp: "10:02 AM" },
    { sender: "contact", message: "Karol, quero saber tudo sobre BPC LOAS", timestamp: "10:00 AM" },
    { sender: "user", message: "Deixa comigo", timestamp: "10:02 AM" },
    { sender: "contact", message: "Quero saber dos documentos necessários", timestamp: "10:00 AM" },
    { sender: "user", message: "Vou providenciar uma lista", timestamp: "10:02 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [createdDate] = useState<string>(new Date().toLocaleDateString());
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleDownload = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(12);
      let y = 10;
      doc.text(`${task.name} Chat History`, 10, y);
      y += 10;
      chatMessages.forEach(({ sender, message, timestamp }) => {
        doc.text(`${timestamp} - ${sender === "user" ? "You" : "Contact"}: ${message}`, 10, y);
        y += 10;
      });
      doc.save(`${task.name}_history_message.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-[500px] z-50">
        <h2 className="text-xl font-bold mb-4">Detalhes do Contato</h2>

        {/* Priority Tag (SelectionItem with button styles) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-green-700">Prioridade</label>
          <div className="flex space-x-2 mt-2">
            {["High", "Medium", "Low"].map((level) => (
              <button
                key={level}
                onClick={() => setPriority(level as "High" | "Medium" | "Low")}
                className={`px-4 py-1 rounded-full text-sm font-semibold ${priority === level
                  ? level === "High"
                    ? "bg-red-500 text-white"
                    : level === "Medium"
                      ? "bg-orange-500 text-white"
                      : "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
                  }`}
              >
                {level === "High" ? "Alta" : level === "Medium" ? "Média" : "Baixa"}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <div className="mt-2 flex items-center">
            <div className="p-1 border-green-500 rounded-full">
              <WhatsAppIcon className="text-green-500" />
            </div>
            <label className="ml-1 px-3 py-1 text-sm text-gray-700">
              (00) 12345-6789
            </label>
          </div>
        </div>
        {/* Chat History (WhatsApp-style) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-green-700 flex justify-between">
            Mensagens
            <Tooltip title="Download Chat" arrow placement="top">
              <DownloadIcon
                onClick={handleDownload}
                className="cursor-pointer text-blue-600 hover:text-blue-800"
              />
            </Tooltip>
          </label>
          <div ref={chatRef} className="mt-1 bg-gray-100 p-3 rounded-lg h-48 overflow-y-auto">
            {chatMessages.map((chat, index) => (
              <div key={index} className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"} mb-2`}>
                <div className={`p-2 rounded-lg text-sm ${chat.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"}`}>
                  {chat.message}
                  <div className={`text-xs mt-1 text-right ${chat.sender === "user" ? "text-white" : "text-gray-500"}`}>{chat.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Created Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-green-700">Data de Criação</label>
          <div className="mt-1 text-sm text-gray-900">{createdDate}</div>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
