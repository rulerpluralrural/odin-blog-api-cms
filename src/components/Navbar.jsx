import {
	FaBlog,
	FaSignInAlt,
	FaUserAlt,
	FaSignOutAlt,
	FaUserCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";

const Navbar = ({ user, setLoadingSession, setUser, loadingSession }) => {
	const navigate = useNavigate();

	const logOut = async () => {
		setLoadingSession(true);
		await fetch("http://localhost:8000/api/blog/logout", {
			method: "POST",
			credentials: "include",
		});
		setLoadingSession(false);
		setUser(null);
		const notify = toast.success("You have logged out!");
		setTimeout(() => {
			toast.dismiss(notify);
		}, 5000);
		navigate("/login");
	};

	return (
		<div className=" flex justify-between items-center bg-slate-100 text-slate-950 font-serif">
			<div className=" flex justify-between gap-2 px-10 py-8 text-2xl">
				<FaBlog></FaBlog>
				<Link to="/" className=" font-bold">
					BLOG API
				</Link>
			</div>
			<Navlinks user={user} logOut={logOut} loadingSession={loadingSession} />
		</div>
	);
};

const Navlinks = ({ user, logOut, loadingSession }) => {
	return (
		<nav className="px-10 py-8">
			<div className="flex justify-between items-center gap-10 font-bold text-xl">
				{loadingSession ? (
					<PulseLoader className="self-center" color="#36d6b0" />
				) : user ? (
					<>
						<button
							type="button"
							className="flex items-center gap-2"
							onClick={logOut}
						>
							<FaSignOutAlt></FaSignOutAlt>LOGOUT
						</button>
						<div className="flex items-center gap-2 uppercase">
							<FaUserCircle></FaUserCircle>
							{user.username}
						</div>
					</>
				) : (
					<>
						<div>
							<Link to="/login" className="flex items-center gap-2">
								<FaSignInAlt></FaSignInAlt>LOGIN
							</Link>
						</div>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
