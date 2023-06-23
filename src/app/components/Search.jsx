"use client"
import { Input } from "@/app/chakra"
import { Button, ButtonGroup, useToast } from "@/app/chakra"
import { useState } from "react"
const Search = ({setUserData, setLoading}) => {
    const[query, setQuery] = useState('');
    const toast = useToast()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert(`You searched for ${query}`);
        if(!query) return;
        setLoading(true);
        setUserData(null);
        try{
            const res = await fetch(`https://api.github.com/users/${query}`);
            const data = await res.json();
            // console.log(data, "data is here")
            if(data.message){
                return toast({
                    title: "Oops! It's an Error",
                    description: data.message === "Not Found" ? "User not found" : data.message,
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            }
            setUserData(data);
            addUserToLocalStorage(data,query);
        }
        catch(error){
            toast({
                    title: "Oops! It's an Error",
                    description: error.message,
                    status: "error",
                    duration: 4000,
                    isClosable: true
                });

        }finally{
            setLoading(false);
        }

    };

    const addUserToLocalStorage = (data, username) =>{
        const users = JSON.parse(localStorage.getItem('github-users')) || [];
        const userExists = users.find(user => user.id === username);
        if(userExists){
            users.splice(users.indexof(userExists),1);
        }
        users.unshift({
            id:username,
            avatar_url: data.avatar_url,
            name: data.name,
            url: data.html_url
        })
        localStorage.setItem('github-users', JSON.stringify(users));
    }


  return (
    <form onSubmit={handleSubmit}>
        <Input
        variant={"outline"}
        placeholder={"Type a username (i.e elonmusk)"}
        borderWidth={2}
        borderRadius={10}
        focusBorderColor="green.500"
        onChange={(e) => setQuery(e.target.value)}
        />
        <Button size="md" type="submit" colorScheme="whatsapp" mt={4} disabled={!query} opacity={!query ? 0.5 : 1}>Search</Button>
    </form>
  )
}

export default Search