import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link, Divider,} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { changePasswordSchema } from "../../lib/Schema/changePasswordSchema";
import { toast } from "react-toastify";
import { changePassword } from "../../services/userServices";
import { authContext } from "../../Context/AuthContext";


export default function ChangePasswordModal({isOpen, onOpenChange}) {
    const {setToken} = useContext(authContext)
    const [showPass , setShowPass] = useState(false)
    const {register, handleSubmit, formState:{errors, isSubmitting, }, reset }= useForm(
        {
        resolver: zodResolver(changePasswordSchema),
        mode:"all",
        defaultValues:{
            password :"",
            newPassword :""
        }
        }
    );

    async function submitData(data){
        console.log(data)
        try {
            const response = await changePassword(data)
            console.log(response)
            localStorage.setItem("userToken", response.data.token)
            setToken(response.data.token)
            if (response.data.message == "success") {
                toast.success("Password changed successfully",{
                    position: "bottom-center",
                    hideProgressBar: true
                })
                reset()
            }
            } catch (error) {
            console.log(error)
            toast.error(error.response.data.error,{
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true
            })
        }
    }

    return (
    <>
        <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange} onClose={()=>(reset())} >
            <ModalContent>
                {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Change Password</ModalHeader>
                <Divider/>
                <ModalBody>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit(submitData)}>
                    <Input {...register("password")} 
                    errorMessage= {errors.password?.message} 
                    isInvalid={Boolean(errors.password)} 
                    classNames={{label: "font-semibold",}} 
                    label='Current Password' 
                    type ={`${showPass ? "text":"password"}`} 
                    endContent ={ showPass? <FaRegEyeSlash className='text-2xl cursor-pointer' onClick={()=>setShowPass(false)}/>
                        : <FaRegEye className='text-2xl cursor-pointer' onClick={()=>setShowPass(true)} /> }
                    placeholder="Enter your current password" 
                    size='lg'  />
                    <Input {...register("newPassword")} 
                    errorMessage= {errors.newPassword?.message} 
                    isInvalid={Boolean(errors.newPassword)} 
                    classNames={{label: "font-semibold",}} 
                    label='New Password' 
                    type ="text" 
                    placeholder="Enter your new password" 
                    size='lg'  />
                    <div className="flex justify-end gap-5 items-center">
                        <Button className=' text-white font-bold' color="danger" variant="solid" onPress={()=>{
                            onClose()
                            reset()
                        }}>
                            Close
                        </Button>
                        <Button isLoading={isSubmitting} type='submit' className='bg-blue-500 text-white font-bold'>Change password</Button>

                    </div>
                </form>
                </ModalBody>
            </>
        )}
            </ModalContent>
        </Modal>
    </>
    );
}

