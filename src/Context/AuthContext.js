import axios from "axios";
import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const AuthContext = createContext();


const defaultCredentials = {
    name: "",
    email: "",
    password: ""
}

export const AuthProvider = ({ children }) => {
    const [credentials, setCredentials] = useState(defaultCredentials);
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState( () => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState(localStorage.getItem("token"));

    const navigate = useNavigate();

    const onChange =  (e) => {
        const {name, value} = e.target;
        setCredentials(prev => ({...prev,[name]: value}));
    };

    function storeData(r) {
        localStorage.setItem("token", r.data.token);
        localStorage.setItem("user", JSON.stringify(r.data.user));
        setToken(r.data.token);
        setUser(r.data.user);
    }

    const storeUser = async (e) => {
        e.preventDefault();
        try{
            const response =  await axios.post("register",
                {
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password
                });
            storeData(response);
            setCredentials(defaultCredentials);
            navigate("/");
        }catch(e){
            if (e.response){
                setErrors(e.response.data.errors);
            }
        }
    };

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("login",
                {
                    email: credentials.email,
                    password: credentials.password
                });
            storeData(response);
            setCredentials(defaultCredentials);
            navigate("/");
        }catch(e){
            if (e.response){
                setErrors(e.response.data.errors);
            }
        }
    }

    const logout = async () => {
        await axios.post("logout",{}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        navigate("/");
        localStorage.clear();
        setUser(null);
        setToken(null);
    }
    console.log(user);
    return <AuthContext.Provider
    value={{
        defaultCredentials,
        credentials,
        setCredentials,
        storeUser,
        user,
        onChange,
        errors,
        login,
        logout
    }}
    >
        {children}
    </AuthContext.Provider>

}
export default AuthContext;