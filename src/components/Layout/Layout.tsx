import type { ReactNode } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import GlobalStyles from '@mui/material/GlobalStyles'

interface Props {
  children: ReactNode
}

export const isMobile = window.innerWidth <= 425

const Layout = ({ children }: Props) => {
  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: '#5f9ea0' } }} />
      <Container
        maxWidth="md"
        sx={{
          marginTop: isMobile ? 0 : 3,
          paddingTop: 1,
          backgroundColor: '#faf0e6',
          borderRadius: isMobile ? 0 : 2,
        }}
      >
        {children}
      </Container>
    </>
  )
}

export default Layout
