import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed w-full bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 md:hidden"
                onClick={toggleMobileMenu}
              >
                <Menu size={24} />
              </button>
              <Link to="/" className="flex items-center">
                <span className="text-primary-600 font-bold text-xl ml-2">CareerCoachAI</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {user && (
              <>
                <div className="relative ml-3">
                  <button
                    onClick={toggleNotifications}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 p-1 hover:bg-gray-100"
                  >
                    <Bell size={20} className="text-gray-600" />
                  </button>
                  {isNotificationsOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <div className="py-2 px-4 border-b border-gray-100">
                        <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        <div className="py-3 px-4 border-b border-gray-100 hover:bg-gray-50">
                          <p className="text-sm font-medium text-gray-900">New phase unlocked!</p>
                          <p className="text-xs text-gray-500 mt-1">You've unlocked the Exploration phase.</p>
                          <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                        </div>
                        <div className="py-3 px-4 border-b border-gray-100 hover:bg-gray-50">
                          <p className="text-sm font-medium text-gray-900">Mentor assigned</p>
                          <p className="text-xs text-gray-500 mt-1">Sarah Johnson is now your mentor. Schedule a call!</p>
                          <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                        </div>
                      </div>
                      <div className="py-2 px-4 text-center">
                        <Link to="/notifications" className="text-xs text-primary-600 font-medium">View all notifications</Link>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative ml-3">
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    {user.avatarUrl ? (
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={user.avatarUrl}
                        alt={user.name}
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-medium">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <span className="hidden md:block ml-2 text-sm font-medium text-gray-700">{user.name}</span>
                  </button>
                  {isProfileMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <User size={16} className="mr-2" />
                          <span>Your Profile</span>
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setIsProfileMenuOpen(false);
                          }}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut size={16} className="mr-2" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            {!user && (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;