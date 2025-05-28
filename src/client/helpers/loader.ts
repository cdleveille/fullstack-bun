export const mainLoader = async () => {
	// This is a placeholder for any data fetching logic you might want to implement
	const res = await fetch("https://jsonplaceholder.typicode.com/todos");
	if (!res?.ok) throw new Error("Failed to fetch todos");
	const todos: { userId: number; id: number; title: string; completed: boolean }[] =
		await res.json();
	return todos;
};
