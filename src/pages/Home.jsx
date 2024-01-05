import { React, useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

export default function Home({ user }) {
	const [posts, setPosts] = useState(null);
	const [loading, setLoading] = useState(false);

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

	console.log(posts);

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
		<div className="flex flex-col h-full">
			{posts.map((post, index) => {
				return (
					<div key={index}>
						<div>
							<h1>{post.title}</h1>
							<img src={post.imgURL} alt={`${post.title} image`} />
						</div>
						<div>
							<p>{post.content}</p>
						</div>
						<div>
							<div>
								<p>Created By:</p>
								<p>{post.author.username}</p>
							</div>
							<div>
								<p>Posted on:</p>
								<p>{post.date_formatted}</p>
							</div>
						</div>
                        <button>Delete</button>
                        <button>Edit</button>
					</div>
				);
			})}
		</div>
	);
}
