import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {
  //State to manage products 
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  //Function to get products
  const fetchProducts = async() => {
    try {
      const response = await axios.get(`http://localhost:5001/api/products`);
      setProducts(response.data);
    } catch(error){
      console.error("Error fetching products", error);
      setError("Error fetching products")
    }
  };

  //Function to delete a product
  const handleDelete = async(id) => {
    try{
      await axios.delete(`http://localhost:5001/api/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error){
      console.error("Error deleting product", error);
    }
  };

  //Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  //Ensure frontend is responsive and wraps around depending on screen size and is centered
  return (
    <Container >
      {error && <Typography variant="body2" color="error">{error}</Typography>}
      <Grid container spacing ={4} justifyContent="center">
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <img src={product.imageUrl} alt={product.name} style={{width: '100%'}} />
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="h6">${product.price}</Typography>
                <IconButton onClick={()=> handleDelete(product.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;

