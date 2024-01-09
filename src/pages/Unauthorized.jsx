import React from "react";

const Unauthorized = () => {
	return (
		<div className="flex flex-col gap-5 items-center justify-center text-center py-10">
			<h1 className="font-bold font-serif text-2xl" >
				Only admin's are authorized to view this page
			</h1>
			<img
				src="/404.jpg"
				alt="Unauthorized Image"
				className="w-[500px] border-[1px] border-slate-300 rounded-md"
			/>
		</div>
	);
};

export default Unauthorized;
