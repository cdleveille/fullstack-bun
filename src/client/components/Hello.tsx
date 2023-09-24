import { helloImg } from "@assets";
import { Header } from "@components";

interface IHelloProps {
	width?: number;
	height?: number;
}

export const Hello = ({ width, height }: IHelloProps) => {
	return (
		<div className="hello centered">
			<Header text="hello&nbsp;from&nbsp;bun!" />
			<img src={helloImg} width={width} height={height} alt="hello"></img>
		</div>
	);
};
