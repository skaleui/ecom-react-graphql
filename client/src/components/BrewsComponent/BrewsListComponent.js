import  React from 'react';
import { Container, Column, Box,  Card, Image, Text } from 'gestalt';

const BrewsListComponent = (props) => {

  console.log('BrewsListComponent', props);
  
  const arrayToMatrix = (array, columns) => {
    console.log('array', array.length);
    return Array(Math.ceil(array.length / columns)).fill('').reduce((acc, cur, index) => {
    return [...acc, [...array].splice(index * columns, columns)]
  }, [])}

  const createRows = () => {

  let matrix = props.brews && arrayToMatrix(props.brews, 3);

    return (
      matrix.map((row, index) => (
 
        <Box
          display="flex"
          alignItems="start"
          direction="row"
          justifyContent="start"
          width={800}
          height={500}
          wrap={true}
          key={index}
        >     
          {row.map((col, cid)=> (
            <Column span={4} marginRight={2} key={cid}
            dangerouslySetInlineStyle={{
              __style: { 
                "margin-right": '5px'
              }}}
        >
              <Box 
                display="inlineBlock"
                padding={4} 
                margin={2}
                fit={true}
                wrap={true}
                justifyContent="center" 
                alignItems="center" 
                direction="column"
                shape="rounded"
                overflow="scroll"
                dangerouslySetInlineStyle={{
                  __style: { 
                    border: '1px solid blue',
                    width: 'max-content'
                  }}}
                key={col._id}
              >
                <Card 
                  image={
                    <Box height={200} width={200}>
                      <Image
                        fit="contain"
                        alt="Brand"
                        naturalHeight={1}
                        naturalWidth={1}
                        src={`${props.apiUrl}${col.image.url}`}
                      />
                    </Box>
                  }
                >
                  <Box
                    display="flex"
                    direction="column"
                    wrap={true}
                    fit={true}
                  >
                    <Text bold size="xl">{col.name}</Text>
                    <Text>{col.description}</Text>
                  </Box>
                </Card>             
              </Box>
            </Column> 
          ))}
        </Box> 
      ))
    )
    
  };

  
  return (
  
    <Box
      flex="grow"
      display="flex" 
      justifyContent="start" 
      alignItems="start"
      direction="column"
      dangerouslySetInlineStyle={{
        __style: {
          backgroundColor: '#d6c8ec'
        }
      }} 
    >
      {createRows()}
    </Box>
  );
}

export default BrewsListComponent;
