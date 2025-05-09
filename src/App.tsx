import { useReducer } from "react";
import "./App.css";
import tasksReducer from "./state-management/reducers/tasksReducer";
import TaskContext from "./state-management/contexts/tasksContext";
import NavBar from "./state-management/NavBar";
import HomePage from "./state-management/HomePage";

function App() {
	const [tasks, dispatch] = useReducer(tasksReducer, []);

	return (
		<TaskContext.Provider value={{ tasks, dispatch }}>
			<NavBar />
			<HomePage />
		</TaskContext.Provider>
	);
}

export default App;
