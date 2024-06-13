import { BellIcon, ChevronDownIcon, Search2Icon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import ProfileModel from '../../User/ProfileModel';
import { useNavigate } from 'react-router-dom';
import Loading from '../../utils/Loading';
import UserListItem from '../../User/UserListItem';

const Sidebar = () => {
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState('');
    const { user, setSelectChat, chats, setChats } = ChatState();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    console.log('Sidebar user:', user); 

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    };

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: 'Please enter something',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top-left',
            });
            return;
        }
        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const response = await fetch(`http://localhost:5000/user/getuser?search=${search}`, config);
            const data = await response.json();
            console.log("data p:" , data.response)
            setLoading(false);
            setSearchResult(Array.isArray(data) ? data : []);
        } catch (error) {
            toast({
                title: 'Error Occurred!',
                description: 'Failed to load the search results',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
            });
            setLoading(false);
        }
    };

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);

            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                body: JSON.stringify({ userId }),
                headers: config.headers,
            });

            const data = await response.json();
            console.log("data",data.response)
            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: 'Error Occurred!',
                description: 'Failed to access chat',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
            });
            setLoadingChat(false);
        }
    };

    return (
        <>
            <Box display='flex' justifyContent='space-between' bg='cyan.500' alignItems='center' w='100%' p='5px 10px 5px 10px' borderWidth='5px'>
                <Tooltip label='Search User to chat' hasArrow placement='bottom-end'>
                    <Button variant='ghost' onClick={onOpen}>
                        <Search2Icon />
                        <Text d={{ base: 'none', md: 'flex' }} px='4'>
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text m={1}>Bridge</Text>
                <div>
                    <Menu>
                        <MenuButton>
                            <BellIcon m={1} />
                        </MenuButton>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic} />
                        </MenuButton>
                        <MenuList>
                            <ProfileModel user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModel>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottom='1px'>Search User</DrawerHeader>
                    <DrawerBody>
                        <Box display='flex' pd={2}>
                            <Input placeholder='Search By Name' mr={2} value={search} onChange={(e) => setSearch(e.target.value)} />
                            <Button onClick={handleSearch}>Go</Button>
                        </Box>
                        {loading ? (
                            <Loading />
                        ) : (
                            searchResult?.map((user) => <UserListItem key={user._id} user={user} handleFunction={() => accessChat(user._id)} />)
                        )}
                        {loadingChat && <Spinner ml='auto' display='flex' />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Sidebar;
