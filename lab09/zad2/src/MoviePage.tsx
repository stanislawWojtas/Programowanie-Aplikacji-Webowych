import { AspectRatio, Box, Flex, Image, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

interface MovieData {
	name: string,
	language: string,
	genres: string[],
	averageRuntime: number,
	image?: {
		medium: string,
		large: string
	}
}

export const MoviePage = () => {
	const { id } = useParams<{ id: string }>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [movie, setMovie] = useState<MovieData | null>(null);

	useEffect(() => {        
		if (!id) return;
		const fetchShowData = async () => {
			setIsLoading(true);
			try{
				const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
				const data = await res.json();
				setMovie(data);
			}catch (e){
				console.error(`Error fetching data for movie ${id}`, e);
			}finally{
				setIsLoading(false);
			}
		}
		fetchShowData();    
	}, [id])

	return (
		<>
			<Box>
				<Text textAlign={'center'} fontSize={'xxx-large'} letterSpacing={'1rem'} color={'cyan'} fontWeight={"bold"} mb={6}>{movie?.name}</Text>
				<Flex justify={'space-evenly'} minH={'70dvh'}>
					{movie?.image?.medium ? (
						<AspectRatio ratio={2/3} w={'30%'} maxW={'300px'}>
							<Image src={movie.image.medium} alt={`Image ${movie.name}`} borderRadius={"1rem"} boxShadow={'sm'} objectFit={'cover'}  />
						</AspectRatio>
					) : (
						<Box w={'30%'} />
					)}
					<Box color={"cyan"} fontFamily={'sans-serif'} fontSize={'xl'}>
						<Flex justifyContent={'space-evenly'} flexDir={'column'} h={"100%"}>
							<Text>Language: {movie?.language}</Text>
							<Text>Average runtime: {movie?.averageRuntime} minutes</Text>
							<Text>Genres: {movie?.genres?.join(', ')}</Text>
						</Flex>

						
					</Box>
				</Flex>
			</Box>
		</>
	)
}