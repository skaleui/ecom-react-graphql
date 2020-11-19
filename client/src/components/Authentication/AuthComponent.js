import React from 'react';

import { Box, Text } from 'gestalt';
import { NavLink } from 'react-router-dom';
import TitleComponent from '../TitleComponent';

const AuthComponent = (props)=> { 
  
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="around"
      shape="rounded"
      dangerouslySetInlineStyle={{
        __style: { border: '2px solid red', backgroundColor: 'lightBlue'},  }}
    >

    <NavLink activeClassName="active" to={props.leftLink}>
      <Text size="xl" color="red">{props.leftLinkText}</Text>
    </NavLink>

    <TitleComponent shopTitle={props.shopTitle} />

      <NavLink 
        activeClassName="active" 
        to={props.rightLink}
        onClick={props.rightLinkHandler}
      >
          <Text size="xl" color="white">{props.rightLinkText}, {props.username}</Text>
      </NavLink>

    </Box>
  );
}

export default AuthComponent;

