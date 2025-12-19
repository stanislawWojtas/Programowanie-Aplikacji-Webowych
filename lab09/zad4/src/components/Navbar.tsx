import { NavLink } from "react-router";
import styled from "styled-components";


const SidebarContainer = styled.div`
	width: 250px;
	background-color: white;
	display: flex;
	flex-direction: column;
	padding: 20px;
	box-shadow: 2px 0 5px rgba(0,0,0,0.1);
	align-items:center;
	font-weight: bold;
	gap:2rem;
	`;
const Logo = styled.img`
	width: 100px;
	object-fit: conatain;`

const Navbar = () => {
	
	return (
		<>
			<SidebarContainer>
				<Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Znak_graficzny_AGH.svg/1200px-Znak_graficzny_AGH.svg.png"/>
				<p style={{ cursor: "pointer" }}>Overview</p>
				<p style={{ cursor: "pointer" }}>Shop</p>
				<p style={{ cursor: "pointer" }}>Basket's Details</p>
				<p style={{ cursor: "pointer" }}>Payments</p>
				<p style={{ cursor: "pointer" }}>Messages</p>
			</SidebarContainer>
		</>
	)
}

export default Navbar;