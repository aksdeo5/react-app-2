import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

interface PostQuery {
	page: number;
	pageSize: number;
}

const usePosts = (query: PostQuery) => {
	const { page, pageSize } = query;

	const fetchPosts = () =>
		axios
			.get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
				params: { _start: (page - 1) * pageSize, _limit: pageSize },
			})
			.then((res) => res.data);

	return useQuery<Post[], Error>({
		queryKey: ["posts", query],
		queryFn: fetchPosts,
		staleTime: 1 * 60 * 1000, //1m
		placeholderData: keepPreviousData,
	});
};

export default usePosts;
