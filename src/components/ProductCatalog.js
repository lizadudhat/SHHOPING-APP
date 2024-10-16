import React, { useState } from 'react';
import { Card, Button, Container, Row, Col, Modal, ListGroup, Form } from 'react-bootstrap';
import Header from './Header';
import '../App.css';

const productsData = [
  {
    id: 1,
    name: 'Watches',
    price: 50,
    stock: 10,
    image: 'https://rukminim2.flixcart.com/image/750/900/kxz0pe80/watch/k/m/x/1-laxurius-looking-2022-rolex-lokmart-girls-original-imagaaxcdhxfpk7h.jpeg?q=20&crop=false',
    category: 'Watches',
  },
  {
    id: 2,
    name: ' Watches',
    price: 200,
    stock: 5,
    image: 'https://images.meesho.com/images/products/170735434/lmahm_512.jpg',
    category: 'Watches', 
  },
  {
    id: 3,
    name: ' clutcher',
    price: 100,
    stock: 0,
    image: 'https://m.media-amazon.com/images/I/71VjJ+4TeyL.jpg',
    category: 'Accessories', 
  },
  {
    id: 4,
    name: 'Watches',
    price: 1500,
    stock: 8,
    image: 'https://www.fastrack.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwa3e8805a/images/Fastrack/Catalog/FV60024QM01W_1.jpg?sw=600&sh=600',
    category: 'Watches', 
  },
  {
    id: 5,
    name: 'Cloth',
    price: 2500,
    stock: 2,
    image: 'https://idaho-o.com/wp-content/uploads/2024/06/image-11.png',
    category: 'Fashion', 
  },
  {
    id: 6,
    name: 'Cloth',
    price: 1000,
    stock: 5,
    image: 'https://www.beatitude.in/cdn/shop/articles/DSC_2173_720x_dec1d27e-c2a7-4ce7-8b21-654c0ca12e43_1024x.webp?v=1675162397',
    category: 'Fashion', 
  },
  {
    id: 7,
    name: ' clutcher',
    price: 320,
    stock: 30,
    image: 'https://images.meesho.com/images/products/123970242/oks78_512.webp',
    category: 'Accessories', 
  },
  {
    id: 8,
    name: ' Bands',
    price: 120,
    stock: 100,
    image: 'https://media.istockphoto.com/id/1390259144/photo/collection-of-trendy-silk-elastic-band-scrunchies-and-pearl-hair-clips-on-white-background.jpg?s=612x612&w=0&k=20&c=VHBFjE2wKKx5oXurIpUARHqjwEzJNI6O8BAkQGNNWYk=',
    category: 'Accessories', 
  },
  {
    id: 9,
    name: ' Cloth',
    price: 990,
    stock: 3,
    image: 'https://i.pinimg.com/236x/58/a0/7c/58a07cf6f0e703afbbf122285ae4bbee.jpg',
    category: 'Fashion', 
  },
];

const categories = [...new Set(productsData.map(product => product.category))]; 

function ProductCatalog() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); 

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  const filteredProducts = productsData.filter((product) => {
    const matchesPriceFilter = () => {
      if (priceFilter === 'under100') return product.price < 100;
      if (priceFilter === 'under500') return product.price >= 100 && product.price < 500;
      if (priceFilter === 'under2500') return product.price >= 500 && product.price < 2500;
      return true;
    };

    const matchesCategoryFilter = () => {
      return selectedCategory ? product.category === selectedCategory : true;
    };

    return matchesPriceFilter() && matchesCategoryFilter();
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'lowToHigh') {
      return a.price - b.price;
    } else if (sortOption === 'highToLow') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <Container>
      <Header /> 
      <h2>Product Catalog</h2>

      <Form.Group controlId="filterPrice">
        <Form.Label>Filter by Price</Form.Label>
        <Form.Control
          as="select"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="under100">Under $100</option>
          <option value="under500">Under $500</option>
          <option value="under2500">Under $2500</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="filterCategory">
        <Form.Label>Filter by Category</Form.Label>
        <Form.Control
          as="select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="sortProducts">
        <Form.Label>Sort by Price</Form.Label>
        <Form.Control
          as="select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Select</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </Form.Control>
      </Form.Group>

      <Row>
        {sortedProducts.map((product) => (
          <Col key={product.id} md={4}>
            <Card style={{ marginBottom: '20px' }}>
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Card.Text>Stock: {product.stock}</Card.Text>
                <Button
                  style={{ backgroundColor: "#020120" }}
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    
      <Modal show={showCart} onHide={handleCloseCart}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length > 0 ? (
            <ListGroup>
              {cart.map((item, index) => (
                <ListGroup.Item key={index}>
                  <strong>{item.name}</strong> - ${item.price}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "#020120" }} onClick={handleCloseCart}>
            Close
          </Button>
          <Button style={{ backgroundColor: "#020120" }} onClick={() => alert('Checkout functionality here!')}>
            Proceed to Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProductCatalog;
