import React from "react";

const Select = ({ setSortType }) => {
	return (
		<div>
			<select
				defaultValue={"default"}
				onChange={(e) => {
					setSortType(e.target.value);
				}}
				className="bg-slate-50 border border-slate-300 text-slate-900 text-md lg:p-2.5 p-1.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:text-lg text-sm"
			>
				<option value="a-z">A - Z</option>
				<option value="z-a">Z - A</option>
				<option value="rating">Rating</option>
				<option value="popularity">Most Liked</option>
        <option value="comments">Most Commented</option>
			</select>
		</div>
	);
};

export default Select;
