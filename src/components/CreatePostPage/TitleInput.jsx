import React from 'react'

const inputControl = "p-3 border-[1px] border-slate-400 rounded-sm";
const labelControl = "py-2 font-serif font-bold text-xl";
const formControl = "w-full flex flex-col";

const TitleInput = ({ handleChange }) => {
	return (
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
				onChange={handleChange}
			/>
		</div>
	);
};

export default TitleInput