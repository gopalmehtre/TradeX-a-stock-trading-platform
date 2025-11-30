import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

function Navbar() {
  const navigate = useNavigate();
  const { checkAuthStatus } = React.useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const verifyAuth = async () => {
      try {
        const authStatus = await checkAuthStatus();
        setIsAuthenticated(authStatus.status);
        if (authStatus.status) {
          setUsername(authStatus.user);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    verifyAuth();
  }, []);

  const handleDashboardClick = async (e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:5173';
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/auth');
  };

  const handleLogout = () => {
    
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsAuthenticated(false);
    setUsername('');
    navigate('/');
  };

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom"
    >
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          <h2 style={{ color: "#0080ff" }}>
            <i className="fa fa-line-chart" aria-hidden="true"></i> TradeX
          </h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-lg-0">
            
            <li className="nav-item">
              <Link className="nav-link active" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/product">
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/support">
                Support
              </Link>
            </li>
            {!loading && (
              <>
                {isAuthenticated ? (
                  <>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#"
                        onClick={handleDashboardClick}
                        style={{ cursor: "pointer" }}
                      >
                        Dashboard
                      </a>
                    </li>
                    <li className="nav-item d-flex align-items-center ms-2">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      href="#"
                      onClick={handleLoginClick}
                      style={{ cursor: "pointer" }}
                    >
                      Login / Signup
                    </a>
                  </li>
                )}
              </>
            )}
            <li className="nav-item d-flex align-items-center ms-3">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;