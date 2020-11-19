import  React from 'react';
import { Box,  Card, Image, Text } from 'gestalt';
import { Link } from 'react-router-dom';

const ListComponent = (props) => {

  console.log('ListComponent', props);

  return (
  
  <Box
  flex="grow"
  dangerouslySetInlineStyle={{
    __style: {
      backgroundColor: '#d6c8ec'
    }
  }} 
  display="flex" justifyContent="around" alignItems="start">
  {props.data && props.data.map(listItem => (
    
    <Box padding={4} margin={2} width={200} borderSize={"sm"} justifyContent="center" alignItems="center" direction="column"
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
            <Link to={`/${listItem._id}`}>{props.linkText}</Link>
          </Text>
        </Box>
      </Card>             
    </Box>
    
  ))}
  </Box>
);
}



export default ListComponent;
