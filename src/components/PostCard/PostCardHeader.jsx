import React, { useContext, useState } from 'react'
import { CardHeader, useDisclosure, User} from "@heroui/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { UserContext } from '../../Context/UserContext';
import CreatePostModal from '../CreatePostCard/CreatePostModal';
import { deletePost } from '../../services/postsServices';
import { useQueryClient } from '@tanstack/react-query';

export default function PostCardHeader({userId, photo, createdAt, userName,body,postId, image}) {
    const queryClient = useQueryClient()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {userData} = useContext(UserContext)
    const [selectedImage, setSelectedImage] = useState(image);
    const [formDataImg, setFormDataImg] = useState()

    async function deleteUserPost(){
        try {
            const {data} = await deletePost(postId)
            console.log(data)
            queryClient.invalidateQueries({
                queryKey: ['posts'],
            })
            queryClient.invalidateQueries({ 
                queryKey: ['userPosts', userData._id] 
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <CardHeader className="pb-0 pt-2 px-4 justify-between flex items-start">
                    <User key={userId} avatarProps={{src: photo,}} 
                    description={new Date(createdAt).toLocaleString( "en-US", {dateStyle:"medium", timeStyle:"short"})} 
                    name={userName}   
                    classNames={{name: "text-md font-bold", description:"text-default-500"}}/>
                    <Dropdown className='min-w-30' placement="bottom-end">
                        <DropdownTrigger>
                            <HiOutlineDotsVertical aria-label="Comment actions" className='text-xl cursor-pointer'/>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions on post">
                        {
                            userId==userData._id ? 
                            <>
                                    <DropdownItem onClick={onOpen} variant='flat' key="new" color="primary">Edit post</DropdownItem>
                                    <DropdownItem onClick={deleteUserPost} variant='flat' key="delete" className="text-danger " color="danger">
                                        Delete post
                                    </DropdownItem>
                            </> : 
                            <>
                                    <DropdownItem variant='flat' key="copy" color="primary">Copy link</DropdownItem>
                                    <DropdownItem variant='flat' key="hide" className="text-danger " color="danger">
                                        Hide post
                                    </DropdownItem>
                            </>
                        }
                        </DropdownMenu>
                    </Dropdown>
                    {/* // formDataImg={formDataImg} setFormDataImg={setFormDataImg} */}
                    <CreatePostModal onOpen={onOpen} postId={postId} isOpen={isOpen} onOpenChange={onOpenChange} body={body} image={image} selectedImage={selectedImage} setSelectedImage={setSelectedImage} formDataImg={formDataImg} setFormDataImg={setFormDataImg} />
            </CardHeader>
        </>
    )
}
