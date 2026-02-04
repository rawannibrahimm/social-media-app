import React, { useContext, useRef, useState,} from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button,  Checkbox, Input, Link, Divider, CardHeader, User, Card, Textarea, } from "@heroui/react";
import { IoMdPhotos } from "react-icons/io";
import { SlTrash } from "react-icons/sl";
import { chooseFile, openFileInput } from '../../lib/AddImagePost/AddImagePost';
import { UserContext } from '../../Context/UserContext';
import { uploadProfilePhoto } from '../../services/userServices';
import { FaCamera } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';

export default function ChooseProfilePicModal({isOpen, onOpenChange ,selectedImage,setSelectedImage, setFormDataImg, formDataImg}) {
    const queryClient = useQueryClient()
    const {userData, setUserData} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    // const [previewImage, setPreviewImage] = useState(null);
    const modalfileInput= useRef()
    
    // Prepairing my form data (user text input value , and image input object value) to be sent to backend
    async function uploadProfilePic() {
        setIsLoading(true)
        const formData = new FormData()
        if(formDataImg){
            formData.append("photo",formDataImg)
        }
        try {
            const {data} = await uploadProfilePhoto(formData)
            console.log(data) 
            setUserData(prev => ({ ...prev, photo: selectedImage }))
            queryClient.invalidateQueries({
                queryKey: ['userPosts'],
            })
            onOpenChange(false)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
    <>
    <Modal isOpen={isOpen} placement="center" scrollBehavior='inside' onOpenChange={onOpenChange} onClose={()=>(setSelectedImage(''))}>
        <ModalContent className='max-w-xl mx-auto min-h-fit'>
            {/* {(onClose) => (
                <> */}
                    <ModalHeader className="flex flex-col gap-1">Profile Photo</ModalHeader>
                    <Divider/>
                    <ModalBody>
                        {!selectedImage && (
                            <>
                                <div className="relative w-full ">
                                    <img src={userData.photo} className="w-full object-cover rounded"/>
                                </div>
                            </>
                        )}
                        {selectedImage && ( 
                        <>
                            <div className="relative w-full ">
                                <button onClick={() => setSelectedImage(null)}
                                    className="absolute top-2 cursor-pointer right-2 z-10 bg-black/60 text-white p-1.5 rounded-full hover:bg-black">
                                    <SlTrash/>
                                </button>
                                <img src={selectedImage} className="w-full object-cover rounded"/>
                            </div>
                        </> )}
                        <div className="add-img flex items-center gap-1">
                            <p className='text-gray-950 font-semibold'>Choose another photo</p>
                            <FaCamera onClick={()=>(openFileInput(modalfileInput))} className='text-gray-600 text-2xl cursor-pointer' > </FaCamera>
                            <input accept="image/png, image/jpeg, image/jpg" onChange={() => chooseFile(modalfileInput, setSelectedImage, setFormDataImg)} ref={modalfileInput} type="file" hidden />
                        </div>
                    </ModalBody>
                    <Divider/>
                    <ModalFooter>
                        <Button onPress={uploadProfilePic} isLoading={isLoading} color="primary" className='font-semibold text-medium' >
                            Change Profile Photo
                        </Button>
                    </ModalFooter>
                {/* </>
            )} */}
        </ModalContent>
    </Modal>
    </>
    )
}
