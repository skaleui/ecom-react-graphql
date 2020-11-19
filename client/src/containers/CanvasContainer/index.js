import React, { useState } from 'react';
import { Box } from 'gestalt';
import BrandsComponent from '../../components/BrandsComponent';
import BrewsComponent from '../../components/BrewsComponent';

export const CanvasContainer = () => {

  const [ selectedBrandId, setSelectedBrandId] = useState('');

  const handleSelectedBrand = (e) => {
    setSelectedBrandId(e); 
  };


  console.log('selectedBrandId', selectedBrandId);

  return (
    <Box
    display="flex"
    justifyContent="around"
    alignItems="stretch"
    shape="rounded"
    dangerouslySetInlineStyle={{
      __style: { border: '2px solid red', backgroundColor: 'lightGreen'},  }}
  >
    { !selectedBrandId ? 
      <BrandsComponent onChangeValue={handleSelectedBrand}/> :
      <BrewsComponent brandId={selectedBrandId}/>
    }
  </Box>
  )
}

export default CanvasContainer;