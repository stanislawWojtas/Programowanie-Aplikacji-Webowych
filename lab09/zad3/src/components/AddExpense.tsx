import { Box, Button, Flex, Image, Input, Separator, Text } from "@chakra-ui/react";
import type { Friend } from "./Friends";
import { useState } from "react";

const AddExpense = ({friends, onSettle}: {friends:Friend[], onSettle: (payerId:number, billAmout: number, contributions: Record<number, number>)=>void}) => {

	const [billAmout, setBillAmount] = useState<string>("");
	const [payerId, setPayerId] = useState<number | null>(null);
	const [contributions, setContributions] = useState<Record<number, string>>({});

	const handleContributionChange = (id:number, val:string) => {
		setContributions(prev => ({...prev, [id]: val}));
	}

	const handleSettleClick = () => {
		if(!payerId || !billAmout){
			alert("Wybierz płatnika i podaj kwotę rachunku");
			return;
		}
		const numericContributions: Record<number, number> = {};
		friends.forEach(f => {
			numericContributions[f.id] = parseFloat(contributions[f.id]) || 0;
		})

		onSettle(payerId, parseFloat(billAmout), numericContributions);

		//reset formularza
		setBillAmount("");
		setContributions({});
		setPayerId(null);

	}
	return (
        <Box w={'50dvw'} bg={'white'} boxShadow={'sm'} borderRadius={'lg'} margin={5} textAlign={'center'} p={5}>
            <Text color={'orange.600'} fontSize={'xl'} letterSpacing={2} fontWeight={'bold'}>
                Add new Pizza purchase!
            </Text>
            <Separator my={4} />
            
            {/* Input kontrolowany dla kwoty głównej */}
            <Input 
                mt={5} 
                placeholder="Kwota za pizzę" 
                type="number" 
                min={0}
                value={billAmout}
                onChange={(e) => setBillAmount(e.target.value)}
            />

            <Text mt={4} fontSize="sm" color="gray.500">
                Kliknij osobę, która zapłaciła za całość:
            </Text>

            {/* Mapowanie po aktywnych znajomych */}
            {friends.map((f) => (
                <FriendExpense 
                    key={f.id} 
                    friend={f}
                    isPayer={payerId === f.id} // Czy ta osoba to płatnik?
                    onSelectPayer={() => setPayerId(f.id)} // Funkcja wyboru płatnika
                    contribution={contributions[f.id] || ""} // Wartość inputa
                    onContributionChange={(val) => handleContributionChange(f.id, val)} // Zmiana inputa
                />
            ))}

            <Button 
                bg={'orange.600'} 
                color={'white'} 
                mt={5} 
                onClick={handleSettleClick}
                disabled={friends.length === 0}
            >
                Rozlicz
            </Button>
        </Box>
    )
	
}


interface FriendExpenseProps {
    friend: Friend;
    isPayer: boolean;
    onSelectPayer: () => void;
    contribution: string;
    onContributionChange: (val: string) => void;
}

const FriendExpense = ({ friend, isPayer, onSelectPayer, contribution, onContributionChange }: FriendExpenseProps) => {
    return (
        <Flex 
            justifyContent={'space-evenly'} 
            alignItems={'center'} 
            mt={5} 
            // Zmieniamy styl ramki w zależności czy ktoś jest płatnikiem
            border={isPayer ? "2px solid green" : "2px dotted orange"} 
            bg={isPayer ? "green.50" : "transparent"}
            p={2} 
            borderRadius={'lg'} 
            cursor="pointer"
        >
            {/* Kliknięcie w awatar/imię wybiera płatnika */}
            <Flex onClick={onSelectPayer} alignItems="center" flex={1}>
                <Image src={friend.avatar} objectFit={'contain'} boxSize={14} borderRadius="full" />
                <Text ml={3} color={isPayer ? 'green.700' : 'orange.600'} fontSize={"lg"} fontWeight={'bold'}>
                    {friend.name} {isPayer && "(Płatnik)"}
                </Text>
            </Flex>

            {/* Input nie wybiera płatnika, tylko wpisuje wkład.
                e.stopPropagation() zapobiega wybraniu płatnika przy kliknięciu w input */}
            <Input 
                type="number" 
                w={24} 
                placeholder="Wkład" 
                min={0} 
                bg="white"
                value={contribution}
                onChange={(e) => onContributionChange(e.target.value)}
                onClick={(e) => e.stopPropagation()} 
            />
        </Flex>
    )
}

export default AddExpense;