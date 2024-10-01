import { Header } from "@components";

interface IHelloProps {
	width?: number;
	height?: number;
}

export const Hello = ({ width, height }: IHelloProps) => {
	return (
		<div className="hello centered">
			<Header text="hello&nbsp;from&nbsp;bun!" />
			<img src="./assets/hello.svg" width={width} height={height} alt="hello"></img>
		</div>
	);
};
