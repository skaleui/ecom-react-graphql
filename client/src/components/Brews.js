import React from 'react';

import Strapi from 'strapi-sdk-javascript/build/main';
import { Box, Heading, Text, Image, Card, Button, Mask, IconButton} from 'gestalt';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils'; 

import { calculatePrice, getCart, setCart } from '../utils';

const apiUrl = API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class Brews extends React.Component {

  state = {
    brews: [],
    brand: '',
    cartItems: []
  }

  async componentDidMount() {
    
    try {
    const response = await strapi.request('POST', '/graphql', {
      data: {
        query: `query {
          brand(id: "${this.props.match.params.id}") {
           _id
            name
            brews {
              _id
              name
              description
              image {
                url
              }
              price
            }
          }
        }`
      }
    });
    this.setState({
      brews: response.data.brand.brews,
      brand: response.data.brand.name,
      cartItems: getCart()
    });
  } catch(err) {
    console.log(err);
  }
  }

  addTocart = (brew) => {
    const alreadyInCart = this.state.cartItems.findIndex(item => item._id === brew._id);

    if(alreadyInCart === -1) {
      const updatedItems = this.state.cartItems.concat({
        ...brew,
        quantity: 1
      });
      this.setState({ cartItems: updatedItems }, () => setCart(updatedItems));
    } else {
      const updatedItems = [...this.state.cartItems];
      updatedItems[alreadyInCart].quantity += 1;
      this.setState({ cartItems: updatedItems }, () => setCart(updatedItems));
    }
  }

  deleteItemFromCart = itemTobeDeleted => {
    const filteredItems = this.state.cartItems.filter(item => item._id !== itemTobeDeleted);
    this.setState({ cartItems: filteredItems }, ()=> setCart(filteredItems));
  }

  render () {
    const { brand, brews, cartItems } = this.state;

    return (
      <Box
        marginTop={4}
        display="flex"
        justifyContent="center"
        alignItems="start"
        dangerouslySetInlineStyle={{
          __style: {
            flexWrap: 'wrap-reverse'
          }
        }}
      >
        <Box
          display="flex"
          direction="column"
          alignItems="center"
        >
          {/* Brand heading */ }
          <Box margin={2}>
            <Heading color="orchid">
              {brand}
            </Heading>
            {/* Brews */ }
            <Box
              dangerouslySetInlineStyle={{
                __style: {
                  backgroundColor: '#bdcdd9'
                }
              }}
              wrap
              shape="rounded"
              display="flex"
              justifyContent="center"
              padding={4}
            >
              {brews.map(brew => (
                  <Box padding={4} margin={2} width={210}
                  key={brew._id}
                >
                  <Card 
                    image={
                      <Box height={200} width={200}>
                        <Image
                          fit="cover"
                          alt="Brew"
                          naturalHeight={1}
                          naturalWidth={1}
                          src={`${apiUrl}${brew.image.url}`}
                        />
                      </Box>
                    }
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      direction="column"
                    >
                      <Box marginBottom={2}>
                        <Text bold size="xl">{brew.name}</Text>
                      </Box>
                      <Text>{brew.description}</Text>
                      <Text color="orchid">${brew.price}</Text>                      
                      <Box marginTop={2}>
                        <Text bold size="xl">
                          <Button onClick={() => this.addTocart(brew)} color="blue" text="Add to Cart" />
                        </Text>
                      </Box>
                    </Box>
                  </Card>             
                </Box>

              ))}

            </Box>
          </Box>

        </Box>
        {/* User Cart */}
        <Box alignSelf="end" marginTop={2} marginLeft={8}>
          <Mask shape="rounded" wash>
            <Box display="flex" direction="column" alignItems="center" padding={2}>
              {/* User cart heading */}
              <Heading align="center" size="sm">Your Cart</Heading>
              <Text color="gray" italic>
                {cartItems.length} items selected 
              </Text>
              {/*cart items*/}
              {cartItems.map(item => (
                <Box key={item._id} display="flex" alignItems="center">
                  <Text>
                    {item.name} * {item.quantity} - ${(item.quantity * item.price).toFixed(2)}
                  </Text>
                  <IconButton 
                    accessibilityLabel="Delete Item"
                    icon="cancel"
                    size="sm"
                    iconColor="red"
                    onClick={ ()=> this.deleteItemFromCart(item._id)}
                  />
                </Box>  
              ))}
              <Box display="flex" alignItems="center" justifyContent="center" direction="column">
                <Box margin={2}>
                  {cartItems.length === 0 && (
                    <Text color="red">Please select some items</Text>
                  )}
                </Box>
                <Text size="lg">Total: {calculatePrice(cartItems)}</Text>
                <Text>
                  <Link to="/checkout">Checkout</Link>
                </Text>
              </Box>
            </Box>
          </Mask>

        </Box>
      </Box>
    );
  }
}

export default Brews;
