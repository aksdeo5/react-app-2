import { Dispatch } from "react";
import { TaskAction } from "../reducers/tasksReducer";
import React from "react";

export interface Task {
	id: number;
	title: string;
}

interface TaskContextType {
	tasks: Task[];
	dispatch: Dispatch<TaskAction>;
}

const TaskContext = React.createContext<TaskContextType>({} as TaskContextType);

export default TaskContext;
