import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "./hooks/useTodos";
import axios from "axios";

interface AddTodoContext {
	previousTodos: Todo[];
}

const TodoForm = () => {
	const queryClient = useQueryClient();
	const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
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

			if (ref.current) ref.current.value = "";
		},
		onError: (error, inputTodo, context) => {
			if (!context) return;

			queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
		},
	});
	const ref = useRef<HTMLInputElement>(null);

	return (
		<>
			{addTodo.error && (
				<div className="alert alert-danger">{addTodo.error.message}</div>
			)}
			<form
				className="row mb-3"
				onSubmit={(event) => {
					event.preventDefault();

					if (ref.current?.value)
						addTodo.mutate({
							id: 0,
							title: ref.current?.value,
							completed: false,
							userId: 1,
						});
				}}
			>
				<div className="col">
					<input ref={ref} type="text" className="form-control" />
				</div>
				<div className="col">
					<button className="btn btn-primary" disabled={addTodo.isPending}>
						Add
					</button>
				</div>
			</form>
		</>
	);
};

export default TodoForm;
