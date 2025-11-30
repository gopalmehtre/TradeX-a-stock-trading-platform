import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function OpenAccount() {
  const navigate = useNavigate();
  const { checkAuthStatus } = React.useContext(AuthContext);
  const [checking, setChecking] = React.useState(false);

  const handleSignup = async () => {
    setChecking(true);
    try {
      const authStatus = await checkAuthStatus();
      
      if (authStatus.status) {
        window.location.href = 'http://localhost:5173';
      } else {
        navigate('/auth');
      }
    } catch (error) {
      navigate('/auth');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-5">Open Your Account.</h1>
        <p>
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>
        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
          onClick={handleSignup}
          disabled={checking}
        >
          {checking ? 'Checking...' : 'Sign up Now'}
        </button>
      </div>
    </div>
  );
}

export default OpenAccount;