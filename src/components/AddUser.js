import React, { useState } from 'react';
import{
    useDisclosure, 
    FormLabel, 
    Modal,
    Input,
    ModalCloseButton,
    Button,
    ModalContent,
    ModalOverlay,
    Checkbox
} from '@chakra-ui/react';
import { callApi } from '../api';

export const AddUser = ({currentUser}) => {
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [imageUrl, setImageUrl] = useState('');
const [isAdmin, setIsAdmin] = useState(false);
const { isOpen, onOpen, onClose } = useDisclosure();

const handleAddUserSubmit = async event => {
    event.preventDefault();
    try {
        const createUser = await callApi(
            { method: 'post', path: '/users/register' },
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: password,
                imageUrl: imageUrl,
                isAdmin: isAdmin ? "true" : "false"
            }
        );
        console.log(createUser);
    } catch (error) {
        console.log(error);
    }
};

return (
<>
{
    currentUser && currentUser.isAdmin ? <Button variant='outline' onClick={onOpen}>Add Users</Button> : null
}      
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <form onSubmit={handleAddUserSubmit}>
			<FormLabel>Username</FormLabel>
				<Input
					type='text'
					placeholder='enter username'
					value={username}
					onChange={e => {setUsername(e.target.value);}}
				/>
			<FormLabel>Password</FormLabel>
				<Input
					type='password'
					placeholder='enter password'
					value={password}
					onChange={e => {setPassword(e.target.value);}}
				/>
			<FormLabel>First Name</FormLabel>
			    <Input
					type='text'
					placeholder='Enter First Name'
					value={firstName}
					onChange={e => {setFirstName(e.target.value);}}
				/>
			<FormLabel>Last Name</FormLabel>
				<Input
					type='text'
					placeholder='Enter Last Name'
					value={lastName}
				    onChange={e => {setLastName(e.target.value);}}
				/>
			<FormLabel>Email</FormLabel>
				<Input
					type='text'
					placeholder='Enter Email'
					value={email}
					onChange={e => {setEmail(e.target.value);}}
					/>
            <FormLabel>ImageURL</FormLabel>
				<Input
					type='text'
					placeholder='Enter URL'
					value={imageUrl}
					onChange={e => {setImageUrl(e.target.value);}}
					/>
            <FormLabel>isAdmin</FormLabel>
				<Checkbox
					value={isAdmin}
                    onChange={() => {setIsAdmin(!isAdmin)}}
					/>
				<Button type='submit' onClick={onClose}>
					Submit
				</Button>
		    </form>
            <ModalCloseButton />
        </ModalContent>
        </Modal>
    </>
    )
}

