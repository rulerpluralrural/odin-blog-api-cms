import React from "react";

const inputControl = "p-3 border-[1px] border-slate-400 rounded-sm";
const formControl = "w-full flex flex-col";
const labelControl = "py-2 font-serif font-bold text-xl";

const ImageInput = ({ post }) => {
	return (
		<div className={formControl}>
			<label htmlFor="imgURL" className={labelControl}>
				Image URL:
			</label>
			<input
				type="text"
				name="imgURL"
				id="imgURL"
				defaultValue={post.imgURL}
				className={inputControl}
			/>
		</div>
	);
};

export default ImageInput;
