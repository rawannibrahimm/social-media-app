import {Card} from "@heroui/react";
import PostCardHeader from './PostCardHeader';
import PostCardBody from './PostCardBody';
import PostCardActions from './PostCardActions';
import PostCardFooter from './PostCardFooter';
import { UserContext } from '../../Context/UserContext';
import useGetPostComments from '../../hooks/useGetPostComments';


export default function PostCard({post}) {
    /**
    Before getPosts() lived in NewsFeed
    Passed → PostCard , CreatePostCard
    Passed → PostCardHeader (and other components the PostCard renders that needed it)
    Called after delete / edit
    Huge suffering from: Tight coupling, Prop drilling, Hard to scale
    No getPosts passed anymore
    Replacing getPosts() with invalidateQueries in the components needed
    **/
    const { _id: postId, body, image, createdAt, user = {}} = post;
    const { _id: userId, name: userName, photo } = user;
    
    const { data: postComments = []} = useGetPostComments(postId);

    
    return (
        <>
            <Card className="py-4 w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
                {/* sending the body and image to header only to be passed by it then to the createPostModal to update a post */}
                <PostCardHeader userId={userId} postId={postId} photo={photo} createdAt={createdAt} userName={userName} body={body} image={image} />
                {/* PostCardBody: The post content (text&image) */}
                <PostCardBody body={body} image={image} />
                {/* PostCardActions: The post like comment share save */}
                <PostCardActions comments={postComments} />
                {/* PostCardFooter: The first comment on the post and adding a new one and view all comments */}
                <PostCardFooter userId={userId} comments={postComments} postId={postId} />
            </Card>
        </> 
    )
}
