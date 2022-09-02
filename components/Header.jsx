import React, {useEffect, useState} from 'react'
import Link from 'next/link'

import { getCategories } from '../services'
import { useRouter } from 'next/router';

import {useStateContext} from '../context.js/contextProvider'




const Header = () => {
   const [categories, setCategories] = useState([])
   const router = useRouter();
   //const [activeCategory, setActiveCategory] = useState(null)
   const {activeCategory, setActiveCategory} = useStateContext()

   useEffect(() => {
    getCategories().then(newCategories => setCategories(newCategories.filter(category => category.navigation)))
    }, [])

    useEffect(() => {
      
      const isCategory = window.location.pathname.split('/')[1] === 'category'
      
      if(isCategory) {
        setActiveCategory( window.location.pathname.split('/')[2])
      }
      else {
        setActiveCategory(null)
      }
    }, [router])
    
  return (
    <div className='container 
                    mx-auto
                    px-10
                    mb-8
                    py-8'>
            <div className="border-b w-full inline-block border-pink-400 py-8">
                <div className="md:float-left block">
                    <Link href="/">
                        <span className="cursor-pointer font-bold text-4xl text-pink-600">
                            Tech Blog
                        </span>
                    </Link>                   
                </div>
                {/*so the display:content allows means that the div is basically a container and will ignore it meaning that the category links is sibling of the above div */}
                <div className="hidden md:float-left md:contents">
                    {categories.map(category => (
                        <Link key = {category.slug} href = {`/category/${category.slug}`}>
                            <span className={`md:float-right 
                                             mt-2 
                                             align-middle 
                                             
                                             ml-4
                                             uppercase 
                                             font-semibold 
                                             cursor-pointer
                                             ${activeCategory === category.slug ? 'text-pink-600' : 'text-pink-300'}`
                                            }>
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
    </div>
  )
}

export default Header