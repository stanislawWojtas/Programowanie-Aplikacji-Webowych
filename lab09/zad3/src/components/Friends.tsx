import { Box, Button, Flex, Image, Separator, Text } from "@chakra-ui/react";

interface Debt{
	creditorName: string; //komu kase wisi
	amount: number;
}

export interface Friend {
	id: number;
	name: string;
	avatar: string;
	isSelected: boolean;
	debts: Debt[];
}

const Friends = ({friends, onToggle}: {friends:Friend[], onToggle: (id:number) => void}) => {

	return(
		<>
			<Box bg={'white'} m={5} p={5} boxShadow={'sm'} borderRadius={"lg"} w={500}>
				<Text>Your Friends</Text>
				{friends.map((f) => (<FriendTile friend={f} key={f.id} onToggle={onToggle}/>))}
			</Box>
		</>
	)
}

const FriendTile = ({friend, onToggle}: {friend:Friend, onToggle: (id:number)=>void}) => {
	
	
	return(
		<>
			<Separator />
			<Box textAlign={'center'} m={3} bg={friend.isSelected ? "orange.200": "white"} p={2} borderRadius={"lg"} outline={friend.isSelected ? "5px dotted orange" : "none"}>
				<Text color={'red.700'} fontSize={'xl'} fontWeight={'bold'} letterSpacing={2}>{friend.name}</Text>
			<Flex>
				<Image src={friend.avatar} objectFit={'contain'} boxSize={20}></Image>
				<Box m={2}>
					{friend.debts.map((d) => (
						<Text>{friend.name} musi oddać {d.amount}zł osobie:  {d.creditorName}</Text>
					))}
				</Box>
			</Flex>
			<Button bg={'orange.600'} onClick={() => onToggle(friend.id)}>{friend.isSelected ? 'Usuń z rachunku' : 'dodaj do rachunku'}</Button>
			</Box>
			
		</>
	)
}

export default Friends;