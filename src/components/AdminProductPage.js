import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import{
    useDisclosure, 
    FormLabel, 
    Modal,
    Input,
    ModalCloseButton,
    Button,
    ModalContent,
    ModalOverlay,
    Checkbox,
    Grid,
    Image,
    Text
} from '@chakra-ui/react';
import { callApi } from '../api';

export const AdminProductPage = ({ token, currentUser }) => {
	const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [inStock, setInStock] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

	const fetchUser = async () => {
		const productData = await callApi({ path: `/products/${productId}`, token: token });
		setProduct(productData);
    };
    
    useEffect(() => {
		fetchUser();
    }, []);

    const handleEditProductSubmit = async event => {
        event.preventDefault();
        try {
            const editProduct = await callApi(
                { method: 'patch', path: `/products/${product.id}`, token: token },
                {
                    name: name ? name: product.name,
                    description: description ? description: product.description,
                    price: price ? price: product.price,
                    category: category ? category: product.category,
                    imageurl: imageUrl ? imageUrl: product.imageurl,
                    inStock: inStock ? "true" : "false"
                }
            );
            console.log(editProduct);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteProduct = async (event) => {
        event.preventDefault();
        try
        {
          const deletedProduct = await callApi({ method: 'delete', path: `/products/${product.id}`, token:token})
          console.log(deletedProduct)
        }
        catch(error)
        {
          console.error(error);
        }
      }
    
    return ( <>
        {currentUser && currentUser.isAdmin ? 
        <Grid>
{
    currentUser && currentUser.isAdmin ? <Button variant='outline' width="100px" justifySelf='left' onClick={onOpen}>Edit Product</Button> : null
}      
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <form onSubmit={handleEditProductSubmit}>
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
                <Text>Name:  {product.name} </Text>
                <Image
                    borderRadius="full"
                    boxSize="150px"
                    src={product.imageurl}
                    alt={product.name}
                /> 
                <Text>Description: {product.description}</Text>
                <Text>Price: {product.price}</Text>
                <Text>Category: {product.category}</Text>
                <Text>inStock: {product.inStock ? 'True': 'False'}</Text>

        </Grid> : null
    }
    {
    currentUser && currentUser.isAdmin ? <Button variant='outline' onClick={(event) => { handleDeleteProduct(event)}}>Delete Product</Button> : null
    }   
    </>
	);
};