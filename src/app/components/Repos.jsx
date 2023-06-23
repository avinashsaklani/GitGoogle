"use client"
import {  useToast, Text, Flex, Spinner, Badge, Button } from '@/app/chakra'
import { Link } from '@chakra-ui/next-js';
import React, { useEffect, useState } from 'react'

const Repos = ({reposUrl}) => {
    const toast = useToast();
    const [repos, setRepos] = useState([]);
    const[loading,setLoading] = useState(false);
    const[showMore,setShowMore] = useState(false);
    // console.log("repos is here: ",repos);
    useEffect(()=>{
const fetchRepos = async () =>{
    try{
        setLoading(true);
        const res = await fetch(reposUrl);
        const data = await res.json();
        if(data.message) throw new Error(data.message);
        setRepos(data);

    } catch (error){
         toast({
                    title: "Oops! It's an Error",
                    description: error.message,
                    status: "error",
                    duration: 4000,
                    isClosable: true
                });
    }
    finally{
        setLoading(false);
    }

}
fetchRepos();
    },[reposUrl,toast])
  return (
    <>
    <Text textAlign={"center"}
    letterSpacing={1.5}
    fontSize={"3xl"}
    fontWeight={"bold"}
    color={"green.400"}
    mt={4}
    >
        REPOSITORIES
        
    </Text>
    {loading && (
        <Flex justifyContent={"center"}>
            <Spinner size={"xl"} my={4}/>
        </Flex>
    )}
    {repos.sort((a,b)=> b.stargazers_count - a.stargazers_count).map((repo,idx)=>{
        if(idx>4 && !showMore) return null;
        return (
            <Flex key={repo.id} padding={4} bg={"whiteAlpha.200"}
        _hover={{bg: "whiteAlpha.400"}}
        my={4}
        px={10}
        gap={4}
        borderRadius={8}
        transition={"all 0.3 ease"}
        justifyContent={"space-between"}
        alignItems={"center"}
        >
            <Flex flex={1} direction={"column"}>
                <Link href={repo.html_url} fontSize={"lg"} fontWeight={"bold"} target='_blank'>
                    {repo.name}
                </Link>
                <Badge fontSize={"0.7rem"}
                colorScheme={"whatsapp"}
                w={"min-content"}
                textAlign={"center"}
                mt={2}
                px={1}>
                    Language: {repo.language || "N/A" }
                </Badge>

            </Flex>

            <Flex flex={1}
            gap={4}
            ml={6}
            >
                <Badge fontSize={"0.9rem"} colorScheme='orange' flex={1} textAlign={"center"}>
                    Stars: {repo.stargazers_count}
                </Badge>
                <Badge fontSize={"0.9rem"} colorScheme='orange' flex={1} textAlign={"center"}>
                    Forks: {repo.forks_count}
                </Badge>
                <Badge fontSize={"0.9rem"} colorScheme='orange' flex={1} textAlign={"center"}>
                    Watchers: {repo.watchers_count}
                </Badge>
            </Flex>
        </Flex>
        )
    })}
    {showMore && (
        <Flex justifyContent={"center"} my={4}>
            <Button size="md" colorScheme='whatsapp' onClick={()=> setShowMore(false)}>Show Less</Button>
        </Flex>
    )}
    {!showMore && repos.length >5 && (
        <Flex justifyContent={"center"} my={4}>
            <Button size="md" colorScheme='whatsapp' onClick={()=> setShowMore(true)}>Show More</Button>
        </Flex>

    )}
    </>
  )
}

export default Repos