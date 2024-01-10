import { React, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import DeletePost from "./pages/DeletePost";
import { PuffLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	const [user, setUser] = useState(null);
	const [loadingSession, setLoadingSession] = useState(false);
	const [loadingData, setLoadingData] = useState(false);
	const [posts, setPosts] = useState(null);
	const [refreshKey, setRefreshKey] = useState(0)

	useEffect(() => {
		const getSession = async () => {
			setLoadingSession(true);
			try {
				const response = await fetch(
					"http://localhost:8000/api/blog/auth/session",
					{
						credentials: "include",
					}
				).then((res) => res.json());
				setUser(response.user);
				setLoadingSession(false);
			} catch (error) {
				console.log(error);
				setLoadingSession(false);
			}
		};
		getSession();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			setLoadingData(true);
			try {
				const data = await fetch("http://localhost:8000/api/blog/posts").then(
					(res) => res.json()
				);
				setPosts(data.posts);
				setLoadingData(false);
			} catch (error) {
				console.log(error);
				setLoadingData(false);
			}
		};
		fetchData();
	}, [refreshKey]);

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
					<Route
						path="/"
						element={<Navigate to="/posts" replace={true} />}
					></Route>
					<Route
						path="/posts"
						element={
							<Home user={user} loadingData={loadingData} posts={posts} />
						}
					></Route>
					<Route path="/login" element={<Login setUser={setUser} />}></Route>
					<Route path="/create" element={<CreatePost user={user} setRefreshKey={setRefreshKey}/>}></Route>
					<Route path="/edit/:id" element={<EditPost user={user} setRefreshKey={setRefreshKey}/>}></Route>
					<Route path="/delete/:id" element={<DeletePost />}></Route>
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
