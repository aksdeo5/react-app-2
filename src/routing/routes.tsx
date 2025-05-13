import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import UserPage from "./UserPage";
import ContactPage from "./ContactPage";
import UserDetail from "./UserDetail";
import Layout from "./Layout";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{ path: "", element: <HomePage /> },
			{
				path: "users",
				element: <UserPage />,
				children: [{ path: ":id", element: <UserDetail /> }],
			},
			{ path: "contact", element: <ContactPage /> },
		],
	},
]);

export default router;
