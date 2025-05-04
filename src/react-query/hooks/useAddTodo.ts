import { useMutation, useQueryClient } from "@tanstack/react-query";
import todoService, { Todo } from "../services/todoService";

interface AddTodoContext {
	previousTodos: Todo[];
}

const addTodo = (onAdd: () => void) => {
	const queryClient = useQueryClient();

	return useMutation<Todo, Error, Todo, AddTodoContext>({
		mutationFn: (todo: Todo) => todoService.post(todo),
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
