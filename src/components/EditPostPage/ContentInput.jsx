import React from "react";

const labelControl = "py-2 font-serif font-bold text-xl";
const formControl = "w-full flex flex-col";

const ContentInput = ({ post }) => {
	return (
		<div className={formControl}>
			<label htmlFor="content" className={labelControl}>
				Content:
			</label>
			<textarea
				name="content"
				id="content"
				className="h-32 p-3 border-[1px] border-slate-400 rounded-sm"
				defaultValue={post.content}
				required
			></textarea>
		</div>
	);
};

export default ContentInput;
