import { useEffect, useMemo, useState } from 'react'
import ItemCard from './components/ItemCard';
import Navbar from './components/Navbar';
import styled from 'styled-components';
import Basket from './components/Basket';

const AppContainer = styled.div`
  display:flex;
  height: 100vh;
  background-color: #E3E3E3; 
`
const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-left:3rem;
  gap:1rem;
`

const Title = styled.div`
  display:flex;
  justify-content:space-between`;

const Main = styled.div`
  flex: 1;
  min-width: 0;        // pozwala zająć całą resztę szerokości
  display: flex;
  flex-direction: column;
  overflow: auto;
`
const NoItemsText = styled.div`
  text-align: center;
  font-style: italic;
  font-weight: bold;
  `
export interface Item {
  id:number;
  name:string;
  quantity:number;
  price:number;
  imageUrl: string;
}



function App() {

  const [items, setItems] = useState<Item[]>([]);
  const [card, setCard] = useState<Record<number, number>>({})

  useEffect(() => {
    const fetchItems = async () => {
      try{
        const res = await fetch("/data.json");
        const data = await res.json();
        setItems(data);
      }catch (e){
      }
    };

    fetchItems();
    console.log(items)
  }, [])

  const {minPrice, maxPrice} = useMemo( () => {
    if(!items.length) return { minPrice: null as number | null, maxPrice: null as number | null };
    let min = items[0].price, max=items[0].price;
    for (const it of items){
      if(it.price < min) min = it.price;
      if(it.price > max) max = it.price;
    }
    return{minPrice: min, maxPrice: max};
  }, [items]);
  
  const totalPrice = useMemo(() => {
    let total = 0;
    for (const [idStr, qty] of Object.entries(card)) {
      if (qty <= 0) continue;
      const item = items.find(i => i.id === Number(idStr));
      if (!item) continue;
      total += item.price * qty;
    }
    return total;
  }, [card, items]);
  
  const isCartEmpty = useMemo(() => Object.values(card).reduce((a,b)=>a+b,0) === 0, [card]);
  
  const addToCard = (id: number, q: number) => {
    if (q <= 0) return;
    setCard(prev => {
      const inCart = prev[id] ?? 0;
      const item = items.find(i => i.id === id);
      if (!item) return prev;
      const nextQty = Math.min(inCart + q, item.quantity);
      return { ...prev, [id]: nextQty };
    })
  }

  return (
    <>
    <AppContainer>
      <Navbar />
      <Main>
        <Title>
          <h1 style={{fontSize:"4rem"}}>AGH Shop</h1>
          <p style={{fontSize:"1.5rem"}}>Basket: {totalPrice.toFixed(2)}$</p>
        </Title>
        {isCartEmpty ? (
          <NoItemsText>Your basket is empty</NoItemsText>
        ): (
          <Basket items={items} card={card}/>
        )}
        <ItemsContainer>
          {items.map((i) => (
            <ItemCard
              key={i.id}
              item={i}
              isMinPrice={minPrice !== null && i.price === minPrice}
              isMaxPrice={maxPrice !== null && i.price === maxPrice}
              handleAddItem={(q) => addToCard(i.id, q)}
            />
          ))}
        </ItemsContainer>
      </Main>
    </AppContainer>
      
    </>
  )
}

export default App
