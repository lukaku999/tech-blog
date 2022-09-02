import React, {useState, useEffect} from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getRecentPosts, getSimilarPosts } from '../services'


const PostWidget = ({categories, slug}) => {
  const [relatedPosts, setRelatedPosts] = useState([])
  useEffect(() => {
    if(slug) {
      getSimilarPosts(categories, slug).then(result => setRelatedPosts(result))
    }
    else {
      getRecentPosts(categories, slug).then(result => setRelatedPosts(result))
    }
  }, [slug])

  console.log(relatedPosts)
  
  return (
    <div className='bg-white
                      shadow-lg
                      rounded-lg
                      p-8
                      mb-8'>
        <h3 className='text-xl
                      mb-8
                      font-semibold
                      border-b
                      pb-4'>
            {slug ? 'Related Posts': 'Recent Posts'}
        </h3>
        {relatedPosts.map(post => (
          <Link href={`/post/${post.slug}`}> 
            <div className="flex 
                            items-center 
                            w-full 
                            mb-4 
                            duration-700
                            rounded-lg
                            cursor-pointer 
                            hover:bg-pink-700/10
                            hover:translate-y-1
                            xl:p-4">
              <div className="w-16 flex-none">
                  <img src={post.featuredimage.url} 
                       alt={post.title}
                       style = {{height: "60px", width: "60px"}}
                       className='align-middle rounded-full'
                  />
              </div>
              <div className="flex-grow ml-4">
                  <p className='text-gray-500 font-xs'>
                    {moment(post.createdAt).format('DD MMM YYYY')}
                  </p>
                  
                        
                  <p className = "text-md">
                    {post.title}
                  </p>  
                           
                  
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default PostWidget