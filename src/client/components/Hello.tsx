type THelloProps = {
	width: number;
	height: number;
};

export const Hello = ({ width, height }: THelloProps) => {
	return (
		<div className="hello">
			<h1>hello from bun!</h1>
			<img src="./assets/hello.svg" width={width} height={height} alt="hello"></img>
		</div>
	);
};
