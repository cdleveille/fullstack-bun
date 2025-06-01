import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorBoundary = () => {
	const routeError = useRouteError();
	console.error(routeError);
	if (isRouteErrorResponse(routeError) || routeError instanceof Response) {
		return <ErrorDisplay error={new Error(routeError.statusText)} />;
	}
	if (routeError instanceof Error) {
		return <ErrorDisplay error={routeError} />;
	}
	if (typeof routeError === "string") {
		return <ErrorDisplay error={new Error(routeError)} />;
	}
	return <ErrorDisplay error={new Error("Unexpected error occurred")} />;
};

const ErrorDisplay = ({
	error
}: {
	error: Error;
}) => {
	return (
		<div
			role="alert"
			style={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				rowGap: "2rem",
				padding: "1rem"
			}}
		>
			<h1>Error!</h1>
			<pre style={{ color: "red" }}>{error.message}</pre>
			<a href="/">Home</a>
		</div>
	);
};
