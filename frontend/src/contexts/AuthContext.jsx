import axios from 'axios';
import { createContext, useState, useContext, Children } from 'react';
import server from "../environment.js";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: `${server}`,
    withCredentials: true
});

export const AuthProvider = ({children}) => {
    const authContext = useContext(AuthContext);
    const [userData, setUserData] = useState(authContext);

    const handleRegister = async (username, email, password) => {
        try {
            let request = await client.post('/signup', {
                username : username,
                email: email,
                password: password,
                createdAt: new Date()
            });

            if(request.data.success) {
                window.location.href = 'http://localhost:5173/';
                return request.data.message;
            }

        } catch(err) {

            throw err;
        }
    }

    const handleLogin = async (email, password) => {
        try {
            let request = await client.post('/login', {
                email: email,
                password: password
            });

            if(request.data.success) {
                window.location.href = 'http://localhost:5173/';
            }

        } catch(err) {
            throw err;
        }
    }

    const checkAuthStatus = async () => {
        try {
            let request = await client.post('/');
            return request.data;
        } catch(err) {
            throw err;
        }
    }

    const data = {
        userData,
        setUserData,
        handleRegister,
        handleLogin,
        checkAuthStatus
    }

    return (
        <AuthContext.Provider value = {data}>
            {children}
        </AuthContext.Provider>
    )

}