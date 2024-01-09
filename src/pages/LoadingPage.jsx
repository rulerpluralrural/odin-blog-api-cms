import React from "react";
import { PuffLoader } from "react-spinners";

const LoadingPage = () => {
	return (
		<div className="flex h-full flex-col justify-center items-center">
			<h1 className="font-bold font-serif text-xl">
				Fetching data please wait...
			</h1>
			<PuffLoader size={150} color="#36d6b0" />
		</div>
	);
};

export default LoadingPage;
