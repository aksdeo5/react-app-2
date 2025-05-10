import { useReducer } from "react";
import "./App.css";
import AuthContext from "./state-management/contexts/authContext";
import HomePage from "./state-management/HomePage";
import NavBar from "./state-management/NavBar";
import authReducer from "./state-management/reducers/authReducer";
import TasksProvider from "./state-management/TasksProvider";

function App() {
	const [user, dispatchAuth] = useReducer(authReducer, "");

	return (
		<AuthContext.Provider value={{ user, dispatch: dispatchAuth }}>
			<TasksProvider>
				<NavBar />
				<HomePage />
			</TasksProvider>
		</AuthContext.Provider>
	);
}

export default App;
