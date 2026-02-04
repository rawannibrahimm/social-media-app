import { Card, CardFooter, Image, Avatar, Button, Skeleton, useDisclosure, Tooltip } from "@heroui/react";
import { useContext, useRef, useState } from "react";
import { FaEllipsisH, FaPen, FaSearch, FaEnvelope, FaBirthdayCake, FaVenusMars,} from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { UserContext } from "../../Context/UserContext";
import changeDate from "../../lib/ChangeDate/changeDate";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import { chooseFile, openFileInput } from '../../lib/AddImagePost/AddImagePost';
import ChooseProfilePicModal from "../ChooseProfilePicModal/ChooseProfilePicModal";

export default function UserProfileHeader() {
    const {userData, isLoading} = useContext(UserContext)
    // setting the image the user selected 
    const [selectedImage, setSelectedImage] = useState(null);
    const [formDataImg, setFormDataImg] = useState("")
    // Change Password modal
    const {
        isOpen: isPasswordOpen,
        onOpen: openPasswordModal,
        onOpenChange: onPasswordOpenChange,
        } = useDisclosure();

    // Profile Photo modal
    const {
        isOpen: isPhotoOpen,
        onOpen: openPhotoModal,
        onOpenChange: onPhotoOpenChange,
    } = useDisclosure();

    // using uncontrolled comp. methodlogy to have a reference to my input 
    const fileInput= useRef()

    return (
    <>
    {/* Cover Card */}
    <Card className="relative rounded-b-lg rounded-none max-w-7xl mx-auto h-37.5 overflow-visible">
        <Image removeWrapper alt="Profile cover" className="z-0 w-full h-full object-cover rounded-none"
            src="https://i.pinimg.com/1200x/ee/8b/4c/ee8b4caac932447c74a8c98571ab56bb.jpg"/>

        {/* Top right icons */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
            <Button isIconOnly radius="full" variant="flat">
                <FaSearch />
            </Button>
            <Tooltip key="bottom" color="foreground" content="Change Password" placement="bottom"> 
                <Button onPress={openPasswordModal} isIconOnly radius="full" variant="flat">
                    <FaPen />
                    <ChangePasswordModal isOpen={isPasswordOpen} onOpenChange={onPasswordOpenChange}/>
                </Button>
            </Tooltip>
            
            <Button isIconOnly radius="full" variant="flat">
                <FaEllipsisH />
            </Button>
        </div>

        {/* Avatar */}
        <CardFooter className="absolute left-10 -bottom-20 z-30 w-auto">
            <div className="relative">
                <Avatar isBordered className="w-30 h-30" src={isLoading? <Skeleton/> : userData.photo} />
                <Tooltip key="right-end" color="foreground" content="Choose profile photo" placement="right-end"> 
                {/* Camera icon */}
                <Button onPress={()=>(openFileInput(fileInput))} isIconOnly radius="full" size="sm" className="absolute bottom-2 right-2">
                    <FaCamera />
                </Button>
                </Tooltip>
                <input accept="image/png, image/jpeg, image/jpg" onChange={() => {
                        chooseFile(fileInput, setSelectedImage, setFormDataImg);
                        openPhotoModal();
                    }} ref={fileInput} type="file" hidden />
                <ChooseProfilePicModal isOpen={isPhotoOpen} onOpenChange={onPhotoOpenChange} selectedImage={selectedImage} setSelectedImage={setSelectedImage} formDataImg={formDataImg} setFormDataImg={setFormDataImg} />
            </div>
        </CardFooter>
    </Card>

    {/* Info Card */}
    <Card className="max-w-7xl mx-auto mt-0 p-6 rounded-b-lg rounded-t-none">
        <div className="flex flex-col gap-3 pt-12 px-10">
            {/* Name */}
            <h2 className="text-xl font-semibold">{userData.name}</h2>
            {/* Email */}
            <div className="flex items-center gap-2 text-sm text-default-500">
                <FaEnvelope />
                <span>{userData.email}</span>
            </div>

            {/* DOB + Gender */}
            <div className="flex items-center gap-6 text-sm text-default-500">
                <div className="flex items-center gap-2">
                    <FaBirthdayCake />
                    <span>{changeDate(userData.dateOfBirth)}</span>
                </div>

                <div className="flex items-center gap-2">
                    <FaVenusMars />
                    <span>{userData.gender}</span>
                </div>
            </div>
        </div>
    </Card>
    </>
);
}
