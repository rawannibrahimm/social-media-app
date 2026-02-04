import { useQuery } from '@tanstack/react-query'
import { getUserPosts } from '../services/postsServices'

export default function useGetUserPosts(userId) {

    const queryOptions = useQuery(
        { 
        queryKey: ['userPosts', userId], 
        queryFn: ()=> getUserPosts(userId) ,
         // Sort from last to first here
        select: data => {
            const posts = data?.data?.posts || [];
            return [...posts].reverse(); 
        },
        gcTime: 5 * 60 * 1000,       // 5 minutes (formerly cacheTime)
        staleTime: 5 * 1000,        //  5 seconds
        keepPreviousData: true,      // smooth UI when refetching
        refetchOnWindowFocus: true,  // refresh when user comes back
        refetchOnReconnect: true,    // refresh if internet reconnects
        }
    )

    return queryOptions
}

