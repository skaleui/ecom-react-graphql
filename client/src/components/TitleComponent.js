import React from 'react';
import { Box, Heading, Image } from 'gestalt';
import { NavLink } from 'react-router-dom';

const TitleComponent = (props) => {
  return (
    <NavLink activeClassName="active" exact to="/">
      <Box display="flex" direction="row" alignItems="center">
        <Box width={50} height={50} margin={2} 
          dangerouslySetInlineStyle={{
            __style: { border: '2px solid green'},
          }}
        >
          <Image
            alt="My Own Shop Logo"
            src="./icons/logo.svg"
            naturalHeight={1}
            naturalWidth={1}
          />
        </Box>
        {/* Title  */}
        <div className="main-title">
          <Heading size="xs" color="orange">{props.shopTitle}</Heading>
        </div>
      </Box>
    </NavLink>
  );

}

export default TitleComponent;