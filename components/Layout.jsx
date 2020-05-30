import Head from 'next/head'
import Navbar from './Navbar'
import { Container } from 'semantic-ui-react'
import styles from './Layout.module.css'
const Layout = ({children}) => {
  return (
    <>
     <Head>
       <title>next app</title>
       </Head> 
    <Navbar/>
    <Container className={styles.main}>
    {children}
    </Container>
    </>
  )
}

export default Layout
