import React from 'react'
import { CardBody, Image } from "@heroui/react";

export default function PostCardBody({body, image, postInfo}) {
    return (
        <>
            <CardBody className= {`overflow-visible py-1 px-5 ${postInfo && "w-full"}`}>
                    { ((body !="") || image) && (
                        <>
                            {body && <p className='py-2' >{body}</p> }
                            {image && 
                                <Image
                                alt="Card background"
                                className={` object-cover rounded-xl ${!postInfo && "h-96"} cursor-pointer`}
                                src={image}
                                width={800}
                                />
                            }
                        </>
                    )}
                    
                </CardBody>
        </>
    )
}
