import { Avatar, Badge, Button, Flex, VStack, Box, Text} from '@/app/chakra'
import React from 'react'
import Repos from './Repos'

const UserProfile = ({userData}) => {
  return (
    <>
    <Flex my={16} border={"2px solid"} borderColor={"green.500"} borderRadius={10} borderWidth={3} padding={8}>
        <VStack gap={5}>
            <Avatar border={"2px solid white"} padding={1}  size={"2xl"} name={userData.name} src={userData.avatar_url}/>
            <Button colorScheme='whatsapp'>
                <a href={userData.html_url} target='_blank'>View Profile</a>
            </Button>
        </VStack>
        <VStack ml={8} alignItems={"self-start"}>
            <Flex gap={4}>
                <Badge fontSize={"0.9em"} colorScheme='orange'>
                    Public Repos: {userData.public_repos}
                </Badge>
                <Badge fontSize={"0.9em"} colorScheme='pink'>
                    Public Gists: {userData.public_gists}
                </Badge>
                <Badge fontSize={"0.9em"} colorScheme='cyan'>
                    Followers: {userData.followers}
                </Badge>
                <Badge fontSize={"0.9em"} colorScheme='purple'>
                    Following: {userData.following}
                </Badge>
            </Flex>

            <Text fontSize={"3xl"} fontWeight={"bold"} mt={4} color={"green.400"}>
                {userData.name}
            </Text>
            <Text fontSize={"2xl"} fontWeight={"bold"} mt={1} color={"green.400"}>
                {userData.bio}
            </Text>
            <Box>
                <Text fontSize={"md"} fontWeight={"bold"}color={"white.400"}>
                    <Text as={"span"} fontWeight={"bold"} color={"green.200"} mr={1}>
                        Blog / Website:
                    </Text>
                    {<a href={userData.blog} target='_blank'>Link here</a>  || "N/A"}

                </Text>
                <Text fontSize={"md"} fontWeight={"bold"}color={"white.400"}>
                    <Text as={"span"} fontWeight={"bold"} color={"green.200"} mr={1}>
                        Company:
                    </Text>
                    {userData.company || "N/A"}

                </Text>
                <Text fontSize={"md"} fontWeight={"bold"}color={"white.400"}>
                    <Text as={"span"} fontWeight={"bold"} color={"green.200"} mr={1}>
                        Location:
                    </Text>
                    {userData.location || "N/A"}

                </Text>
                <Text fontSize={"md"} fontWeight={"bold"}color={"white.400"}>
                    <Text as={"span"} fontWeight={"bold"} color={"green.200"} mr={1}>
                        Member Since:
                    </Text>
                    {new Date(userData.created_at).toLocaleDateString()}

                </Text>
            </Box>
        </VStack>
    </Flex>
    <Repos reposUrl = {userData.repos_url}/>
    </>
  )
}

export default UserProfile