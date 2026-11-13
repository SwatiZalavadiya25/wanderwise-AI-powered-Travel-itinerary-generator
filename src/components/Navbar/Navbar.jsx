import { Plane } from "lucide-react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
	return (
		<nav className="navbar">
			<Link to="/" className="navbar-brand">
				<Plane size={24} />
				<span>WanderWise</span>
			</Link>

			<div className="navbar-links">
				<Link to="/" className="navbar-link">
					Home
				</Link>
				<Link to="/trip-summary" className="navbar-link">
					My Trip
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
