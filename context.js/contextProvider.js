import React, {createContext, useContext, useState} from 'react'


const StateContext = createContext()

/*initial state for nav buttons. it is used to control which buttons popups should be open or closed*/
const initialState = {
    category: null
}

export const ContextProvider = ({children}) => {
    const [activeCategory, setActiveCategory] = useState(null)

    return (
        <StateContext.Provider value = {{activeCategory, setActiveCategory}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)