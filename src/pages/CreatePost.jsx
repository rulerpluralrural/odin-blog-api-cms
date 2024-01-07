import React, { useState } from "react";
import { FaBlog } from "react-icons/fa";

const inputControl = "p-3 border-[1px] border-slate-400 rounded-sm";
const labelControl = "py-2 font-serif font-bold text-xl";
const formControl = "w-full flex flex-col";

const CreatePost = () => {
	const [formData, setFormData] = useState({
		title: "",
		content: "",
		published: "",
		imageURL: "",
	});

    const handleSubmitPost = (e) => {
        e.preventDefault()
    }

	return (
		<div className="py-10 flex flex-col items-center justify-center">
			<FormHeader />
			<form className="flex flex-col gap-2 items-center justify-center w-[30%]" onSubmit={handleSubmitPost}>
				<div className={formControl}>
					<label htmlFor="title" className={labelControl}>
						Title:
					</label>
					<input
						type="text"
						id="title"
						name="title"
						className={inputControl}
						placeholder="Enter the title of your post..."
						required
					/>
				</div>
				<div className={formControl}>
					<label htmlFor="content" className={labelControl}>
						Content:
					</label>
					<input
						type="text"
						name="content"
						id="content"
						className={inputControl}
						placeholder="Enter the content of your post..."
						required
					/>
				</div>
				<div className={formControl}>
					<select
						name="publishPost"
						id="publishPost"
						defaultValue={"published"}
						className={`${inputControl} mt-4 bg-slate-200`}
					>
						<option value="published">Published</option>
						<option value="unpublished">Unpublished</option>
					</select>
				</div>
				<div className={formControl}>
					<label htmlFor="imageURL" className={labelControl}>
						Image URL:
					</label>
					<input
						type="text"
						name="imageURL"
						className={inputControl}
						placeholder="Enter an image URL for your post..."
					/>
				</div>
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

const FormHeader = () => {
	return (
		<div className="flex items-center gap-2 font-serif text-5xl font-semibold mb-10">
			<FaBlog className="mb-2" />
			<h1>BLOG API</h1>
		</div>
	);
};

export default CreatePost;
