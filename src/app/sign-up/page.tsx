"use client";

import { useRouter } from "next/navigation"; // Import useRouter hook
import UserForm from "@/components/forms/UserForm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import ArrowBackIcon
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip from Material-UI

const SignUpUserPage = () => {
  const router = useRouter(); // Initialize the router

  const handleBackToLogin = () => {
    router.push("/login"); // Navigate to the login page
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-4">
      <Tooltip title="Voltar para Página de Login" arrow>
        <button
          onClick={handleBackToLogin}
          className="mt-4 bg-gray-400 text-white p-2 rounded-md w-full md:w-auto text-center hover:bg-blue-500 transition-colors mb-4"
        >
          <ArrowBackIcon />
        </button>
      </Tooltip>
      <UserForm type="create" />
    </div>
  );
};

export default SignUpUserPage;
