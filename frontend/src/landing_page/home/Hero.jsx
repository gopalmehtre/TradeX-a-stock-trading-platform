import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function Hero() {
    const navigate = useNavigate();
    const { checkAuthStatus } = React.useContext(AuthContext);
    const [checking, setChecking] = React.useState(false);

    const handleDashboardAccess = async () => {
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

    return(
        <>
        <div className='container p-5 mb-5' >
            <div className='row text-center'>

                <h1 className='mt-5' >Learn. Invest. Grow.</h1>

                <p>Online platform to invest in stocks, derivatives, mutual funds, and more.</p>

                <button 
                    className='p-2 btn btn-primary fs-5 mb-5' 
                    style={{width:"20%", margin: "0 auto"}}
                    onClick={handleDashboardAccess}
                    disabled={checking}
                >
                    {checking ? 'Checking...' : 'Go to Dashboard'}
                </button>
            </div>
        </div>
        </>
    )
}

export default Hero;