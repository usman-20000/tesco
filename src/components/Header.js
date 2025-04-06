import React, { useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faCircleQuestion, faQuestion, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

function Header() {

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setShowLogoutModal(false);
    closeSidebar();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className='flex flex-row items-center'>
          {/* Left: Hamburger Menu */}
          <button
            className="hamburger-menu"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>

          {/* Center: Dashboard Text */}
          <h1 className="header-title ml-[20%] mt-2">Dashboard</h1>
        </div>

        {/* Right: Help Button */}
        <button onClick={() => alert('Help clicked!')}>
          <FontAwesomeIcon icon={faCircleQuestion} className='text-[#347928] text-[24px]' />
        </button>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="sidebar">
          <button className="close-sidebar" onClick={closeSidebar}>
            &times;
          </button>
          <nav className="sidebar-nav flex flex-col items-center">
            <a href="/" onClick={closeSidebar}>Home</a>
            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </nav>
        </div>
      )}

      {/* Overlay for Sidebar */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Are you sure you want to logout?</h2>
            <div className="modal-actions">
              <button className="confirm-button" onClick={handleLogout}>
                Yes
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowLogoutModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;