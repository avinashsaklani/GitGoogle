"use client"
import { Container } from '@/app/chakra'
import { Button, ButtonGroup, Text } from '@/app/chakra'
import Navbar from './components/Navbar'
import Search from './components/Search'
import { useState } from 'react'
import UserProfile from './components/UserProfile'

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(userData);
  return (<>
    <Container maxW="container.lg">
      <Navbar />
      <Text fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"} my={4}>
        Search Users on GitHub
      </Text>
      <Search setUserData={(res) => setUserData(res)} setLoading={setLoading} />
      {userData && <UserProfile userData={userData} />}

    </Container>

  </>

  )

}
