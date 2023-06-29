"use client";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
  useToast,
  Toast,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import React, { useEffect, useState } from "react";

const HistoryModal = ({ isOpen, onClose }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const toast = useToast();
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("github-users")) || [];
    setSearchHistory(users);
  }, []);
  const handleDeleteUser = (userId) => {
    const users = JSON.parse(localStorage.getItem("github-users")) || [];
    const userToDelete = users.find((user) => user.id === userId);
    if (userToDelete) users.splice(users.indexOf(userToDelete), 1);

    localStorage.setItem("github-users", JSON.stringify(users));
    setSearchHistory(users);
    toast({
      title: "Success",
      description: "User deleted successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={"gray.900"} borderRadius={20}>
        <ModalHeader mb={0}>Search History</ModalHeader>
        <ModalBody>
          <Text>Users you have searched for </Text>
          <VStack
            gap={4}
            maxHeight={300}
            overflow={"auto"}
            mt={2}
            padding={1}
            borderRadius={10}
          >
            {searchHistory.length === 0 && (
              <Text color={"gray.400"} fontSize={"sm"} fontWeight={"bold"}>
                No users searched yet
              </Text>
            )}
            {searchHistory.map((user) => (
              <Flex
                key={user.id}
                alignItems={"center"}
                bg={"whiteAlpha.200"}
                w={"full"}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={10}
                p={2}
                cursor={"pointer"}
                justifyContent={"space-between"}
                padding={3}
              >
                <Flex gap={2} alignItems={"center"}>
                  <Avatar
                    border={"2px solid white"}
                    padding={0.5}
                    display={"block"}
                    size={"lg"}
                    name={user.name}
                    src={user.avatar_url}
                  />
                  <Box>
                    <Text fontWeight={"bold"}>{user.name || "User"}</Text>
                    <Text fontSize={"sm"}>{user.id}</Text>
                  </Box>
                </Flex>
                <Flex alignItems={"center"} gap={4}>
                  <Link
                    href={user.url}
                    target="_blank"
                    size={"sm"}
                    color="white"
                    bg="whatsapp.500"
                    fontWeight={"bold"}
                    px={2}
                    borderRadius={4}
                    _hover={{ textDecoration: "none", bg: "whatsapp.300" }}
                  >
                    Visit
                  </Link>
                  <DeleteIcon
                    color="red.400"
                    onClick={() => handleDeleteUser(user.id)}
                  />
                </Flex>
              </Flex>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default HistoryModal;
