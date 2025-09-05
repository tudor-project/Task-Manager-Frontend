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


    const getTasks = async () => {
        const apiTasks = await axios.get("tasks");
        setTasks(apiTasks.data.data);
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