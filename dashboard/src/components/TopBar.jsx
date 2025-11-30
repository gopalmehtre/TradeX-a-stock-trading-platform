import React, { useEffect, useState } from 'react'
import Menu from "./Menu";
import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch user info
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/', {
          method: 'POST',
          credentials: 'include'
        });
        const data = await response.json();
        
        if (data.status && data.user) {
          setUsername(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    // Clear the cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Redirect to login
    window.location.href = 'http://localhost:3000/auth';
  };

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{100.2} </p>
          <p className="percent"> </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{100.2}</p>
          <p className="percent"></p>
        </div>
      </div>

      <Menu />

      <div className="user-info" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '15px',
        marginLeft: '20px'
      }}>
        <ThemeToggle />
        {username && (
          <span style={{ color: '#666', fontSize: '14px' }}>
            Welcome, <strong>{username}</strong>
          </span>
        )}
        <button 
          onClick={handleLogout}
          style={{
            padding: '5px 15px',
            backgroundColor: '#eb5b3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#d94d2e'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#eb5b3c'}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
