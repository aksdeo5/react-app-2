import { ReactNode, useReducer } from "react";
import TaskContext from "./contexts/tasksContext";
import tasksReducer from "./reducers/tasksReducer";

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

export default TasksProvider;
