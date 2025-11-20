import {ProjectProvider} from "./ProjectContext";
import {TaskProvider} from "./TaskContext";

import {AuthProvider} from "./AuthContext";

export const AppProvider = ({children}) => {
    return (
        <AuthProvider>
                <ProjectProvider>
                    <TaskProvider>
                        {children}
                    </TaskProvider>
                </ProjectProvider>
        </AuthProvider>
    );
}