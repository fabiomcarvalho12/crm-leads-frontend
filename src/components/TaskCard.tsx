"use client";

import { useState, useEffect } from "react";
import TaskModal from "./TaskModal"; // Ensure to import TaskModal
import ReadMoreIcon from '@mui/icons-material/ReadMore'; // Import ReadMoreIcon from Material-UI

interface TaskCardProps {
  task: { id: string; name: string }; // Accepting task prop with id and name
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => { // Destructuring 'task' prop
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [isClient, setIsClient] = useState(false); // State to track if the component is rendered in the client

  useEffect(() => {
    // Set to true once the component is mounted on the client-side
    setIsClient(true);
    
    // Ensure a valid URL is set for the profile image
    const url = "https://randomuser.me/api/portraits/men/64.jpg";
    setProfileImageUrl(url);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  // Fallback URL for profile image in case it fails to load
  const fallbackImageUrl = "https://via.placeholder.com/150"; // Placeholder image

  // Prevent rendering the modal during SSR (Server-Side Rendering)
  if (!isClient) return null; // Don't render the component during SSR

  return (
    <>
      <div className="relative p-4 flex flex-col space-y-3 min-h-[150px] w-[250px] border rounded-lg shadow-md">
        {/* Contact Information */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full border border-green-600 overflow-hidden">
              <img
                src={profileImageUrl || fallbackImageUrl} // Fallback to placeholder if URL is empty
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
            onClick={handleOpenModal} // Open modal on click
            className="text-blue-600 cursor-pointer" // Styling for the icon
          />
        </div>
      </div>

      {isModalOpen && <TaskModal onClose={handleCloseModal} task={task} />} {/* Passing the task object */}
    </>
  );
};

export default TaskCard;
