"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from "@mui/material/Tooltip";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const RedefinePasswordPage = () => {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Start with button disabled
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false); // State for password confirmation visibility

  // Function to handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Function to handle password confirmation change
  const handlePasswordConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.target.value);
    // Enable the button if passwords match
    if (e.target.value === password) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alert("Passwords do not match!");
      return;
    }
    router.push('/login');
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle password confirmation visibility
  const togglePasswordConfirmationVisibility = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Main form container */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-16">
        {/* Formulário */}
        <form onSubmit={handleClick}>
          {/* Campo de E-mail */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 px-4 py-2 border rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          {/* Campo de Senha */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full mt-1 px-4 py-2 border rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {/* Eye icon for toggling password visibility */}
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-8 cursor-pointer text-gray-400"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </span>
          </div>

          {/* Campo de Confirmação de Senha */}
          <div className="mb-6 relative">
            <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">
              Confirme sua Senha
            </label>
            <input
              type={showPasswordConfirmation ? 'text' : 'password'}
              id="passwordConfirmation"
              className="w-full mt-1 px-4 py-2 border rounded-md text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirme sua senha"
              value={passwordConfirmation}
              onChange={handlePasswordConfirmationChange}
              required
            />
            {/* Eye icon for toggling password confirmation visibility */}
            <span
              onClick={togglePasswordConfirmationVisibility}
              className="absolute right-3 top-8 cursor-pointer text-gray-400"
            >
              {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
            </span>
          </div>

          <div className="flex justify-between items-center">
            {/* Back to Login button with tooltip */}
            <Tooltip title="Voltar para Página de Login" arrow>
              <button
                onClick={handleBackToLogin}
                className="bg-gray-400 text-white p-2 rounded-md w-auto text-center hover:bg-blue-500 transition-colors"
              >
                <ArrowBackIcon />
              </button>
            </Tooltip>

            {/* Redefinir button */}
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`py-2 px-4 rounded-md ${isButtonDisabled ? 'bg-gray-400' : 'bg-blue-500'} text-white hover:bg-blue-600 transition`}
            >
              Redefinir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RedefinePasswordPage;
