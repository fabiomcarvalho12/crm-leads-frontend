"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility'; // Import Visibility Icon
import VisibilityOff from '@mui/icons-material/VisibilityOff'; // Import VisibilityOff Icon

const LoginPage = () => {
    const router = useRouter();

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    // Handle password input change
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleClick = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/admin');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* Main container */}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <img src="/nexus.png" alt="Logo" className="h-30 w-auto" />
                </div>

                {/* Form */}
                <form>
                    {/* Email Field */}
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

                    {/* Password Field */}
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
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
                            className="absolute right-3 top-8 cursor-pointer text-gray-400" // Lighter gray color
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </span>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        onClick={handleClick}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                    >
                        Entrar
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Primeiro acesso?{' '}
                        <a
                            href="/sign-up"
                            className="text-blue-500 hover:underline"
                        >
                            Clique aqui e crie sua conta.
                        </a>
                    </p>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Esqueci a minha senha.{' '}
                        <a
                            href="/redefine-password"
                            className="text-blue-500 hover:underline"
                        >
                            Clique aqui para redefinir.
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
