import { Card, Grid, Image, AspectRatio, Loader } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

interface MovieI {
	id: number,
	name: string,
	image?: {
		medium: string,
		large: string
	}
}

const MoviesList = () => {
	const [movies, setMovies] = useState<MovieI[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	useEffect( () => {
		const fetchShows = async () => {
			try{
				const res = await fetch("https://api.tvmaze.com/shows");
				const data = await res.json();
				setMovies(data);
			}catch (e){
				console.error("Error fetching shows: ",e);
			} finally{
				setIsLoading(false);
			}
		}
		fetchShows();
	}, [])

	return (
		isLoading ? (<Loader fontSize={'xxx-large'}/>) :
		(<Grid templateColumns={"repeat(5, 1fr)"} gap={6}>
			{movies.map(m => (
				<MovieItem id={m.id} name={m.name} image={m.image?.medium} key={m.id}/>
			))}
		</Grid>)
		
	)
}

const MovieItem = ({id, name, image}: {id:number, name:string, image:string | undefined}) => {
	const navigate = useNavigate();

	return(
		<>
			<Card.Root maxW={'sm'} _hover={{transform: 'scale(1.02)', transition: '0.2s'}} cursor={'pointer'} onClick={() => navigate(`/movies/${id}`)} boxShadow={'lg'} borderRadius={'1rem'} bg={'purple.950'}>
				<Card.Body>
					<AspectRatio ratio={2/3}>
						<Image src={image} alt={`Image ${name}`} borderRadius={"1rem"} boxShadow={'sm'} objectFit={'cover'} w={'100%'} />
					</AspectRatio>
				</Card.Body>
				<Card.Description color={'cyan'} textAlign={'center'} fontSize={'lg'} fontFamily={'sans-serif'} m={2}>{name}</Card.Description>
			</Card.Root>
		</>
	)
}

export default MoviesList