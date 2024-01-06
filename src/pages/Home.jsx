import { React, useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import PostList from "../components/HomePage/PostList";
import CreateButton from "../components/HomePage/CreateButton";
import SearchBox from "../components/HomePage/SearchBox";
import Select from "../components/HomePage/Select";

export default function Home({ user }) {
	const [posts, setPosts] = useState(null);
	const [loading, setLoading] = useState(false);
	const [sortType, setSortType] = useState("default");
	const [searchInput, setSearchInput] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const data = await fetch("http://localhost:8000/api/blog/posts").then(
					(res) => res.json()
				);
				setPosts(data.posts.filter((post) => post.published));
				setFeaturedPost(data.posts.find((post) => post.featured));
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	if (loading || posts === null) {
		return (
			<div className="flex h-full flex-col justify-center items-center">
				<h1 className="font-bold font-serif text-xl">
					Fetching data please wait...
				</h1>
				<PuffLoader size={125} />
			</div>
		);
	}

	return (
		<div className="flex flex-col h-full px-72 gap-3">
			<div className="flex items-center justify-between gap-2 pt-10">
				<SearchBox />
				<Select setSortType={setSortType} />
			</div>
			<div>
				<CreateButton />
			</div>
			<div className="flex flex-col items-center justify-center flex-1 gap-2 pb-10">
				{posts.map((post, index) => {
					return <PostList post={post} key={index} />;
				})}
			</div>
		</div>
	);
}
