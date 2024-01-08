import React, { useState } from "react";
import ContentInput from "../components/CreatePostPage/ContentInput";
import FormHeader from "../components/CreatePostPage/FormHeader";
import ImageInput from "../components/CreatePostPage/ImageInput";
import PublishedOptions from "../components/CreatePostPage/PublishedOptions";
import TitleInput from "../components/CreatePostPage/TitleInput";
import Unauthorized from "./Unauthorized";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";

const CreatePost = ({ user }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		published: false,
		imageURL: "",
	});
	const [loading, setLoading] = useState(false);

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

	console.log(formData);

	const handleSubmitPost = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const data = await fetch("http://localhost:8000/api/blog/posts", {
				method: "POST",
				credentials: "include",
				body: JSON.stringify(formData),
				headers: {
					["Content-Type"]: "application/json; charset=utf-8",
				},
			}).then((res) => res.json());
			setLoading(false);
			console.log(data);

			let notify;

			if (data.post) {
				navigate("/");
				notify = toast.success("Post created successfully!");
			} else {
				if (data.messages) {
					data.messages.forEach((message) => {
						notify = toast.error(message.msg);
					});
				} else {
					notify = toast.error(data.message);
				}
			}
			// console.log(data);
			setTimeout(() => {
				toast.dismiss(notify);
			}, 5000);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center">
				<PuffLoader size={125} color="#36d6b0" />
			</div>
		);
	}

	if (user && !user.isAdmin) {
		return <Unauthorized />;
	}

	return (
		<div className="py-10 flex flex-col items-center justify-center">
			<FormHeader />
			<form
				className="flex flex-col gap-2 items-center justify-center w-[30%]"
				onSubmit={handleSubmitPost}
			>
				<TitleInput handleChange={handleChange} />
				<ContentInput handleChange={handleChange} />
				<PublishedOptions handlePublish={handlePublish} />
				<ImageInput handleChange={handleChange} />
				<button
					type="submit"
					className="p-3 rounded-sm bg-[#21c221] hover:bg-[#33a133] focus:bg-[#33a133] transition-colors text-white w-full mt-2 font-semibold text-xl tracking-wider"
				>
					SUBMIT
				</button>
			</form>
		</div>
	);
};

export default CreatePost;
