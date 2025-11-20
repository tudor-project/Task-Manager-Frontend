import {Routes, Route, Link, NavLink} from 'react-router-dom';
import React, {useContext} from 'react';
import {Home} from "./components/Home";
import {ProjectIndex} from "./components/Projects/ProjectIndex";
import {ProjectEdit} from "./components/Projects/ProjectEdit";
import {ProjectCreate} from "./components/Projects/ProjectCreate";
import {Login} from "./components/Authentication/Login";
import {Register} from "./components/Authentication/Register";

import {TasksIndex} from "./components/Tasks/TasksIndex";

import AuthContext from "./Context/AuthContext";


function App() {
    const {user, logout} = useContext(AuthContext);
    return (
        <div className="bg-slate-200 flex min-h-screen">
            <nav className="bg-gray-500 dark:bg-gray-800 w-1/12 h-screen sticky top-0">
                <ul className="flex flex-col">
                    <li className="ml-8 m-2 p-2 text-left text-white">
                        <Link to="/">Home</Link>
                    </li>
                </ul>
                <hr className="my-5 mx-5"/>
            </nav>

            <div className="flex-1 flex flex-col">
                <header className="bg-gray-50 mx-6 my-1 top-0 flex justify-between">
                    <ul className="flex text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 font-bold">
                        <li className={`ml-8 m-2 p-2 text-left`}>
                            <NavLink
                                to="/projects"
                                className={({ isActive }) =>
                                    isActive
                                        ? "border-b-2 border-blue-500"
                                        : "hover:border-b hover:border-gray-400"
                                }
                            >
                                Projects
                            </NavLink>
                        </li>
                        <li className="ml-8 m-2 p-2 text-left">
                            <NavLink
                                to="/tasks"
                                className={({ isActive }) =>
                                    isActive
                                        ? "border-b-2 border-blue-500"
                                        : "hover:border-b hover:border-gray-400"
                                }
                            >
                                Tasks
                            </NavLink>
                        </li>
                    </ul>
                    {
                        !user ? (
                            <ul className="flex ">
                                <li className="m-2 p-2 text-left text-gray-500">
                                    <Link to="/login">Login</Link>
                                </li>
                                <li className="m-2 p-2 text-left text-gray-500">
                                    <Link to="/register">Register</Link>
                                </li>
                            </ul>
                        ) : (
                            <ul className="flex">
                                <li className="m-2 p-2 text-left text-gray-500">
                                    Salut, <span className="font-semibold">{user.name}</span>
                                </li>
                                <li className="m-2 p-2 text-left text-gray-500 cursor-pointer" onClick={logout}>
                                    Logout
                                </li>
                            </ul>
                        )
                    }

                </header>

                <main className="px-6 flex-1">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/projects" element={<ProjectIndex/>}/>
                        <Route path="/projects/create" element={<ProjectCreate/>}/>
                        <Route path="/projects/:id/edit" element={<ProjectEdit/>}/>
                        <Route path="/tasks" element={<TasksIndex/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Routes>
                </main>
            </div>
        </div>
    );
}


export default App;
