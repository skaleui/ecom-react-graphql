import React from 'react';
import { Container, Box, Button, Heading, Text, TextField, Modal, Spinner } from 'gestalt';
import { Elements, StripeProvider, CardElement, injectStripe } from 'react-stripe-elements';
import { setToken } from '../utils';
import ToastMessage from './ToastMessage';
import { getCart, calculatePrice, clearCart, calculateAmount } from '../utils';
import { withRouter } from 'react-router-dom';

import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);


class _CheckoutForm extends React.Component {

  state = {
    cartItems: [],
    address: '',
    postalCode: '',
    city: '',
    confirmationEmailAddress: '',
    toast: false,
    toastMessage: '',
    orderProcessing: false,
    modal: false
  }

  componentDidMount() {
    this.setState({ cartItems: getCart() })
  }

  handleChange = ({event, value}) => {
    event.persist();
    this.setState({[event.target.name]: value});
  }

  handleConfirmOrder = async (event) => {
    event.preventDefault();
    
    if(this.isFormEmpty(this.state)) {
      console.log(this.state);
      this.showToast('fill in all the fields');
      return;
    }

    this.setState({ modal: true });

  }

  handleSubmitOrder = async () => {
    const { cartItems, city, address, postalCode, confirmationEmailAddress } = this.state;
    const amount = calculateAmount(cartItems);

      //create order with steapi sdk (make request to backend)
      this.setState({ orderProcessing: true });
    let token;
    try {
    
      const response = await this.props.stripe.createToken();
      console.log(response);
      console.log(response.token);
      token = response.token.id;
      await strapi.createEntry('orders', {
        amount,
        brews: cartItems,
        city,
        postalCode,
        address,
        token
      });
   
      await strapi.request('POST', '/email', {
        data: {
          to: confirmationEmailAddress,
          subject: `Order confirmation from Brews ${new Date(Date.now())}`,
          text: 'Your order has been processed and brews are on the way',
          html: "<bold>Expect your order to arrive in 2-3 days</bold>"
        }

      });

      //Set orderProcessing = false - set model false
      this.setState({ orderProcessing: false, modal: false });
      //clean user cart of brews
      clearCart();
      // show success
      this.showToast('Your order has been successfully submitted!', true);



    } catch (err) {
      //set order process to false
      this.setState({ orderProcessing: false, modal: false });
      //show error toast
      this.showToast(err.message, false);
    }

  }

   // Check for empty fields 
   isFormEmpty = ({address, postalCode, city, confirmationEmailAddress}) => {
    return !address || !postalCode || !city || !confirmationEmailAddress;
  }

  showToast = (toastMessage, redirect= false) => {
    this.setState({ toast: true, toastMessage });
    setTimeout(() => this.setState({toast: false, toastMessage: ''},
    //if true, passed to 'redirect' argument, redirect to home
      () => redirect && this.props.history.push('/')
    ), 5000);
  }

  closeModal = () => {
    this.setState({ modal: false});
  }


  render() {

    const { toast, toastMessage, cartItems, modal, orderProcessing } = this.state;
 
    return (
      <Container>
        <Box
          color="darkWash"
          margin={4}
          padding={4}
          shape="rounded"
          display="flex"
          justifyContent="center"
          alignItems="center"
          direction="column"
          >
            { /*Checkout form */ }
            <Heading color="midnight"> Checkout </Heading>
            { cartItems.length > 0 ? <React.Fragment>
            {/* User Cart */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              direction="column"
              margin={2}
              marginBottom={5}
            >
              <Text color="darkGray" italic>{cartItems.length} for Checkout</Text>
              <Box padding={1}>
                {cartItems.map(  item => (
                  <Box key={item._id} padding={1}>
                    <Text color="midnight">
                      {item.name} * {item.quantity} - {item.quantity * item.price}
                    </Text>
                  </Box>
                ))}
              </Box>
              <Text marginBottom={2} bold>Total Amount: {calculatePrice(cartItems)} </Text>
            </Box>

            <form 
              style={{
                display: 'inlineBlock',
                textAlign: 'center',
                maxWidth: 450,
              }}
              onSubmit={this.handleConfirmOrder}
            >


             { /* Shipping address inputs */}
              <TextField
                id="address"
                type="text"
                name="address"
                placeholder="Shipping Address"
                onChange={this.handleChange}
              />              
              <TextField
                id="postalCode"
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                onChange={this.handleChange}
              />
              <TextField
                id="city"
                type="text"
                name="city"
                placeholder="City of Residence"
                onChange={this.handleChange}
              />
              {/*Confirmation email address */}
               <TextField
                id="confirmationEmailAddress"
                type="email"
                name="confirmationEmailAddress"
                placeholder="confirmation Email Address"
                onChange={this.handleChange}
              />
              {/* credit card Element  */}
              <CardElement id="stripe__input" onReady={input => input.focus()}
              />

              <button id="stripe__button" type="submit">Submit</button>             
            </form>
            </React.Fragment> : (
              // Default text if no items in the cart
              <Box color="darkWash" shape="rounded" padding={4}>
                <Heading align="center" color="watermelon" size="xs">Your cart is empty!</Heading>
                <Text align="center" italic color="green">Add some items to your cart</Text>
              </Box>
            )}
        </Box>
        {/* Confirmation Modal  */}
        {modal && (
          <ConfirmationModal 
          orderProcessing={orderProcessing} 
          cartItems={cartItems} 
          closeModal={this.closeModal} 
          handleSubmitOrder={this.handleSubmitOrder}
          />
        )}
        <ToastMessage show={toast} message={toastMessage} />
      </Container>
    )
  }
}

const ConfirmationModal = ({orderProcessing, cartItems, closeModal, handleSubmitOrder}) => (
  <Modal
    accessibilityCloseLabel="close"
    accessibilityModalLabel="Confirm your order"
    heading="Confirm your Order"
    onDismiss={closeModal}
    footer={
      <Box display="flex" marginRight={-1} marginLeft={-1} justifyContent="center">
        <Box padding={1}>
          <Button
            size="lg"
            color="red"
            text="Submit"
            disabled={orderProcessing}
            onClick={handleSubmitOrder}
          />
        </Box>
        <Box padding={1}>
          <Button
            size="lg"
            text="Cancel"
            disabled={orderProcessing}
            onClick={closeModal}
          />
        </Box>
      </Box>
    }
    role="alertdialog"
    size="sm"
  >
    {/* Order Summary  */}
    {!orderProcessing && (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        direction="column"
        padding={1}
        color="lightWash"
      >
        <Box padding={1}>
            {cartItems.map(  item => (
              <Box key={item._id} padding={1}>
                <Text size="lg" color="red">
                  {item.name} * {item.quantity} - {item.quantity * item.price}
                </Text>
              </Box>
            ))}
            <Box paddingY={2}>
              <Text size="lg" bold>
                Total: {calculatePrice(cartItems)}
              </Text> 
            </Box>
          </Box>
      </Box>
    )}

    {/* Order Processing Spinner */}
    <Spinner show={orderProcessing} accessibilityLabel="Order Processing Spinner" />
    {orderProcessing && <Text align="center" italic>Submitting Order....</Text>}
  </Modal>
);

const CheckoutForm = withRouter(injectStripe(_CheckoutForm));

const Checkout = () => (
  <StripeProvider apiKey="pk_test_UZOjxJxuDtWGgmDO7JxEdFLI00cY5tBpfn">
    <Elements>
      <CheckoutForm />
    </Elements>

  </StripeProvider>

)

export default Checkout;