import { useQuery } from "@tanstack/react-query";
import todoService, { Todo } from "../services/todoService";

const useTodos = () => {
	return useQuery<Todo[], Error>({
		queryKey: ["todos"],
		queryFn: () => todoService.getAll(),
		staleTime: 1 * 60 * 1000, //1m
	});
};

export default useTodos;
