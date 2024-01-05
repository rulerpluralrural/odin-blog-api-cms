import { React, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { PuffLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	const [user, setUser] = useState(null);
	const [loadingSession, setLoadingSession] = useState(false);

	useEffect(() => {
		const getSession = async () => {
			const response = await fetch(
				"http://localhost:8000/api/blog/auth/session",
				{
					credentials: "include",
				}
			).then((res) => res.json());
			setUser(response.user);
			setLoadingSession(false);
		};
		getSession();
	}, []);

	return (
		<div className="flex flex-col h-screen">
			<Navbar
				user={user}
				setLoadingSession={setLoadingSession}
				setUser={setUser}
				loadingSession={loadingSession}
			/>
			{loadingSession ? (
				<div className="flex flex-1 items-center justify-center">
					<PuffLoader size={150} color="#36d6b0" />
				</div>
			) : (
				<Routes>
					<Route path="/" element={<Home user={user} />}></Route>
					<Route path="/login" element={<Login setUser={setUser} />}></Route>
				</Routes>
			)}
			<ToastContainer
				position="bottom-left"
				newestOnTop={true}
				closeOnClick={true}
				pauseOnHover={true}
				draggable={false}
				theme="colored"
			/>
		</div>
	);
};

export default App;
