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
		<div role="alert" className="flex-center-col">
			<p>Oops! Something went wrong.</p>
			<div style={{ color: "red", width: "100%" }}>{error?.message}</div>
			<button
				type="button"
				onClick={() => {
					sessionStorage.clear();
					window.open("/", "_self");
				}}
			>
				Home
			</button>
		</div>
	);
};
