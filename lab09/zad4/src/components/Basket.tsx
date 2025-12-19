import styled from "styled-components"
import type { Item } from "../App";

const Container = styled.div`
	align-self:center;
	background-color: wheat;
	width: 400px;`;
const CardItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 2rem;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
	background: #fff;
	padding: 0.75rem 1rem;
	margin: 0.5rem 0;
`;

const Basket = ({items, card}: {items:Item[], card:Record<number, number>}) => {

	const lines = Object.entries(card)
		.map(([id, qty]) => {
			const item = items.find(i => i.id === Number(id));
			if (!item || qty <= 0) return null;
			const subtotal = item.price * qty;
			return { id: Number(id), name: item.name, qty, price: item.price, subtotal };
		})
		.filter(Boolean) as {id:number; name:string; qty:number; price:number; subtotal:number;}[];

	const total = lines.reduce((acc, l) => acc + l.subtotal, 0);

	return(
		<>
			<Container>
				{lines.map(l => (
					<CardItem key={l.id}>
						<div>{l.name}</div>
						<div>{l.qty} pcs</div>
						<div>{l.price.toFixed(2)}$</div>
						<div>= {l.subtotal.toFixed(2)}$</div>
					</CardItem>
				))}
				<CardItem>
					<div style={{ fontWeight:"bold" }}>Total</div>
					<div style={{ fontWeight:"bold" }}>{total.toFixed(2)}$</div>
				</CardItem>
			</Container>
		</>
	)
}

export default Basket;