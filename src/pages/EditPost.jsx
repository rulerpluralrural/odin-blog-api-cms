import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import Unauthorized from "./Unauthorized";
import FormHeader from "../components/EditPostPage/FormHeader";
import TitleInput from "../components/EditPostPage/TitleInput";
import ContentInput from "../components/EditPostPage/ContentInput";
import ImageInput from "../components/EditPostPage/ImageInput";
import PublishedOptions from "../components/EditPostPage/PublishedOptions";
import FeaturedOptions from "../components/EditPostPage/FeaturedOptions";
import { toast } from "react-toastify";

const EditPost = ({ user, setRefreshKey }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [post, setPost] = useState(null);
	const { id } = useParams();
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		published: false,
		featured: false,
		imgURL: "",
	});

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handlePublish = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value === "published",
		}));
	};

	const handleFeatured = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value === "featured",
		}));
	};

	useEffect(() => {
		const getPost = async () => {
			setLoading(true);
			try {
				const data = await fetch(
					`http://localhost:8000/api/blog/posts/${id}`
				).then((res) => res.json());
				setPost(data.post);
				setFormData({
					title: data.post.title,
					content: data.post.content,
					published: data.post.published,
					featured: data.post.featured,
					imgURL: data.post.imgURL,
				});
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		getPost();
	}, []);
	

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const data = await fetch(`http://localhost:8000/api/blog/posts/${id}`, {
				method: "PUT",
				body: JSON.stringify(formData),
				credentials: "include",
				headers: {
					["Content-Type"]: "application/json; charset=utf-8",
				},
			}).then((res) => res.json());
			setLoading(false);

			let notify;

			if (data.post) {
				setRefreshKey(prevState => prevState + 1)
				navigate("/");
				notify = toast.success("Post edited successfully!");
			} else {
				if (data.messages) {
					data.messages.forEach((message) => {
						notify = toast.error(message.msg);
					});
				} else {
					notify = toast.error(data.message);
				}
			}

			setTimeout(() => {
				toast.dismiss(notify);
			}, 5000);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	if ((user && user.isAdmin === false) || !user) {
		return <Unauthorized />;
	}

	if (loading || post === null) {
		return <LoadingPage />;
	}

	return (
		<div className="py-10 flex flex-col items-center justify-center">
			<FormHeader />
			<form
				className="flex flex-col gap-2 items-center justify-center w-[30%]"
				onSubmit={handleSubmit}
			>
				<TitleInput post={post} handleChange={handleChange} />
				<ContentInput post={post} handleChange={handleChange} />
				<PublishedOptions post={post} handlePublish={handlePublish} />
				<FeaturedOptions post={post} handleFeatured={handleFeatured} />
				<ImageInput post={post} handleChange={handleChange} />
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
