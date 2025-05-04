import React from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
	const pageSize = 10;

	const {
		data,
		error,
		isLoading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = usePosts({ pageSize });

	if (isLoading)
		return (
			<div className="spinner-border" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		);

	if (error) return <p>{error.message}</p>;

	return (
		<>
			<ul className="list-group">
				{data?.pages.map((page, index) => (
					<React.Fragment key={index}>
						{page.map((post) => (
							<li key={post.id} className="list-group-item">
								{post.title}
							</li>
						))}
					</React.Fragment>
				))}
			</ul>
			<button
				className={`btn btn-primary my-3 ${!hasNextPage ? "d-none" : ""}`}
				disabled={isFetchingNextPage}
				onClick={() => fetchNextPage()}
			>
				{isFetchingNextPage ? "Loading..." : "Load More"}
			</button>
		</>
	);
};

export default PostList;
