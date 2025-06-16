export type TConfig = {
	PORT: number;
	HOST: string;
	SERVE_STATIC: boolean;
};

export type TAppContext = {
	count: number;
	setCount: TReactStateSetter<number>;
};

export type TReactStateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
