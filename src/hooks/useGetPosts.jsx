import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from '../services/postsServices'

// A custom hook to manage calling the getAllPosts calling 
// With TanStack Query:
// You don’t manually call getPosts
// You don’t pass it as props
// You invalidate or refetch via the query cache

// Now this hook gives many states: { data, isLoading, isError, refetch}
// Much cleaner. No prop drilling. No duplicated logic.

export default function useGetPosts() {

    const queryOptions = useQuery(
        { 
        queryKey: ['posts'], 
        queryFn: getAllPosts ,
        select : data => data?.data.posts,
        gcTime: 5 * 60 * 1000,       // 5 minutes (formerly cacheTime)
        staleTime: 5 * 1000,        // 5 seconds
        keepPreviousData: true,      // smooth UI when refetching
        refetchOnWindowFocus: true,  // refresh when user comes back
        refetchOnReconnect: true,    // refresh if internet reconnects
        }
    )

    return queryOptions
}

