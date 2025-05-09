import { Stack } from '@chakra-ui/react'
import React from 'react'

function FormContainer({children}: {children: React.ReactNode}) {
  return (
   <Stack maxW={'768px'} mb={'20px'} pb={'10px'}>
      {children}
   </Stack>
  )
}

export default FormContainer