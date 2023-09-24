import { Header } from "@components";

import hello from "../assets/hello.svg";

interface IHelloProps {
	width?: number;
	height?: number;
}

export const Hello = ({ width, height }: IHelloProps) => {
	return (
		<div className="hello centered">
			<Header text="hello from bun!!!" />
			<img src={hello} width={width} height={height}></img>
		</div>
	);
};
