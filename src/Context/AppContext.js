import {ProjectProvider} from "./ProjectContext";
import {TaskProvider} from "./TaskContext";

export const AppProvider = ({children}) => {
    return (
      <ProjectProvider>
          <TaskProvider>
              {children}
          </TaskProvider>
      </ProjectProvider>
    );
}