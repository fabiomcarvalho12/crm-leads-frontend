import { useState, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import TaskModal from "./TaskModal";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

interface TaskCardProps {
  task: { id: string; name: string };
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  useEffect(() => {
    const url = "https://randomuser.me/api/portraits/men/64.jpg";
    setProfileImageUrl(url);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const fallbackImageUrl = "https://via.placeholder.com/150";

  // Use Draggable para evitar transparência ao arrastar
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: task.id });

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`relative p-4 flex flex-col space-y-3 min-h-[150px] w-[250px] border rounded-lg shadow-md transition-all 
        ${isDragging ? "opacity-100 !shadow-lg scale-105" : "opacity-100"}`}
      >
        {/* Contact Information */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full border border-green-600 overflow-hidden">
              <img
                src={profileImageUrl || fallbackImageUrl}
                alt="Profile"
                className="rounded-full"
                width={40}
                height={40}
              />
            </div>
            <span className="text-sm font-medium text-green-600">John Doe</span>
          </div>
          <div className="bg-red-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow">
            High
          </div>
        </div>

        <div className="self-start rounded-lg bg-gray-100 p-3 shadow-md">
          <p className="text-xs text-gray-700">
            This contact came from WhatsApp Bot. Please handle with priority!
          </p>
        </div>

        {/* Flex container to align "Bot Contact" and ReadMoreIcon */}
        <div className="flex justify-between items-center mt-2">
          <span className="bg-gray-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow">
            Bot Contact
          </span>

          <ReadMoreIcon
            onClick={handleOpenModal}
            className="text-blue-600 cursor-pointer"
          />
        </div>
      </div>

      {isModalOpen && <TaskModal onClose={handleCloseModal} task={task} />}
    </>
  );
};

export default TaskCard;
