import { Dispatch, ReactNode, useReducer } from "react";
import React from "react";

export interface Task {
	id: number;
	title: string;
}

interface AddTask {
	type: "ADD";
	task: Task;
}

interface DeleteTask {
	type: "DELETE";
	taskId: number;
}

type TaskAction = AddTask | DeleteTask;

interface TaskContextType {
	tasks: Task[];
	dispatch: Dispatch<TaskAction>;
}

const TaskContext = React.createContext<TaskContextType>({} as TaskContextType);

const tasksReducer = (tasks: Task[], action: TaskAction): Task[] => {
	switch (action.type) {
		case "ADD":
			return [action.task, ...tasks];

		case "DELETE":
			return tasks.filter((task) => task.id !== action.taskId);
	}
};

interface Props {
	children: ReactNode;
}

const TasksProvider = ({ children }: Props) => {
	const [tasks, dispatch] = useReducer(tasksReducer, []);

	return (
		<TaskContext.Provider value={{ tasks, dispatch }}>
			{children}
		</TaskContext.Provider>
	);
};

export { TaskContext };
export default TasksProvider;
