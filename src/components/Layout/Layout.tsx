import type { ReactNode } from 'react'
import type { ContainerProps } from '@mui/material'
import { styled } from '@mui/system'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import GlobalStyles from '@mui/material/GlobalStyles'

interface Props {
  children: ReactNode
}

type ContainerWithProps = ContainerProps & { isMobile: boolean }

export const isMobile = window.innerWidth <= 425

const CustomContainer = styled(Container, {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})<ContainerWithProps>(({ isMobile }) => ({
  marginTop: isMobile ? 0 : 24,
  paddingTop: 8,
  backgroundColor: '#faf0e6',
  borderRadius: isMobile ? 0 : 8,
}))

const Layout = ({ children }: Props) => {
  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: '#5f9ea0' } }} />
      <CustomContainer maxWidth="md" isMobile={isMobile}>
        {children}
      </CustomContainer>
    </>
  )
}

export default Layout
