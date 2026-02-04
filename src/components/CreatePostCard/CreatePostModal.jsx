import React, { useContext, useEffect, useRef, useState,} from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button,  Divider, User, Textarea, } from "@heroui/react";
import { IoMdPhotos } from "react-icons/io";
import { SlTrash } from "react-icons/sl";
import { chooseFile, openFileInput } from '../../lib/AddImagePost/AddImagePost';
import { UserContext } from '../../Context/UserContext';
import { createPost, updatePost } from '../../services/postsServices';
import { useQueryClient } from '@tanstack/react-query';

// using this component to create and edit post 
// to differentiate between them if a post already have body and image the values will be sent through header
// and using optional chaining and defaultvalue the input can take we will display them into the modal

export default function CreatePostModal({isOpen, onOpenChange ,selectedImage,setSelectedImage, formDataImg,setFormDataImg,body,image,postId}) {
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)
    const {userData} = useContext(UserContext)
    const modalfileInput= useRef()
    
    const userTextArea = useRef()
    
    async function createNewPost() {
        setIsLoading(true)
        const formData = new FormData()
        if(userTextArea.current.value){
            formData.append("body", userTextArea.current.value)
        }
        
        if(formDataImg){
            formData.append("image",formDataImg)
        }

        try {
            if(postId){
                const {data} = await updatePost(formData , postId )
                console.log(data) 
            } else {
                const {data} = await createPost(formData)
                console.log(data)
            }
            queryClient.invalidateQueries({
                queryKey: ['posts'],
            })
            queryClient.invalidateQueries({ 
                queryKey: ['userPosts', userData._id] 
            })
            onOpenChange(false)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
    if (isOpen) {
        // When editing, set the preview to the existing image
        // When creating, it will be null/empty
        setSelectedImage(image || selectedImage || null);
    }
    }, [isOpen, image]);
    

    return (
    <>
    <Modal isOpen={isOpen} placement="center" scrollBehavior='inside' onOpenChange={onOpenChange} onClose={() => {
        setSelectedImage(null) ;
        setFormDataImg(null) ;
    }}>
        <ModalContent className='max-w-2xl mx-auto'>
            {/* {(onClose) => (
                <> */}
                    <ModalHeader className="flex flex-col gap-1">
                        {postId? "Edit post": "Create post"}
                    </ModalHeader>
                    <Divider/>
                    <ModalBody>
                        <div className="pb-0 pt-2 px-1 justify-between flex items-start">
                            <User avatarProps={{ src: userData.photo,}}
                                    name={userData.name} classNames={{name: "text-md font-bold", }}/> 
                        </div>
                        <Textarea defaultValue={body ?? ""} autoFocus ref={userTextArea} minRows={selectedImage? "1": "8"} className="" classNames={{input:"font-semibold"}} placeholder={`What's on your mind, ${userData.name}? `}/>
                        {selectedImage && ( 
                        <>
                            <div className="relative w-full ">
                                {!postId && (
                                    <button onClick={() =>{
                                    setSelectedImage(null)
                                    setFormDataImg(null)
                                    }}
                                    className="absolute top-2 cursor-pointer right-2 z-10 bg-black/60 text-white p-1.5 rounded-full hover:bg-black">
                                    <SlTrash/>
                                    </button>
                                )}
                                <img src={selectedImage} className="w-full object-cover rounded"/>
                            </div>
                        </> )}
                        <div className="add-img flex gap-1">
                            <p className='text-gray-950 font-semibold'>Add an image</p>
                            <IoMdPhotos onClick={()=>(openFileInput(modalfileInput))} className='text-green-600 text-3xl cursor-pointer' > </IoMdPhotos>
                            <input accept="image/png, image/jpeg, image/jpg" onChange={() => chooseFile(modalfileInput, setSelectedImage,setFormDataImg)} ref={modalfileInput} type="file" hidden />
                        </div>
                    </ModalBody>
                    <Divider/>
                    <ModalFooter>
                        <Button onPress={createNewPost} isLoading={isLoading} color="primary" className='font-semibold text-medium' >
                            {postId? "Edit":"Post"}
                        </Button>
                    </ModalFooter>
                {/* </>
            )} */}
        </ModalContent>
    </Modal>
    </>
    )
}

