import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { isAnyUserLoggedIn, getCurrentUserRole, getCurrentUsername } from '../lib/supabase';
import { useNotifications } from '../hooks/useSupabase';

const Header: React.FC = () => {
  const location = useLocation();
  const isLoggedIn = isAnyUserLoggedIn();
  const userRole = getCurrentUserRole();
  const username = getCurrentUsername();
  const { unreadCount } = useNotifications();
  
  const navItems = [
    { path: '/', label: 'Início' },
    { path: '/cars', label: 'Revenda' },
    { path: '/workshop', label: 'Oficina' },
    { path: '/invoices', label: 'Notas Fiscais' },
  ];

  return (
    <header className="bg-black/90 backdrop-blur-sm border-b-2 border-red-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">
                MECÂNICA GUAIANASES
              </h1>
              <p className="text-red-400 text-xs">GuaianaseRP</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-red-400'
                    : 'text-white hover:text-red-400'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                    layoutId="underline"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Admin Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <div className="flex items-center space-x-2">
                <Link
                  to="/admin"
                  className="relative flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <Bell className="h-4 w-4 text-white" />
                  {userRole === 'admin' && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                  <span className="text-white text-sm font-medium">
                    Painel
                  </span>
                </Link>
                <span className="text-white text-sm">
                  {userRole === 'admin' ? 'Admin' : 'Mecânico'} ({username})
                </span>
              </div>
            )}
            {!isLoggedIn && (
              <Link
                to="/admin/login"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;