import { useNavigate } from "react-router-dom";

export const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="flex-center-col">
			<h1>Not Found</h1>
			<button type="button" className="link-btn" onClick={() => navigate("/")}>
				Home
			</button>
		</div>
	);
};
