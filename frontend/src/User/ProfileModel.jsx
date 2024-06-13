import { ViewIcon } from '@chakra-ui/icons';
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';

const ProfileModel = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //console.log('ProfileModel user:', user);

  return (
    <>
    {children ? (
      <span onClick={onOpen}>{children}</span>
    ) : (
      <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
    )}
    <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent h="410px">
        <ModalHeader
          fontSize="40px"
          d="flex"
          justifyContent="center"
        >
          {user.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          d="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Image
            borderRadius="full"
            boxSize="150px"
            src={user.name}
            alt={user.name}
          />
          <Text
            fontSize={{ base: "28px", md: "30px" }}
          >
            Email: {user.email}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
);
};

export default ProfileModel;