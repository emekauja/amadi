import React from 'react'
import { Box } from '@chakra-ui/core';
import { type } from 'os';


export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
  children,
  variant?: WrapperVariant
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant='regular' }) => {
   return (
    <Box 
      mt={8} 
      mx="auto" 
      maxW={variant === 'regular' ? "800px" : "400px"} 
      w="100%"
    >
      {children}
    </Box>
   );
  }



//for component snippet
/*   import React from 'react'
import { Box } from '@chakra-ui/core';
interface WrapperProps {}


const Wrapper: React.FC<WrapperProps> = ({}) => {
   return (

   );
  }


  export default Wrapper; */
