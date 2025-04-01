import React from 'react'
import Box from '@mui/material/Box';


function Header() {
  return (

    <Box
      sx={{
        width: "100%",
        height: 50,
        borderRadius: 1,
        bgcolor: 'primary.main',
        '&:hover': {
          bgcolor: 'primary.dark',
        },
        display: 'flex', 
        alignItems: 'center',
        paddingLeft: '1rem', 
        color: `primary.text`
      }}
    >
        Task Manager
    </Box>

  )
}

export default Header