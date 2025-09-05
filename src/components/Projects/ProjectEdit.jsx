import {useContext, useEffect} from "react";
import ProjectContext from "../../Context/ProjectContext";
import {useParams} from "react-router-dom";

export const ProjectEdit = () => {
    const {
        formValues,
        onChange,
        errors,
        setErrors,
        getSingleProject,
        updateProject,
        statusMap,
        priorityMap
    } = useContext(ProjectContext);
    let {id} = useParams();
    useEffect(() => {
        getSingleProject(id);
        setErrors({});
    }, [])
    return (
        <div className="mt-12">
            <form onSubmit={updateProject} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
                <div className="space-y-6">
                    <div className="mb-4">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium">Name</label>
                        <input type="text" name="title" value={formValues["title"]} onChange={onChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"/>
                        {errors.title && <span className="text-sm text-red-400">{errors.title[0]}</span>}
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="mb-4">
                        <label htmlFor="slug" className="block mb-2 text-sm font-medium">Slug</label>
                        <input type="text" name="slug" value={formValues["slug"]} onChange={onChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"/>
                        {errors.slug && (
                            <span className="text-sm text-red-400">{errors.slug[0]}</span>
                        )}
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium">Description</label>
                        <textarea type="text" name="description" value={formValues["description"]} onChange={onChange}
                                  className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"/>
                        {errors.description && (
                            <span className="text-sm text-red-400">{errors.description[0]}</span>
                        )}
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="mb-4">
                        <label htmlFor="deadline" className="block mb-2 text-sm font-medium">Deadline</label>
                        <input type="date" name="deadline" value={formValues["deadline"]} onChange={onChange}
                               className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"/>
                        {errors.deadline && (
                            <span className="text-sm text-red-400">{errors.deadline[0]}</span>
                        )}
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="mb-4">
                        <label htmlFor="status" className="block mb-2 text-sm font-medium">Status</label>
                        {/*<select name="status" value={formValues["status"]}  onChange={onChange}*/}
                        <select name="status" value={formValues["status"]} onChange={onChange}
                                className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2">
                            <option>Please select one</option>
                            {Object.entries(statusMap).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value.text}
                                </option>
                            ))}
                        </select>
                        {errors.status && (
                            <span className="text-sm text-red-400">{errors.status[0]}</span>
                        )}
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="mb-4">
                        <label htmlFor="priority" className="block mb-2 text-sm font-medium">Priority</label>
                        <select type="number" name="priority" value={formValues["priority"]} onChange={onChange}
                                className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2">
                            <option>Please select one</option>
                            {Object.entries(priorityMap).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value.text}
                                </option>
                            ))}
                        </select>
                        {errors.priority && (
                            <span className="text-sm text-red-400">{errors.priority[0]}</span>
                        )}
                    </div>
                </div>
                <div className="my-4">
                    <button className="px-4 py-2 bg-indigo-400 hover:bg-indigo-700 text-white rounded-md">Edit
                    </button>
                </div>
            </form>
        </div>
    );
}