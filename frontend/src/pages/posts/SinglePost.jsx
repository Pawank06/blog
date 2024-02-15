import { PostContext } from '@/context/PostContext';
import { getSinglePost } from '@/controllers/posts.controller';
import { Loader } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SinglePost = () => {
    const { id } = useParams();
    const { posts, setPosts } = useContext(PostContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSinglePost = async () => {
            try {
                const data = await getSinglePost(id);
                setPosts([data.post]); // Set the single post directly to the posts state
                setLoading(false);
            } catch (error) {
                console.error('Error fetching single post:', error);
                setLoading(false);
            }
        };

        fetchSinglePost();
    }, [id, setPosts]);

    return (
        <div>
            {loading ? (
                <Loader className="mr-2 h- w-6 animate-spin dark:text-white" />
            ) : (
                posts && posts.map((post) => (
                    <div key={post._id}>
                        <h1 className='p-4 text-center font-bold text-2xl mt-10'>{post.title}</h1>
                        <p className='p-4 mt-8'>{post.body}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default SinglePost;
