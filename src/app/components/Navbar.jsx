import { Button, ButtonGroup, Box, Flex } from '@/app/chakra'
import { Image } from '@/app/chakra-next'
import React from 'react'


const Navbar = () => {
  return (
    <Flex justifyContent={"space-between"} py={6} alignItems={"center"}>
    <Box position={"relative"} aspectRatio={5/3} minHeight={20}>
<Image src={"/logo.png"}   fill alt='github_logo' sx={{filter:"invert(1)"}}/>
    </Box>
    <Box>
        <Button size="md"  colorScheme={'whatsapp'}>
Search History
        </Button>

    </Box>
    </Flex>
  )
}

export default Navbar