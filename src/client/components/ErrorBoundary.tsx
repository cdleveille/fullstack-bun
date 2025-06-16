export const ErrorBoundary = ({ error }: { error: Error }) => {
	return (
		<div
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)"
			}}
		>
			<div
				role="alert"
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					rowGap: "2rem",
					padding: "1rem",
					fontSize: "1.2rem"
				}}
			>
				<h1>Error!</h1>
				<pre style={{ color: "red" }}>{error.message}</pre>
				<a href="/">Home</a>
			</div>
		</div>
	);
};
