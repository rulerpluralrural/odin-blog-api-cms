import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="flex flex-col gap-5 items-center justify-center text-center py-10">
			<h1 className="font-bold font-serif text-2xl">PAGE NOT FOUND</h1>
			<Link
				to="/"
				className="text-blue-600 hover:underline focus:underline hover:text-blue-700 focus:text-blue-700"
			>
				Go back to home page...
			</Link>
		</div>
	);
};

export default NotFound;
