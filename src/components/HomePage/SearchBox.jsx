import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBox = ({ searchItems }) => {
	return (
		<div className="relative flex-1">
			<FaSearch className="absolute right-3 top-3 text-2xl text-slate-400" />
			<input
				type="search"
				name="post"
				id="post"
				placeholder="Search a post..."
				className="pl-5 pr-10 py-3 border-[1px] border-slate-300 rounded-sm w-full"
				onChange={(e) => searchItems(e.target.value)}
			/>
		</div>
	);
};

export default SearchBox;
