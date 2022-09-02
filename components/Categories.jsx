import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { getCategories } from '../services'
import {useStateContext} from '../context.js/contextProvider'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const {activeCategory, setActiveCategory} = useStateContext()

  useEffect(() => {
    getCategories().then(newCategories => setCategories(newCategories))
  }, [])
  

  return (
    <div className='bg-white
                      shadow-lg
                      rounded-lg
                      p-8
                      mb-8
                      pb-12'>
        <h3 className='text-xl
                      mb-8
                      font-semibold
                      border-b
                      pb-4'>
            Categories
        </h3>
        {categories.map(category => (
          <Link href={`/category/${category.slug}`} 
                > 
            <span className=  {`transition 
                              duration-500 
                              transform 
                              hover:translate-y-1 
                              hover:bg-pink-700/10
                              cursor-pointer
                              block 
                              p-3
                              capitalize 
                              mb-3
                              ${activeCategory === category.slug && 'bg-pink-700/30'}`}>
                    {category.name}
            </span>
          </Link>
        ))}
    </div>
  )
}

export default Categories