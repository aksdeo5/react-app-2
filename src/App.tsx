import { useReducer } from "react";
import "./App.css";
import tasksReducer from "./state-management/reducers/tasksReducer";
import TaskContext from "./state-management/contexts/tasksContext";
import NavBar from "./state-management/NavBar";
import HomePage from "./state-management/HomePage";
import authReducer from "./state-management/reducers/authReducer";
import AuthContext from "./state-management/contexts/authContext";

function App() {
	const [tasks, dispatchTasks] = useReducer(tasksReducer, []);
	const [user, dispatchAuth] = useReducer(authReducer, "");

	return (
		<AuthContext.Provider value={{ user, dispatch: dispatchAuth }}>
			<TaskContext.Provider value={{ tasks, dispatch: dispatchTasks }}>
				<NavBar />
				<HomePage />
			</TaskContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
