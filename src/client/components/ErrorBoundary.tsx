import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({
	error,
	resetErrorBoundary
}: {
	error: Error;
	resetErrorBoundary: () => void;
}) => {
	return (
		<div role="alert" className="flex-center-col">
			<p>Oops! Something went wrong.</p>
			<div style={{ color: "red", width: "100%" }}>{error.message}</div>
			<button type="button" onClick={resetErrorBoundary}>
				Home
			</button>
		</div>
	);
};

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
	return (
		<ReactErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => {
				sessionStorage.clear();
				window.open("/", "_self");
			}}
			onError={(error, info) => console.error(error, info)}
		>
			{children}
		</ReactErrorBoundary>
	);
};
