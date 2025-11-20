import {createContext, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const ProjectContext = createContext();

const  initialData = {
    title:"",
    slug:"",
    deadline:"",
    status:"",
    priority:"",
    description:""
};

const statusMap = {
    0: {text:"Not Started.", color:"bg-orange-200 text-orange-800"},
    1: {text:"In Progress.", color:"bg-blue-100 text-blue-800"},
    2: {text:"Completed.", color:"bg-green-100 text-green-800"},
    3: {text:"Canceled.", color:"bg-red-100 text-red-800"},
}
const priorityMap = {
    0: {text:"⌃", color:"text-green-500"},
    1: {text:"⌅", color:"text-yellow-500"},
    2: {text:"⌆", color:"text-red-500"}
}

export const ProjectProvider = ({children}) => {
    const [formValues, setFormValues] = useState(initialData);
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [openMenuId, setMenuId] = useState(null);
    // const [token, setToken] = useState(null);
    const token = localStorage.getItem("token");

    const onChange = (e) => {
        const {name, value} = e.target;
        setFormValues(prev=>({...prev, [name]: value}))
    };

    const getProjects = async () => {

        if (token) {
            const apiProjects = await axios.get("projects", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProjects(apiProjects.data.data);
        } else {
            navigate("/login");
        }

    };

    const getSingleProject = async (id) => {
        const response = await axios.get("projects/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const apiProject =  response.data.data;
        setProject(apiProject);
        setFormValues({
            title:apiProject.title,
            slug:apiProject.slug,
            deadline:apiProject.deadline,
            status:apiProject.status,
            priority:apiProject.priority,
            description:apiProject.description
        })
    };

    const storeProject = async (e) =>{
        e.preventDefault();
        try {
            await axios.post("projects", formValues, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFormValues(initialData);
            navigate("/projects");
        }catch (e){
            if (e.response.status === 422){
                setErrors(e.response.data.errors);
            }
        }
    };

    const updateProject = async (e) => {
        e.preventDefault();
        try{
            await axios.put("projects/" + project.id, formValues, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate("/projects");
        } catch(e){
            if (e.response.status === 422){
                setErrors(e.response.data.errors);
            }
        }
    }

    const deleteProject = async (id) => {
        if(!window.confirm("Are yoou sure?")){
            return;
        }
        await axios.delete("projects/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        getProjects();
    }


    return <ProjectContext.Provider
        value={{
            project,
            projects,
            getSingleProject,
            getProjects,
            onChange,
            formValues,
            storeProject,
            setFormValues,
            initialData,
            errors,
            setErrors,
            updateProject,
            deleteProject,
            openMenuId,
            setMenuId,
            statusMap,
            priorityMap
        }}
    >
        {children}
    </ProjectContext.Provider>
}

export default ProjectContext;