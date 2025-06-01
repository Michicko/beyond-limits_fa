import { Box } from '@chakra-ui/react'
import React from 'react'

function RequiredLabel() {
  return (
    <Box as={'span'} fontSize={'xl'} fontWeight={'semibold'} color={'red.500'}>*</Box>
  )
}

export default RequiredLabel