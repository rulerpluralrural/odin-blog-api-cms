import React from "react";

const inputControl = "p-3 border-[1px] border-slate-400 rounded-sm";
const labelControl = "py-2 font-serif font-bold text-xl";
const formControl = "w-full flex flex-col";

const ImageInput = ({ handleChange }) => {
	return (
		<div className={formControl}>
			<label htmlFor="imageURL" className={labelControl}>
				Image URL:
			</label>
			<input
				type="text"
				name="imageURL"
				className={inputControl}
				placeholder="Enter an image URL for your post..."
				onChange={handleChange}
			/>
		</div>
	);
};

export default ImageInput;
