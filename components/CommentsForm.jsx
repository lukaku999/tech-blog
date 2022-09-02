import React, { useEffect, useRef, useState } from 'react'
import {submitComment} from '../services'

const CommentsForm = ({slug}) => {
  const [error, setError] = useState({error: false, type: ''})
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl = useRef()

  const inputStyle = "p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name')
    emailEl.current.value = window.localStorage.getItem('email')
  }, [])
  

  const handleCommentSubmission = () => {

    const {value: comment} = commentEl.current
    const {value: name} = nameEl.current
    const {value: email} = emailEl.current
    const {checked: storeData} = storeDataEl.current
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    setError(false)
    
    if (!comment || !name || !email) {
      setError({error: true, type: 'empty'})
      return
    }
    if(!email.match(regEx)) {
      setError({error: true, type: 'email'})
      return
    }

    if(storeData) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    } 
    else {
      window.localStorage.removeItem('name', name)
      window.localStorage.removeItem('email', email)
    } 

    const commentObj = {name, email, comment, slug}
    submitComment(commentObj)
    .then(res => {
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    })
    
  }

  return (
    <div className="bg-white
                    shadow-lg
                    rounded-lg
                    p-8
                    pb-12
                    mb-8">
       <h3 className="text-xl mb-8 font-semibold border-b pb-4">Comment</h3>
       <div className="grid grid-cols-1 gap-4 mb-4">
          <textarea ref = {commentEl} 
                    className={inputStyle}
                    placeholder = "Comment"
                    name="comment"
          />

       </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <input type="text"
                 ref = {nameEl}
                 className = {`${inputStyle} p-2 px-4`}
                 placeholder = "Name"
                 name= "name" 
          />

          <input type="text"
                 ref = {emailEl}
                 className = {`${inputStyle} p-2 px-4`}
                 placeholder = "Email"
                 name= "email" 
          />
       </div>
       <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <input type="checkbox" 
                  id = "storeData"
                  ref={storeDataEl}
                  name="storeData"
                  className='inline'
                  value="true"
            />
            <label className="text-gray-500 cursor-pointer ml-2">Save my e-mail and name for next time</label>
          </div>
          
       </div>
       {error.error && error.type === 'empty' && <p className="text-xs text-red-500">All fields are required</p>}
       {error.error && error.type === 'email' && <p className="text-xs text-red-500">Email is incorrect</p>}
       <div className="mt-8">
          <button type="button"
                  onClick={handleCommentSubmission}
                  className="transition duration-500 ease inline-block hover:bg-indigo-900 bg-pink-600 text-lg rounded-full text-white px-8 py-2 cursor-pointer">
              Submit
          </button>
          {showSuccessMessage && 
          <span className='text-xl float-right font-semibold mt-3 text-green-500'>Comment has been successfully submitted</span>}
       </div>
    </div>
  )
}

export default CommentsForm