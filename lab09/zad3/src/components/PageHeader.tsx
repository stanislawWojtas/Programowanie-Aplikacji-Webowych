import { Box, Flex, Image, Text } from "@chakra-ui/react"

const PageHeader = () => {

	return (
		<>
			<Flex w={'100dvw'} bg={'orange.400'} minH={'10dvh'} justifyContent={'center'} alignItems={'center'} gap={5} boxShadow={'lg'} mb={5}>
				<Text color={'black'} fontSize={'xl'} fontWeight={'bold'} letterSpacing={2}>Share Your Pizza!!!</Text>
				<Image src="https://www.freeiconspng.com/uploads/pizza-png-4.png" objectFit={"contain"} height={'10dvh'}></Image>
			</Flex>
		</>
	)
}

export default PageHeader;