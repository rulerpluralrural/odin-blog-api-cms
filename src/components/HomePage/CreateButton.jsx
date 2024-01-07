import React from "react";
import { useNavigate } from "react-router-dom";

const CreateButton = () => {
	const navigate = useNavigate()

	const createPost = () => navigate("/create")
	
	return (
		<>
			<button className="bg-[#00E600] text-white px-5 py-3 rounded-sm font-semibold text-lg hover:bg-[#32CD32] focus:bg-[#32CD32] transition-colors w-full" onClick={createPost}>
				CREATE A NEW POST
			</button>
		</>
	);
};

export default CreateButton;
