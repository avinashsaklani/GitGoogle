import { Button,  Box, Flex, useDisclosure } from '@/app/chakra'
import { Image } from '@/app/chakra-next'
import React from 'react'
import HistoryModal from './HistoryModal';


const Navbar = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex justifyContent={"space-between"} py={6} alignItems={"center"}>
    <Box position={"relative"} aspectRatio={5/3} minHeight={20}>
<Image src={"/logo.png"}   fill alt='github_logo' sx={{filter:"invert(1)"}}/>
    </Box>
    <Box>
        <Button size="md"  colorScheme={'whatsapp'} onClick={onOpen}>
Search History
        </Button>

    </Box>
    {isOpen && <HistoryModal isOpen={isOpen} onClose={onClose}/>}
    </Flex>
  )
}

export default Navbar