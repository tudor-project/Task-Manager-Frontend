import TaskContext from "../../Context/TaskContext";
import ProjectContext from "../../Context/ProjectContext";
import {useContext, useEffect} from "react";
import {Link} from "react-router-dom";

export const TasksIndex = () => {
    const {statusMap, getProjects, projects} = useContext(ProjectContext);
    const { tasks, getTasks, priorityMap} = useContext(TaskContext);

    useEffect(() => {
        getTasks();
        getProjects();
    }, []);

    if (!Array.isArray(tasks)) {
        return <div className="p-4 text-gray-600">Loading tasks...</div>;
    }

    const projectMap = Object.fromEntries(projects.map((project) => [project.id, project.title]));

    return (
        <div className="w-full flex items-start gap-4">
            {Object.entries(statusMap).map(([statusKey, status]) => {
                const tasksForStatus = tasks.filter((task) => task.status === parseInt(statusKey));

                return (
                    <div className="bg-gray-300 w-1/4 mt-2 pb-6 rounded-b-xl" key={statusKey}>
                        <h1 className={`p-1 ${status.color}`}>{status.text}</h1>

                        {tasksForStatus.map((task) => (
                            <div className="m-2 bg-white p-4 rounded shadow border space-y-3" key={task.id}>
                                <div className="flex space-x-1">
                                    <div className={`h-2 w-1/4 rounded-full ${priorityMap[task.priority].color}`}></div>
                                </div>

                                <div className="flex justify-between">
                                    <h2 className="font-medium max-w-44">{task.title}</h2>
                                    <span>{projectMap[task.project_id]}</span>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <div className="flex items-center space-x-3 text-gray-500 text-sm">
                                        <div className="flex items-center space-x-1">
                                            <span className="material-icons text-base">&#x2705;</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <span className="material-icons text-base">&#128488;</span>
                                            <span>3</span>
                                        </div>
                                    </div>

                                    <div className="flex -space-x-2">
                                        <img
                                            className="w-8 h-8 rounded-full border-2 border-white"
                                            src="https://randomuser.me/api/portraits/women/44.jpg"
                                            alt="Avatar 1"
                                        />
                                        <img
                                            className="w-8 h-8 rounded-full border-2 border-white"
                                            src="https://randomuser.me/api/portraits/men/32.jpg"
                                            alt="Avatar 2"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Link className="text-blue-600 hover:underline ml-2 mt-2 inline-block">+ add new card</Link>
                    </div>
                );
            })}
        </div>
    );
}
