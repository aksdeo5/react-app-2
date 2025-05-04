import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./useTodos";
import axios from "axios";

interface AddTodoContext {
	previousTodos: Todo[];
}

const addTodo = (onAdd: () => void) => {
	const queryClient = useQueryClient();

	return useMutation<Todo, Error, Todo, AddTodoContext>({
		mutationFn: (todo: Todo) =>
			axios
				.post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
				.then((res) => res.data),
		onMutate: (inputTodo: Todo) => {
			const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

			queryClient.setQueryData<Todo[]>(["todos"], (todos = []) => [
				inputTodo,
				...todos,
			]);

			return { previousTodos };
		},
		onSuccess: (savedTodo, inputTodo) => {
			// Apporach 1
			// queryClient.invalidateQueries({
			// 	queryKey: ["todos"],
			// });

			// Approach 2
			queryClient.setQueryData<Todo[]>(["todos"], (todos = []) =>
				todos.map((todo) => (todo === inputTodo ? savedTodo : todo))
			);

			onAdd();
		},
		onError: (error, inputTodo, context) => {
			if (!context) return;

			queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
		},
	});
};

export default addTodo;
