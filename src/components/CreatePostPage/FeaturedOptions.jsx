import React from "react";

const inputControl = "p-3 border-[1px] border-slate-400 rounded-sm";
const formControl = "w-full flex flex-col";

const FeaturedOptions = () => {
	return (
		<div className={formControl}>
			<select
				name="featured"
				id="featured"
				defaultValue={"not featured"}
				className={`${inputControl} mt-4 bg-slate-200`}
			>
				<option value="featured">Featured</option>
				<option value="not featured">Not Featured</option>
			</select>
		</div>
	);
};

export default FeaturedOptions;
