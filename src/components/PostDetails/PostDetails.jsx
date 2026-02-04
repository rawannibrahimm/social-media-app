import React, { useEffect, useState } from 'react'
// import { Modal, ModalContent, ModalHeader, ModalBody,} from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody,ModalFooter,Button,RadioGroup, Radio, Divider,} from "@heroui/react"
import {Card} from "@heroui/react";
import PostCardHeader from '../PostCard/PostCardHeader';
import PostCardBody from '../PostCard/PostCardBody';
import PostCardActions from '../PostCard/PostCardActions';
import PostCardFooter from '../PostCard/PostCardFooter';
import { getPostDetails } from '../../services/postsServices';
import PostSkeleton from '../PostSkeleton/PostSkeleton';
import { UserContext } from '../../Context/UserContext';
import useGetPostComments from '../../hooks/useGetPostComments';

export default function PostDetails({isOpen, onOpenChange, postId}) {
  const [loading , setLoading] = useState(false)
  const [post , setPost] = useState("")
  const {
  data: postComments = [],isFetching: commentsLoading,} = useGetPostComments(postId, {enabled: isOpen, });  
  async function getPost() {
    setLoading(true)
    try {
      const {data} = await getPostDetails(postId);
      setPost(data?.post)
    } 
    catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  } 

  useEffect(() => {
    if (isOpen){
      getPost()
    }
  }, [isOpen]);

    const { body, image, createdAt, user = {}} = post;
    const { _id: userId, name: userName, photo } = user;

    return (
        <>
          <div className="flex flex-col gap-2">
            {/* <Button onPress={onOpen}>Open Modal</Button> */}
            <Modal placement='center' isOpen={isOpen} scrollBehavior="inside" onOpenChange={onOpenChange}>
              
            <ModalContent className='max-w-2xl mx-auto'>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                {loading && <ModalBody> <PostSkeleton/> </ModalBody> }
                {!loading && post && (
                  <ModalBody >
                    <Card className="py-4 overflow-visible">
                      <PostCardHeader postId={postId} userId={userId} photo={photo} createdAt={createdAt} userName={userName} />
                      <PostCardBody body={body} image={image} postInfo />
                      <PostCardActions comments={postComments} />
                      <PostCardFooter commentsLoading={commentsLoading} userId={userId} comments={postComments} postId={postId} postInfo />
                    </Card>
                  </ModalBody>
                )}
              </ModalContent>
              
            </Modal>
          </div>
        </>
    )
}
