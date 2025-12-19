import { Box, Button, Flex, Image, Input, Separator, Stack, Text } from "@chakra-ui/react"
import type { Friend } from "./Friends";
import { useMemo, useState } from "react";

const AddFriend = ({handleAddFriend}: {handleAddFriend: (f:Friend) => void}) => {

	const avatars = [
		"/src/assets/ceo.png",
		"/src/assets/doctor.png",
		"/src/assets/handyman.png",
		"/src/assets/police-officer.png",
		"/src/assets/woman.png"
	]

	const [name, setName] = useState("");
	const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

	// Generates a unique numeric ID (timestamp + random suffix)
	const generateId = (): number => {
		const ts = Date.now();
		const rand = Math.floor(Math.random() * 1e6); // 0..999999
		return ts * 1_000_000 + rand; // up to ~1e18, fits in JS number
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim()) return;
		const friend: Friend = {
			id: generateId(),
			name: name.trim(),
			avatar: selectedAvatar ?? avatars[0],
			isSelected: false,
			debts: [],
		};
		handleAddFriend(friend);
		setName("");
		setSelectedAvatar(null);
	};
	
	return (
		<>
			<Box w={'50dvw'} bg={'white'} boxShadow={'sm'} borderRadius={'lg'} margin={5} textAlign={'center'} p={5}>
				<Text color={'orange.600'} fontSize={'xl'} letterSpacing={2} fontWeight={'bold'}>Add new Friend!</Text>
				<Separator />
				<form onSubmit={onSubmit}>
					<Stack gap={4} mt={10}>
						<Input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
						<Text color={'gray.600'}>Choose an avatar:</Text>
						<Flex gap={3} wrap={'wrap'} justify={'center'}>
							{avatars.map((src)=> (
								<Box key={src}
									border={selectedAvatar===src? '2px solid orange': '2px solid transparent'}
									borderRadius={'md'}
									p={1}
									cursor={'pointer'}
									onClick={()=>setSelectedAvatar(src)}
								>
									<Image src={src} alt={'avatar'} boxSize={'56px'} objectFit={'contain'} />
								</Box>
							))}
						</Flex>
						<Button backgroundColor={'orange.600'} type={'submit'} colorScheme={'orange'}>Add Friend</Button>
					</Stack>
				</form>
			</Box>
		</>
	)
}

export default AddFriend;