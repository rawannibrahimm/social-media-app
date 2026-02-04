import React, {  Fragment, useContext, useState } from 'react'
import { CardFooter, User, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,} from "@heroui/react";
import { Divider} from "@heroui/react";
import { FiSend } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import PostDetails from '../PostDetails/PostDetails';
import { createComment, deleteComment } from '../../services/commentsServices';
import { UserContext } from '../../Context/UserContext';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useQueryClient } from '@tanstack/react-query';

// Note that in the original input there where a default values that i rendered comment content inside but
// big issue that defaultValue is only read once when the component first mounts.
// When React re-renders with new comments, the name updates (because it’s in label), 
// but the content stays stuck at the old value. 
// the defaultValue is a controlled component by react
// so I changed it to value

export default function PostCardFooter({comments,userId ,postId, postInfo }) {
    const queryClient = useQueryClient()
    const {userData} = useContext(UserContext)
    const [loading , setLoading] = useState(false)
    const [commentMsg, setcommentMsg] = useState("");
    
    async function deleteUserComment(commentId){
        try {
            const {data} = await deleteComment(commentId)
            console.log(data)
            queryClient.invalidateQueries({
                queryKey: ['postComments', postId],
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function sendComment(comment){
        setLoading(true)
        try {
            const {data} = await createComment(comment)
            console.log(data)
            queryClient.invalidateQueries({
                queryKey: ['postComments', postId],
            });
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
            setcommentMsg("")
        }
    }
    function addComment(e){
        setcommentMsg(e.target.value)
    }
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <div className="px-4">
                    <Divider className="my-3" />
                    <div className="add-comment flex gap-3 items-center">
                        <Input value={commentMsg} onChange={(e)=> addComment(e)} className="w-full mb-2 " placeholder="Write your comment" type="text"  />
                        <Button disabled={commentMsg? false : true} isLoading={loading} 
                        onPress={() => sendComment({
                            content: commentMsg,
                            post: postId})} 
                            isIconOnly aria-label="share" color="primary" variant='light' className='disabled:cursor-not-allowed'>
                            <FiSend className="text-2xl text-default-400 shrink-0 hover:text-blue-500 transition-colors" />
                        </Button>
                    </div>
                    {comments.length != 0 && 
                    <div className='flex flex-col items-center font-medium  gap-2 '>
                        {!postInfo && <>
                            <div className="flex items-start gap-2 w-full">
                            <User avatarProps={{
                            src: comments[0].commentCreator.photo.includes("/undefined")? "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid&w=740&q=80" : comments[0].commentCreator.photo,
                            }}
                            classNames={{base: "w-full", wrapper: "w-full", description: "w-full",name:"text-sm"}}
                            description={ <Input isReadOnly size='sm' label={comments[0].commentCreator.name} classNames={{label: "text-base text-bold",}} className="w-full" value={comments[0].content} />}
                            />
                            <div className="shrink-0">
                                <Dropdown className="min-w-7.5" placement="bottom-end">
                                    <DropdownTrigger>
                                        <HiOutlineDotsVertical aria-label="Comment actions" className="text-xl cursor-pointer" />
                                    </DropdownTrigger>
                                    {userId==userData._id && userData._id == comments[0].commentCreator._id ?
                                        <>
                                            <DropdownMenu aria-label="Static Actions on same user">
                                                <DropdownItem variant='flat' key="update_comment" color="primary">Edit comment</DropdownItem>
                                                <DropdownItem onClick={()=>deleteUserComment(comments[0]._id)} variant='flat' key="delete_comment" className="text-danger " color="danger">
                                                    Delete comment
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </> : 
                                        ""
                                    }
                                </Dropdown>
                            </div>
                            </div>
                            
                        </>}
                        {postInfo && (
                            <>
                            {comments?.map((comment) => (
                                <div key={comment._id} className="flex items-start gap-2 w-full">
                                    <div className="flex-1">
                                        <User // key={comment._id }
                                            avatarProps={{
                                            src: comment.commentCreator.photo.includes("/undefined")
                                            ? "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid&w=740&q=80"
                                            : comment.commentCreator.photo,
                                        }}
                                        classNames={{ base: "w-full", wrapper: "w-full", description: "w-full", name: "text-sm",}}
                                        description={
                                            <Input isReadOnly size="sm" label={comment.commentCreator.name} classNames={{ label: "text-base text-bold" }} className="w-full" value={comment.content}/> }
                                            />
                                    </div>
                                    <div className="shrink-0">
                                        <Dropdown className="min-w-7.5" placement="bottom-end">
                                            <DropdownTrigger>
                                                <HiOutlineDotsVertical aria-label="Comment actions" className="text-xl cursor-pointer" />
                                            </DropdownTrigger>
                                            
                                            { userId===userData._id && comment.commentCreator._id === userData._id ?
                                                <>
                                                <DropdownMenu aria-label="Static Actions same user">
                                                    <DropdownItem variant='flat' key="edit_comment" color="primary">Edit comment</DropdownItem>
                                                    <DropdownItem onClick={()=>deleteUserComment(comment._id)} variant='flat' key="remove_comment" className="text-danger " color="danger">
                                                        Delete comment
                                                    </DropdownItem>
                                                </DropdownMenu>
                                                </> : 
                                                ""
                                    }
                                        </Dropdown>
                                    </div>
                                </div>
                        ))}
                    </>
                    )}
                    </div>}
                </div>
                {!postInfo && <>
                    <CardFooter className='flex justify-center items-center font-medium '>
                    <button onClick={onOpen} className='py-2 cursor-pointer' >
                        View All Comments 
                        <FaChevronDown className="inline-flex ms-2 w-3 h-3"/>
                    </button>
                    <PostDetails isOpen={isOpen} onOpenChange={onOpenChange} postId={postId}/>
                    </CardFooter>
                </>}
                
        </>
    )
}
