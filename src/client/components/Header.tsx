interface IHeaderProps {
	text: string;
}

export const Header = ({ text }: IHeaderProps) => {
	return <h1>{text}</h1>;
};
