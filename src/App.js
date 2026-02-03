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
            <nav className="bg-gray-500 dark:bg-[#171a34] w-1/12 h-screen sticky top-0 flex flex-col">

                <div className="mx-2 w-full h-12 flex items-center mb-6">
                    <span className="text-blue-500 text-2xl font-bold">M</span>
                    <span className="text-gray-300 font-semibold ml-1">CRM</span>
                </div>

                <ul className="flex flex-col items-start">
                    <li className="w-full">
                        {
                            !user ? (
                                <Link
                                    to="/"
                                    className="px-2 block text-white text-start py-2 hover:bg-gray-600 transition">
                                    Home
                                </Link>
                            ): (
                                <Link
                                    to="/"
                                    className="px-2 block text-white text-start py-2 hover:bg-gray-600 transition">
                                    Dashboard
                                </Link>
                            )
                        }
                    </li>
                </ul>

                <hr className="my-4 mx-2 border-t border-gray-400/20" />

                <ul className="flex flex-col items-start">
                    <li className="w-full">
                        <Link
                            to="/projects"
                            className="px-2 block text-white text-start py-2 hover:bg-gray-600 transition">
                            Task Manager
                        </Link>
                    </li>
                </ul>

                <hr className="my-4 mx-2 border-t border-gray-400/20" />

                <ul className="flex flex-col items-start">
                    <li className="w-full">
                        <Link
                            to="/"
                            className="px-2 block text-white text-start py-2 hover:bg-gray-600 transition">
                            CRM
                        </Link>
                    </li>
                </ul>

                <div className="mt-auto px-2 pb-4">
                    {
                        !user ? (
                            <ul className="flex justify-between text-gray-300">
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </ul>
                        ) : (
                            <ul className="flex flex-col gap-2 text-gray-300">
                                <li>
                                    <span className="font-semibold">{user.name}</span>
                                </li>
                                <li
                                    className="cursor-pointer hover:text-red-400 transition"
                                    onClick={logout}>
                                    Logout
                                </li>
                            </ul>
                        )
                    }
                </div>
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
