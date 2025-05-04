import {
	InfiniteData,
	keepPreviousData,
	QueryFunctionContext,
	useInfiniteQuery,
} from "@tanstack/react-query";
import axios from "axios";

interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

interface PostQuery {
	pageSize: number;
}

const usePosts = (query: PostQuery) => {
	const { pageSize } = query;

	const fetchPosts = ({ pageParam }: QueryFunctionContext) =>
		axios
			.get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
				params: {
					_start: ((pageParam as number) - 1) * pageSize,
					_limit: pageSize,
				},
			})
			.then((res) => res.data);

	return useInfiniteQuery<Post[], Error, InfiniteData<Post[], number>>({
		queryKey: ["posts", query],
		queryFn: fetchPosts,
		initialPageParam: 1,
		staleTime: 1 * 60 * 1000, //1m
		placeholderData: keepPreviousData,
		getNextPageParam: (lastPage, allPages) =>
			lastPage.length > 0 ? allPages.length + 1 : undefined,
	});
};

export default usePosts;
