import { useReducer } from "react";
import userReducer from "./reducers/userReducer";

const LoginStatus = () => {
	const [user, dispatch] = useReducer(userReducer, "");

	if (user)
		return (
			<>
				<div>
					<span className="mx-2">{user}</span>
					<a onClick={() => dispatch({ type: "LOGOUT" })} href="#">
						Logout
					</a>
				</div>
			</>
		);
	return (
		<div>
			<a
				onClick={() => dispatch({ type: "LOGIN", username: "aksdeo5" })}
				href="#"
			>
				Login
			</a>
		</div>
	);
};

export default LoginStatus;
