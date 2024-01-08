import React from "react";

const inputControl = "p-3 border-[1px] border-slate-400 rounded-sm";
const formControl = "w-full flex flex-col";

const PublishedOptions = ({ handlePublish }) => {
	return (
		<div className={formControl}>
			<select
				name="published"
				id="published"
				defaultValue={"unpublished"}
				className={`${inputControl} mt-4 bg-slate-200`}
				onChange={handlePublish}
			>
				<option value="published">Published</option>
				<option value="unpublished">Unpublished</option>
			</select>
		</div>
	);
};

export default PublishedOptions;
