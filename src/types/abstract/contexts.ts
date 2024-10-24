export type TAppContext = {
	sendHello: () => void;
	message: string;
	count: number;
	setCount: React.Dispatch<React.SetStateAction<number>>;
};
