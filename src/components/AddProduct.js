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

export const AddProduct = ({currentUser, token}) => {
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState('');
const [category, setCategory] = useState('');
const [inStock, setInStock] = useState(false);
const [imageUrl, setImageUrl] = useState('');
const { isOpen, onOpen, onClose } = useDisclosure();

const handleAddProductSubmit = async event => {
    event.preventDefault();
    try {
        const createProduct = await callApi(
            { method: 'post', path: '/products', token: token },
            {
                name: name,
                description: description,
                price: price,
                imageUrl: imageUrl,
                inStock: inStock,
                category: category
            }
        );
        console.log(createProduct);
    } catch (error) {
        console.log(error);
    }
};

return (
<>
{
    currentUser && currentUser.isAdmin ? <Button width="100px" justifySelf='left' variant='outline' onClick={onOpen}>Add Product</Button> : null
}      
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <form onSubmit={handleAddProductSubmit}>
			<FormLabel>Name</FormLabel>
				<Input
					type='text'
					placeholder='Enter Product Name'
					value={name}
					onChange={e => {setName(e.target.value);}}
				/>
			<FormLabel>Description</FormLabel>
				<Input
					type='text'
					placeholder='Enter Description'
					value={description}
					onChange={e => {setDescription(e.target.value);}}
				/>
			<FormLabel>Price</FormLabel>
			    <Input
					type='text'
					placeholder='Enter Price'
					value={price}
					onChange={e => {setPrice(e.target.value);}}
				/>
			<FormLabel>Category</FormLabel>
				<Input
					type='text'
					placeholder='Enter Category'
					value={category}
				    onChange={e => {setCategory(e.target.value);}}
				/>
            <FormLabel>ImageURL</FormLabel>
				<Input
					type='text'
					placeholder='Enter URL'
					value={imageUrl}
					onChange={e => {setImageUrl(e.target.value);}}
					/>
            <FormLabel>inStock</FormLabel>
				<Checkbox
					value={inStock}
                    onChange={() => {setInStock(!inStock)}}
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