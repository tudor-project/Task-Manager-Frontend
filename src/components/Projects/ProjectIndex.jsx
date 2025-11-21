import {useContext, useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import ProjectContext from "../../Context/ProjectContext";

export const ProjectIndex = () => {
    const {projects, getProjects, deleteProject, openMenuId, setMenuId, statusMap, priorityMap} = useContext(ProjectContext);
    useEffect(() => {
        setMenuId(null);
        getProjects();
    },[])
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-full h-full">
             {/*Table container takes as much width as possible*/}
            <div className="flex-1 overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <colgroup>
                        <col style={{width: '60%'}}/>
                        <col style={{width: '15%'}}/>
                        <col style={{width: '15%'}}/>
                        <col style={{width: '5%'}}/>
                        <col style={{width: '5%'}}/>
                    </colgroup>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Title</th>
                        <th className="px-6 py-3">Deadline</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">priority</th>
                        <th className="px-6 py-3 text-xl ">&#8230;</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        onClick={() => (navigate("/projects/create"))}
                        className="bg-white dark:bg-gray-800 border border-dashed dark:border-green-600 border-green-600 hover:bg-gray-500 hover:dark:bg-gray-700">
                        <td className="px-6 py-4 cursor-default text-green-600">+ New Project</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    {projects.map((project) => (
                        <tr key={project.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                            <td className="px-6 py-4">{project.title}</td>
                            <td className="px-6 py-4">{project.deadline}</td>
                            <td className="px-6 py-4">
                                <span
                                    className={`px-2 py-0.5 rounded text-sm font-medium ${statusMap[project.status].color}`}>
                                    {statusMap[project.status].text}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className={`h-2 w-full rounded-full ${priorityMap[project.priority].color}`}></div>
                            </td>
                            <td className="px-6 py-4">
                            <button className="text-xl" onClick={() => {
                                    setMenuId(openMenuId === project.id ? null : project.id);
                                }}
                                >
                                    &#8942;
                                </button>
                                {openMenuId === project.id && (
                                    <div
                                        className="absolute right-24 w-40 bg-white border border-gray-500 dark:bg-gray-700 dark:border-gray-400 shadow-md z-10 flex flex-col ">
                                        <Link to={`/projects/${project.id}/edit`}
                                              className="px-4 py-1 text-indigo-400 hover:text-indigo-700  text-center">
                                            Edit
                                        </Link>
                                        <button onClick={() => deleteProject(project.id)}
                                                className="px-4 py-1 text-red-400 hover:text-red-700 text-center">
                                            Delete
                                        </button>
                                        <Link className="px-4 py-1 text-green-400 hover:text-green-700  text-center">
                                            Add Task
                                        </Link>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}