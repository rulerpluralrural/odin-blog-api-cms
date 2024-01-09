import React from "react";

const inputControl = "p-3 border-[1px] border-slate-400 rounded-sm";
const formControl = "w-full flex flex-col";
const labelControl = "py-2 font-serif font-bold text-xl";

const TitleInput = ({ post }) => {
	return (
		<div className={formControl}>
			<label htmlFor="title" className={labelControl}>
				Title:{" "}
			</label>
			<input
				type="text"
				name="title"
				id="title"
				defaultValue={post.title}
				required
				className={inputControl}
			/>
		</div>
	);
};

export default TitleInput;
