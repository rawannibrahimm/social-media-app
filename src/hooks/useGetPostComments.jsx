import { useQuery } from '@tanstack/react-query'
import { getPostComments } from '../services/commentsServices';

export default function useGetPostComments(postId, options = {}) {

    const queryOptions = useQuery(
        { 
        queryKey: ['postComments', postId], 
        queryFn: ()=> getPostComments(postId) ,
         // Sort from last to first here
        select: data => {
            const comments = data?.data?.comments || [];
            return [...comments]; 
        },
        keepPreviousData: true,
        enabled: !!postId && (options.enabled ?? true),      
        }
    )

    return queryOptions
}

