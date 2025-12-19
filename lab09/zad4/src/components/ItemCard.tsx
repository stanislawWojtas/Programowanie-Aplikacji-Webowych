import styled from "styled-components";
import type { Item } from "../App";
import { useState } from "react";

const Card = styled.div`
	width: 15vw;
	height: 40vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: white;
	border-radius: 1.5rem;
	padding: 0.5rem;
	box-shadow: 0 4px 10px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.06);
	font-family: sans-serif;
	font-weight: bold;
`;
const Image = styled.img`
	object-fit: contain;
	max-width: 50%;
	max-height: 50%;
	display:block;
	align-self:center;
	`;
	
const QuantityBar = styled.div`
	display:flex;
	justify-content: space-between;
	align-items: center`
const QuantityRegulator = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;
	
const QuantityButton = styled.button`
	background-color: #C3C2C2;
	width: 20px;
	height: 20px;
	border-radius: 0.2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	margin: auto;
	cursor: pointer;
`;
const AddSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	`
const AddButton = styled.button`
  color: white;
  background-image: linear-gradient(to bottom, #528FF3, #88AEF0);
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-image 0.2s ease, filter 0.12s ease;

  &:hover {
    background-image: linear-gradient(to bottom, #3b78f0, #6f9ded);
  }

  &:disabled {
    pointer-events: none;    /* blokuje hover i klik */
    cursor: not-allowed;
    opacity: 0.6;
    filter: grayscale(40%);
  }
`;


const ItemCard = ({item, isMinPrice, isMaxPrice, handleAddItem}: {item:Item, isMinPrice:boolean, isMaxPrice:boolean, handleAddItem: (q:number) => void}) => {

	const [quantity, setQuantity] = useState(0);
	
	//funkcje do podniesienia (nie można przekroczyć zakresu)
	const increment = () => setQuantity(q => Math.min(q+1, item.quantity))
	const decrement = () => setQuantity(q => Math.max(q-1, 0))
	const add = () => {
		handleAddItem(quantity);
		setQuantity(0);
	}

	return (
		<>
			<Card style={{ backgroundColor: isMinPrice ? 'red' : isMaxPrice ? 'lightgreen' : 'white' }}>
				<Image src={item.imageUrl} />
				<h1>{item.name}</h1>
				<QuantityBar>
					<h3 style={item.quantity <= 3 ? {border: "3px solid red"} : item.quantity > 10 ? {borderBottom: "3px solid green"} : {border: "none"}}>Q: {item.quantity}</h3>
					<QuantityRegulator>
						<QuantityButton onClick={increment}>+</QuantityButton>
					<p>{quantity}</p>
						<QuantityButton onClick={decrement}>-</QuantityButton>
					</QuantityRegulator>
				</QuantityBar>
				<AddSection>
					<h1>{item.price}$</h1>
					<AddButton type="button" disabled={item.quantity <= 0} onClick={add}>Add to cart</AddButton>
				</AddSection>
			</Card>
			
		</>
	)
}

export default ItemCard;