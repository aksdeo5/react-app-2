import React from "react";
import { Dispatch, ReactNode, useReducer } from "react";

interface LoginAction {
	type: "LOGIN";
	username: string;
}

interface LogoutAction {
	type: "LOGOUT";
}

type AuthAction = LoginAction | LogoutAction;

interface AuthContextType {
	user: string;
	dispatch: Dispatch<AuthAction>;
}

export const AuthContext = React.createContext<AuthContextType>(
	{} as AuthContextType
);

const authReducer = (user: string, action: AuthAction): string => {
	switch (action.type) {
		case "LOGIN":
			return action.username;

		case "LOGOUT":
			return "";
	}
};

interface Props {
	children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
	const [user, dispatch] = useReducer(authReducer, "");

	return (
		<AuthContext.Provider value={{ user, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
