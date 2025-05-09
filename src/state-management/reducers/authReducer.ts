interface LoginAction {
	type: "LOGIN";
	username: string;
}

interface LogoutAction {
	type: "LOGOUT";
}

type Action = LoginAction | LogoutAction;

const authReducer = (user: string, action: Action): string => {
	switch (action.type) {
		case "LOGIN":
			return action.username;

		case "LOGOUT":
			return "";
	}
};

export default authReducer;
