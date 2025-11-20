import {useState, createContext} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const TaskContext = createContext();


const priorityMap = {
    0: {color:"bg-green-400"},
    1: {color:"bg-yellow-400"},
    2: {color:"bg-red-400"}
}


export const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");


    const getTasks = async () => {
        if (token) {
            const apiTasks = await axios.get("tasks", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setTasks(apiTasks.data.data);
        } else {
            navigate("/login");
        }
    }


    return <TaskContext.Provider value={{
        tasks,
        getTasks,
        priorityMap
    }}
        >
            {children}
        </TaskContext.Provider>
}

export default TaskContext;