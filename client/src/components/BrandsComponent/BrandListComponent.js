import  React from 'react';
import { Box,  Card, Image, Text } from 'gestalt';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

const BrandListComponent = (props) => {

  console.log('BrandListComponent', props);
  
  return (
  
    <Box
      flex="grow"
      display="flex" 
      justifyContent="around" 
      alignItems="start"
      dangerouslySetInlineStyle={{
        __style: {
          backgroundColor: '#d6c8ec'
        }
      }} 
    >
      {props.brands && props.brands.map(listItem => (
      
        <Box 
          padding={4} 
          margin={2} 
          width={200} 
          justifyContent="center" 
          alignItems="center" 
          direction="column"
          key={listItem._id}
        >
          <Card 
            image={
              <Box height={100} width={200}>
                <Image
                  fit="contain"
                  alt="Brand"
                  naturalHeight={1}
                  naturalWidth={1}
                  src={`${props.apiUrl}${listItem.image[0].url}`}
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
              <Text bold size="xl">{listItem.name}</Text>
              <Text>{listItem.description}</Text>
              <Text bold size="xl">
                <Link to="/" onClick={() => props.onChangeValue(listItem) }>{props.linkText}</Link>
              </Text>
            </Box>
          </Card>             
        </Box>
      ))}
    </Box>
  );
}

export default BrandListComponent;
