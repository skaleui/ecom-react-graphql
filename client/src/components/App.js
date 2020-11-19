import React, { Component } from 'react';
import { Container, Box, Heading, Card, Image, Text, SearchField, Icon } from 'gestalt';
import { Link } from 'react-router-dom';
import { API_URL, brandsQuery } from '../utils';

import Loader from './Loader';
import './App.css';

import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl = API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class App extends Component {

  state = {
    brands: [],
    searchTerm: '',
    loadingBrands: true
  }


  async componentDidMount(){
    try {
    const response = await strapi.request('POST', '/graphql', {
      data: {
        query: brandsQuery
      }
    });
    console.log(response);
    this.setState({brands: response.data.brands, loadingBrands: false });
    } catch (err){
      console.error(err);
      this.setState({ loadingBrands: false });
    }
  }

  handleChange = ({value}) => {
    this.setState({ searchTerm: value }, ()=> this.searchBrands());
  };

  // filteredBrands = ({searchTerm, brands}) => {
  //   return brands.filter(brand => {
  //     return brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     brand.description.toLowerCase().includes(searchTerm.toLowerCase());
  //   })
  // }

  searchBrands = async () => {
    const response = await strapi.request('POST', '/graphql', {
      data: {
        query: `query {
          brands(where:{
            name_contains:"${this.state.searchTerm}"
          }) {
            _id
            name
            description
            createdAt
            image{
              name,
              url
            }
          }
        }`        
      }

    });

    console.log(this.state.searchTerm, response, response.data.brands);
    this.setState({
      brands: response.data.brands,
      loadingBrands: false
    });

  }

  render() {

    console.log(process.env);

    const { searchTerm, loadingBrands, brands } = this.state;

    return (
      <Container>
        {/*Search Field */}
        <Box display="flex" justifyContent="center" marginTop={4}>
          <SearchField 
            id="searchField"
            accessibilityLabel="Brands Search Field"
            onChange={this.handleChange}
            value={searchTerm}
            placeholder="Search Brand"
          />
          <Box margin={3}>
            <Icon 
              icon="filter"
              color={searchTerm ? 'orange' : 'gray'}
              size={20}
              accessibilityLabel="Filter"
            />
          </Box>
        </Box>
        { /* Brands section */}
        <Box
          display="flex"
          justifyContent="center"
          marginBottom={2}
        >
          {/*Brands Header*/}
          <Heading color="midnight" size="md">
            Brew Brands
          </Heading>
        </Box>
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: '#d6c8ec'
            }
          }} 
          wrap display="flex" justifyContent="around">
          {brands.map(brand => (
            <Box padding={4} margin={2} width={200}
              key={brand._id}
            >
              <Card 
                image={
                  <Box height={200} width={200}>
                    <Image
                      fit="cover"
                      alt="Brand"
                      naturalHeight={1}
                      naturalWidth={1}
                      src={`${apiUrl}${brand.image[0].url}`}
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
                  <Text bold size="xl">{brand.name}</Text>
                  <Text>{brand.description}</Text>
                  <Text bold size="xl">
                    <Link to={`/${brand._id}`}>See Brews</Link>
                  </Text>
                </Box>
              </Card>             
            </Box>

          ))}
        </Box>
        <Loader show={loadingBrands}/> 
      </Container>
    );
  }
}

export default App;
