import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import UserPage from "./UserPage";
import ContactPage from "./ContactPage";
import UserDetail from "./UserDetail";
import Layout from "./Layout";
import ErrorPage from "./ErrorPage";
import LoginPage from "./LoginPage";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{ path: "", element: <HomePage /> },
			{ path: "login", element: <LoginPage /> },
			{ path: "contact", element: <ContactPage /> },
		],
	},
	{
		element: <PrivateRoutes />,
		children: [
			{
				path: "users",
				element: <UserPage />,
				children: [{ path: ":id", element: <UserDetail /> }],
			},
		],
	},
]);

export default router;
