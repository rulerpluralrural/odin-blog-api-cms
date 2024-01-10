import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import Unauthorized from "./Unauthorized";

const DeletePost = ({ user }) => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [post, setPost] = useState(null);

	useEffect(() => {
		const getPost = async () => {
			setLoading(true);
			try {
				const data = await fetch(
					`http://localhost:8000/api/blog/posts/${id}`
				).then((res) => res.json());
				setPost(data.post);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		getPost();
	}, []);

	if (loading || post === null) {
		return <LoadingPage />;
	}

	if ((user && !user.isAdmin) || !user) {
		return <Unauthorized />;
	}

	return (
		<div className="flex flex-col items-center py-10 gap-2 w-[30%] self-center">
			<h1 className="font-bold text-3xl font-serif">
				Do you want to delete this post?
			</h1>
			<h3 className="text-2xl underline">{post.title}</h3>
			<div>
				<img src={post.imgURL} alt={`${post.title} image`} className="rounded-md" />
			</div>
			<div className="flex items-center justify-between w-full text-lg">
				<p>
					<strong>By: </strong>
					{post.author.username}
				</p>
				<p>
					<strong>Posted on: </strong>
					{post.date_formatted}
				</p>
			</div>
			<form className="w-full">
				<input type="hidden" id="delete" name="delete" />
				<button
					type="submit"
					className="w-full bg-red-600 text-white px-3 py-2 font-semibold tracking-wide text-lg rounded-sm hover:bg-red-700 focus:bg-red-700 transition-colors"
				>
					DELETE
				</button>
			</form>
		</div>
	);
};

export default DeletePost;
