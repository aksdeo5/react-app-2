import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError();
	return (
		<>
			<h1>Oops...</h1>
			<p>
				{isRouteErrorResponse(error)
					? "Invalid page"
					: "Unexpected error occured"}
				...
			</p>
		</>
	);
};

export default ErrorPage;
