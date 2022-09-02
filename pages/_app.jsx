import React, {useEffect, useState} from 'react'
import {Layout} from '../components'

import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'
import {ContextProvider} from '../context.js/contextProvider'



function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
        <Layout>
            
            <Component {...pageProps} />
        </Layout>  
    </ContextProvider>
      
  ) 
}

export default MyApp
