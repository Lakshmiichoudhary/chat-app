import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({handleFunction,user}) => {

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      _hover={{
        background: "",
        color : "black",
      }} w="100%" display="flex" alignItems="center" color="black" px={3} py={2} borderRadius="lg">
      <Avatar mr={2} size="sm" cursor="pointer" name={user.name} scr={user.pic} />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize='xs'>
            <b>Email :</b>
            {user.email}
        </Text>
      </Box>      
    </Box>
  )
}

export default UserListItem
