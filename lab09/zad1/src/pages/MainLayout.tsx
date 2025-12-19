import { Outlet } from "react-router"
import { NavLink } from "react-router"

const MainLayout = () => {
	return(
		<div className="app-container">
			<header className="header">
				<h1>Aplikacja Główna</h1>
			</header>
			{/* Content */}
			<div className="content">
				<aside>
					<nav>
						<NavLink to={'/'}>Home</NavLink>
						<NavLink to={'/about'}>About</NavLink>
						<NavLink to={'/phone'}>Phone</NavLink>
					</nav>
				</aside>
				<main>
					<Outlet />
				</main>
				</div>
			<footer>
				<p>&copy; Zadanie 1</p>
			</footer>
		</div>
	)
}

export default MainLayout