import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useState } from 'react'
import MoviesList from './MoviesList'
import { NavLink, Route, Routes } from 'react-router'
import { MoviePage } from './MoviePage'

function App() {
  return (
    <Box bg={'purple.800'} minH={'100dvh'}>
      <Header />
      <Routes>
        <Route path='/' element={<MoviesList />} />
        <Route path='/movies/:id' element={<MoviePage />} />
      </Routes>
    </Box>
  )
}

export default App

const Header = () => {
  return (
    <Flex
      as={'header'}
      bg={'purple.950'}
      p={4}
      align={'center'}
      justify={'space-between'}
      boxShadow={'md'}
      color={'cyan'}
      mb={6}>
      <Heading size={'xl'} letterSpacing={'0.5rem'} fontWeight={'bold'}>Explore Movies</Heading>
      <NavLink to={'/'}>HOME</NavLink>
    </Flex>
  )
}