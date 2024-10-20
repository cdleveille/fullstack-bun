const accessStorage = (storage: Storage) => ({
	setItem: (key: string, data: unknown) => storage.setItem(key, JSON.stringify(data)),
	getItem: <T = unknown>(key: string): T | null => {
		const data = storage.getItem(key);
		if (data !== null) return JSON.parse(data);
		return null;
	},
	removeItem: (key: string) => storage.removeItem(key)
});

export const storage = {
	local: accessStorage(window.localStorage),
	session: accessStorage(window.sessionStorage)
};
