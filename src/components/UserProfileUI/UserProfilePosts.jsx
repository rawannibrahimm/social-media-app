import React, { useEffect } from 'react'
import PostSkeleton from '../PostSkeleton/PostSkeleton';
import CreatePostCard from '../CreatePostCard/CreatePostCard';
import PostCard from '../PostCard/PostCard';
import useGetUserPosts from '../../hooks/useGetUserPosts';

export default function UserProfilePosts({userData, setNoOfPosts }) {
    const { data: posts, isLoading } = useGetUserPosts(userData?._id);

    useEffect(() => {
        if (posts) {
            setNoOfPosts(posts.length);
        }
    }, [posts, setNoOfPosts]);

    return (
        <> 
        {isLoading ? [0,1,2,3].map((_, index) => <PostSkeleton key={index} />) : (
            <>
            <CreatePostCard />
            {posts && posts.map((post) => (
            <PostCard post={post} key={post._id}/>
        ))}
        </>
    )}
    </>
    )
}
