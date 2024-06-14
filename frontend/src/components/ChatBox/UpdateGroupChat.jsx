import { ViewIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, IconButton, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import UserBadge from '../../User/UserBadge';

const UpdateGroupChat = ({fetchAgain, setFetchAgain}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameloading, setRenameLoading] = useState(false);
    const toast = useToast();
    const { selectedChat, setSelectedChat ,user} = ChatState();

    const handleRemove = async () => {

    }

    const handleRename = async () => {
        
    }

  return (
    <>
        <IconButton display={{ base : "flex"}} icon={<ViewIcon />} onClick={onOpen} />
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{selectedChat.chatName}</ModalHeader>
                <ModalBody>
                    <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
                        { selectedChat.users.map((u) => (
                            <UserBadge 
                                key={user._id}
                                user={u}
                                handleFunction={()=> handleRemove(u)}/>
                        ))}
                    </Box>
                    <FormControl>
                        <input placeholder='Chat Name'
                            mb={3} value={groupChatName}
                            onChange={(e) => setGroupChatName(e.target.value)} />
                        <Button variant="solid"
                            colorScheme='cyan' ml={1}
                            isLoading={renameloading} onClick={handleRename}>
                                Update
                        </Button>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='cyan' mr={3} onClick={onClose}>
                        close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  )
}

export default UpdateGroupChat
