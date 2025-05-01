import useTodos from "./hooks/useTodos";

const TodoList = () => {
	const { data: todos, isLoading, error } = useTodos();

	if (isLoading)
		return (
			<div className="spinner-border" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		);

	if (error) return <p>{error.message}</p>;

	return (
		<ul className="list-group">
			{todos?.map((todo) => (
				<li key={todo.id} className="list-group-item">
					{todo.title}
				</li>
			))}
		</ul>
	);
};

export default TodoList;
