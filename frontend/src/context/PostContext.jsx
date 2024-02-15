/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const PostContext = createContext()

const PostPovider = ({children}) => {
    const [posts, setPosts] = useState([])

    return (
        <PostContext.Provider value={{posts, setPosts}}>
        {children}
        </PostContext.Provider>
    )
}

export default PostPovider
