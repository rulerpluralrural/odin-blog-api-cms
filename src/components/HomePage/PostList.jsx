import React from "react";
import { FaRegComment, FaRegThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PostList = ({ post }) => {
	return (
		<div className="grid grid-cols-[500px_1fr] gap-3 border-b-2 border-slate-400 w-full">
			<PostLeft post={post} />
			<PostRight post={post} />
		</div>
	);
};

const PostLeft = ({ post }) => {
	return (
		<div className="flex flex-col gap-1">
			<img
				src={post.imgURL}
				alt={`${post.title} image`}
				className=" object-cover rounded-md"
			/>
			<div className="flex justify-between w-full pb-2">
				<div className="flex gap-2">
					<p className="font-semibold">Posted By:</p>
					<p>{post.author.username}</p>
				</div>
				<div className="flex gap-2">
					<p className="font-semibold">Posted on:</p>
					<p>{post.date_formatted}</p>
				</div>
			</div>
		</div>
	);
};

const PostRight = ({ post }) => {
	const navigate = useNavigate()

	return (
		<div>
			<div>
				<h1>
					<strong>Title</strong>: {post.title}
				</h1>
				<p>
					<strong>Content</strong>: {post.content.length <= 500 ? post.content : post.content.substring(0, 500) + "..."}
				</p>
			</div>
			<div className="flex items-center w-[300px] gap-5 my-3">
				<p className="flex items-center gap-2 px-3 py-2 border-[1px] border-slate-300 rounded-sm">
					<strong>Likes: </strong>
					<FaRegThumbsUp /> {post.likes.length}
				</p>
				<p className="flex items-center gap-2 px-3 py-2 border-[1px] border-slate-300 rounded-sm">
					<strong>Comments: </strong>
					<FaRegComment /> {post.comments.length}
				</p>
			</div>
			<div className="flex flex-col gap-2 w-full text-lg">
				<button className=" bg-blue-500 p-3 text-white font-semibold hover:bg-blue-600 focus:bg-blue-600 transition-colors w-full" onClick={() => {
					navigate(`/edit/${post._id}`)
				}}>
					Edit
				</button>
				<button className=" bg-red-600 text-white p-3 font-semibold hover:bg-red-700 focus:bg-red-700 transition-colors w-full" onClick={() => {
					navigate(`/delete/${post._id}`)
				}}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default PostList;
