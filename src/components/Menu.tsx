"use client";

import { useState } from "react";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import { AccountCircle, Settings, ExitToApp } from "@mui/icons-material";
import { useRouter } from "next/navigation"; // For redirection

// Mapeamento de ícones do Material-UI
const iconMapping: { [key: string]: React.ReactNode } = {
  Home: <HomeIcon />,
  User: <PersonIcon />,
  Collaborator: <GroupsIcon />,
  Contact: <MoveToInboxIcon />,
  MyLead: <ViewKanbanIcon />,
  Customer: <ReduceCapacityIcon />,
  Profile: <AccountCircle />,
  Settings: <Settings />,
  Logout: <ExitToApp />,
};

// Dados do menu
const menuItems = [
  {
    title: "MENU",
    items: [
      { icon: iconMapping.Home, label: "Início", href: "/admin", visible: ["admin", "user"] },
      { icon: iconMapping.User, label: "Usuários", href: "/list/user", visible: ["admin", "user"] },
      { icon: iconMapping.Collaborator, label: "Colaboradores", href: "/list/collaborator", visible: ["admin", "user"] },
      { icon: iconMapping.Contact, label: "Contatos", href: "/list/contact", visible: ["admin", "user"] },
      { icon: iconMapping.MyLead, label: "Meus Leads", href: "/list/my-lead", visible: ["admin", "user"] },
      { icon: iconMapping.Customer, label: "Clientes", href: "/list/customer", visible: ["admin", "user"] },
    ],
  },
  {
    title: "OTHER",
    items: [
      { icon: iconMapping.Profile, label: "Perfil", href: "/profile", visible: ["admin", "user"] },
      { icon: iconMapping.Settings, label: "Configurações", href: "/settings", visible: ["admin", "user"] },
      { icon: iconMapping.Logout, label: "Sair", href: "/login", visible: ["admin", "user"] },
    ],
  },
];

const Menu = () => {
  const [isModalOpen, setModalOpen] = useState(false); // State for showing the modal
  const [logoutHref, setLogoutHref] = useState(""); // State to store the logout href for redirection
  const router = useRouter(); // Router for programmatic navigation

  const handleLogoutClick = (href: string) => {
    setLogoutHref(href);
    setModalOpen(true); // Open the modal when "Logout" is clicked
  };

  const handleConfirmLogout = () => {
    setModalOpen(false);
    router.push(logoutHref); // Redirect to the sign-in page if confirmed
  };

  const handleCancelLogout = () => {
    setModalOpen(false); // Close the modal without action if canceled
  };

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes("admin")) {
              return item.label === "Sair" ? (
                <button
                  key={item.label}
                  onClick={() => handleLogoutClick(item.href)} // Handle the logout click
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <span>{item.icon}</span>
                  <span className="lg:inline-block hidden">{item.label}</span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <span>{item.icon}</span>
                  <span className="lg:inline-block hidden">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}

      {/* Modal for Logout Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[15%] max-w-md">
            <h3 className="text-lg font-medium">Deseja realmente sair?</h3>
            <div className="mt-4 flex gap-4 justify-center">
              <button
                onClick={handleConfirmLogout}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Sim
              </button>
              <button
                onClick={handleCancelLogout}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;