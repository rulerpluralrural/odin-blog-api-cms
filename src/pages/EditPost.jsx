import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import Unauthorized from "./Unauthorized";
import FormHeader from "../components/EditPostPage/FormHeader";
import TitleInput from "../components/EditPostPage/TitleInput";
import ContentInput from "../components/EditPostPage/ContentInput";
import ImageInput from "../components/EditPostPage/ImageInput";
import PublishedOptions from "../components/CreatePostPage/PublishedOptions";
import FeaturedOptions from "../components/CreatePostPage/FeaturedOptions";

const EditPost = ({ user, posts }) => {
	const [loading, setLoading] = useState(false);
	const [post, setPost] = useState(null);
	const { id } = useParams();

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

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		await fetch(`http://localhost:8000/api/blog/posts/${postID}`, {
	// 			method: "PUT",
	// 			credentials: "include",
	// 			headers: {
	// 				["Content-Type"]: "application/json; charset=utf-8",
	// 			},
	// 		}).then((res) => res.json());
	// 		setPost();
	// 	};
	// 	fetchData();
	// });

	if ((user && user.isAdmin === false) || !user) {
		return <Unauthorized />;
	}

	if (loading || post === null) {
		return <LoadingPage />;
	}

	return (
		<div className="py-10 flex flex-col items-center justify-center">
			<FormHeader />
			<form className="flex flex-col gap-2 items-center justify-center w-[30%]">
				<TitleInput post={post}/>
				<ContentInput post={post}/>
				<PublishedOptions />
				<FeaturedOptions />
				<ImageInput post={post}/>
				<button
					type="submit"
					className="p-3 rounded-sm bg-[#21c221] hover:bg-[#33a133] focus:bg-[#33a133] transition-colors text-white w-full mt-2 font-semibold text-xl tracking-wider"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default EditPost;
