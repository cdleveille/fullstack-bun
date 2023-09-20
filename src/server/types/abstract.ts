export interface IConfig {
	IS_PROD: boolean;
	PORT: number;
	WS_PORT: number;
	MONGO_URI: string;
}

export interface IBase {
	created_at: Date;
	updated_at: Date;
}

export interface IUser {
	username: string;
	password: string;
}

export interface IError {
	code: number;
	data: any;
}
