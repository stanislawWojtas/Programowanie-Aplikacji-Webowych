import { Box, Button, Container, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import PageHeader from './components/PageHeader'
import Friends, { type Friend } from './components/Friends'
import AddExpense from './components/AddExpense'
import AddFriend from './components/AddFriend'


function App() {

  const [isFriendForm, setIsFriendForm] = useState<boolean>(false)
  const [friends, setFriends] = useState<Friend[]>([]);

  const handleFormVisibility = () => {
    setIsFriendForm(!isFriendForm);
  }

  const handleAddFriend = (friend:Friend) => {
    setFriends([...friends, friend]);
  }

  const handleToggleFriend = (id: number) => {
    setFriends(current => current.map(f => 
      f.id == id ? {...f, isSelected: !f.isSelected} : f
    ));
  }

  //z czata
  const onSettle = (payerId: number, billAmount: number, contributions: Record<number, number>) => {
  setFriends((currentFriends) => {
    // KROK 1: Znajdź płatnika (potrzebujemy jego imienia, żeby wpisać je jako wierzyciela)
    const payer = currentFriends.find((f) => f.id === payerId);
    
    // KROK 2: Znajdź listę konsumentów (tylko ci zaznaczeni "jedzą")
    const consumers = currentFriends.filter((f) => f.isSelected);

    // Zabezpieczenie inżynierskie (Guard Clause)
    if (!payer || consumers.length === 0) {
      console.warn("Brak płatnika lub konsumentów!");
      return currentFriends;
    }

    const splitAmount = billAmount / consumers.length;

    return currentFriends.map((friend) => {
      if (!friend.isSelected) return friend;

      if (friend.id === payerId) return friend;


      const paidContribution = contributions[friend.id] || 0;
      const debtValue = splitAmount - paidContribution;

      if (debtValue > 0.01) {
        const newDebt = {
          creditorName: payer.name,
          amount: parseFloat(debtValue.toFixed(2)), // Zaokrąglamy do 2 miejsc po przecinku
        };
        return {
          ...friend,
          debts: [...friend.debts, newDebt],
        };
      }
      return friend;
    });
  });
};


  return (
    <>
      <Box minH={'100dvh'} bg={'wheat'} fontFamily={'sans-serif'}>
        <PageHeader/>
        <Box w="100%" display="flex" justifyContent="flex-end">
          <Button backgroundColor="orange.600" onClick={handleFormVisibility}>
            {isFriendForm ? "Dodaj nowego znajomego" : "Formularz pizzy"}
          </Button>
        </Box>
        <Flex justifyContent={'space-evenly'}>
          <Friends friends={friends} onToggle={handleToggleFriend}/>
          {isFriendForm ? (
            <AddExpense friends={friends.filter(f => f.isSelected === true)} onSettle={onSettle}/>
          ) : (
            <AddFriend handleAddFriend={handleAddFriend}/>
          )}
          
        </Flex>
      </Box>
    </>
  )
}

export default App
