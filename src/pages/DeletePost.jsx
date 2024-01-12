import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import Unauthorized from "./Unauthorized";
import NotFound from "./NotFound";
import { FaRegComment, FaRegThumbsUp } from "react-icons/fa";
import { toast } from "react-toastify";

const DeletePost = ({ user, setRefreshKey }) => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [post, setPost] = useState(null);
	const navigate = useNavigate();

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

	const deletePost = async () => {
		setLoading(true);
		try {
			const data = await fetch(`http://localhost:8000/api/blog/posts/${id}`, {
				method: "Delete",
				credentials: "include",
				headers: {
					["Content-Type"]: "application/json; charset=utf-8",
				},
			}).then((res) => res.json());
			setLoading(false);

			let notify;

			if (data) {
				setRefreshKey((prevState) => prevState + 1);
				navigate("/");
				notify = toast.success(data.msg);
			}

			setTimeout(() => {
				toast.dismiss(notify);
			}, 5000);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	if (loading || post === null) {
		return <LoadingPage />;
	}

	if ((user && user.isAdmin === false) || !user) {
		return <Unauthorized />;
	}

	if (post === undefined) {
		return <NotFound />;
	}

	return (
		<div className="flex flex-col items-center py-10 gap-2 self-center">
			<h1 className="font-bold text-3xl font-serif underline">{post.title} </h1>
			<div className="text-center">
				<img
					src={post.imgURL}
					alt={`${post.title} image`}
					className="rounded-md"
				/>
			</div>
			<div className="w-full text-lg border-b-[1px] border-slate-400 py-2 px-1">
				<div>
					<strong>By: </strong>
					{post.author.username}
				</div>
				<div>
					<strong>Posted on: </strong>
					{post.date_formatted}
				</div>
				<div className="flex gap-2 items-center">
					<strong>Post Comments: </strong>
					<FaRegComment />
					{post.comments.length}
				</div>
				<div className="flex gap-2 items-center">
					<strong>Post Likes: </strong>
					<FaRegThumbsUp />
					{post.likes.length}
				</div>
			</div>
			<form className="w-full flex flex-col gap-3">
				<h3 className="text-2xl text-center">
					Are you sure you want to delete this post?
				</h3>
				<input type="hidden" id="delete" name="delete" />
				<button
					type="submit"
					className="w-full bg-red-600 text-white px-3 py-2 font-semibold tracking-wide text-lg rounded-sm hover:bg-red-700 focus:bg-red-700 transition-colors"
					onClick={deletePost}
				>
					DELETE
				</button>
			</form>
		</div>
	);
};

export default DeletePost;
