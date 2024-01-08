import { React, useEffect, useMemo, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import PostList from "../components/HomePage/PostList";
import CreateButton from "../components/HomePage/CreateButton";
import SearchBox from "../components/HomePage/SearchBox";
import Select from "../components/HomePage/Select";
import Unauthorized from "./Unauthorized";

export default function Home({ user }) {
	const [posts, setPosts] = useState(null);
	const [loading, setLoading] = useState(false);
	const [sortType, setSortType] = useState("default");
	const [searchInput, setSearchInput] = useState("");
	const [filteredResults, setFilteredResults] = useState([]);

	const searchItems = (searchValue) => {
		setSearchInput(searchValue);

		if (searchInput !== "") {

			const filteredData = posts.filter((item) => {
				return Object.values(item)
					.join("")
					.toLowerCase()
					.includes(searchInput.toLocaleLowerCase());
			});

			setFilteredResults(filteredData);

		} else {
			setFilteredResults(posts);
		}
	};

	const sortedData = useMemo(() => {
		let results = searchInput.length >= 1 ? filteredResults : posts;

		switch (sortType) {
			case "a-z":
				results = results.sort((a, b) => {
					return a.title.localeCompare(b.title);
				});
				break;
			case "z-a":
				results = results.sort((a, b) => {
					return b.title.localeCompare(a.title);
				});
				break;
			case "newest":
				results = results.sort((a, b) => {
					return (
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					);
				});
				break;
			case "oldest":
				results = results.sort((a, b) => {
					return (
						new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					);
				});
				break;
			case "popularity":
				results = results.sort((a, b) => {
					return b.likes.length - a.likes.length;
				});
				break;
			case "comments":
				results = results.sort((a, b) => {
					return b.comments.length - a.comments.length;
				});
				break;
		}

		return results;

	}, [posts, sortType, searchInput]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const data = await fetch("http://localhost:8000/api/blog/posts").then(
					(res) => res.json()
				);
				setPosts(data.posts);
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

	if (!user.isAdmin) {
		return <Unauthorized />;
	}

	return (
		<div className="flex flex-col h-full px-72 gap-5">
			<div className="flex items-center justify-between gap-2 pt-10">
				<SearchBox searchItems={searchItems} />
				<Select setSortType={setSortType} />
			</div>
			<div>
				<CreateButton />
			</div>
			<div className="flex flex-col items-center justify-center flex-1 gap-2 pb-10">
				{sortedData.map((post, index) => {
					return <PostList post={post} key={index} />;
				})}
			</div>
		</div>
	);
}
