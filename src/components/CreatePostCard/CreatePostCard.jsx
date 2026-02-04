import { Card, Input, User } from '@heroui/react'
import { IoMdPhotos } from "react-icons/io";
import React, { useRef, useState } from 'react'
import { useDisclosure } from "@heroui/react";
import { chooseFile, openFileInput } from '../../lib/AddImagePost/AddImagePost';
import CreatePostModal from './CreatePostModal';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

export default function CreatePostCard() {
    const {userData} = useContext(UserContext)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    // using uncontrolled comp. methodlogy to have a reference to my input 
    const fileInput= useRef()
    
    // setting the image the user selected 
    const [selectedImage, setSelectedImage] = useState(null);

    const [formDataImg, setFormDataImg] = useState("")
    return (
        <>
            <Card className="py-4 w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
                <div className='flex gap-0.5 items-center px-4 justify-between '>
                    {/* User Avatar */} 
                    <User avatarProps={{ src: userData.photo }}/>
                    {/* ,  inputWrapper: "bg-white" to change input bg color */}
                    <Input onClick={onOpen} isReadOnly classNames={{input:"font-semibold"}}  placeholder={`What's on your mind, ${userData.name}? `} type="text"/>
                    <IoMdPhotos onClick={()=>(openFileInput(fileInput))} className='text-green-600 text-3xl cursor-pointer' />
                    <input accept="image/png, image/jpeg, image/jpg" onChange={() => {
                        chooseFile(fileInput, setSelectedImage, setFormDataImg);
                        onOpen();
                    }} ref={fileInput} type="file" hidden />
                </div>  
            </Card>
            <CreatePostModal setFormDataImg={setFormDataImg} formDataImg={formDataImg} isOpen={isOpen} onOpenChange={onOpenChange} selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
        </>
    )
}
