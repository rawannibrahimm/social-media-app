import React from 'react'
import {Listbox, ListboxItem, ListboxSection, Avatar } from "@heroui/react";
import { TiHomeOutline } from "react-icons/ti";
import { IoCart } from "react-icons/io5";
import { MdOutlineGroups } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { HiSave } from "react-icons/hi";
import { RiUserCommunityFill } from "react-icons/ri";

export const ListboxWrapper = ({children}) => (
    <div className="hidden md:block w-full max-w-58.75 rounded-small ">
        {children}
    </div>
);


export default function LeftSidebar() {
    const iconClasses = "text-3xl pointer-events-none shrink-0 ";

    return (
        <ListboxWrapper>
            <Listbox aria-label="Listbox menu with icons" variant="flat">

                <ListboxItem key="feed" className='bg-blue-200/75 py-2' classNames={{title: "font-bold text-primary"}} color='primary' startContent={<TiHomeOutline  className={iconClasses.concat("text-primary")} />}>
                    Feed
                </ListboxItem>

                <ListboxItem key="friends" className='py-2' classNames={{title: "font-bold"}} color='primary' startContent={<FaUserFriends className={iconClasses} />}>
                    Friends
                </ListboxItem>

                <ListboxItem key="groups" className='py-2' classNames={{title: "font-bold"}} color='primary' startContent={<MdOutlineGroups className={iconClasses} />} >
                    Groups
                </ListboxItem>

                <ListboxItem key="community" className='py-2' classNames={{title: "font-bold"}} color='primary' startContent={<RiUserCommunityFill className={iconClasses} />} >
                    Communities
                </ListboxItem>

                <ListboxItem key="saved" className='py-2' classNames={{title: "font-bold"}} color='primary' startContent={<HiSave className={iconClasses} />} >
                    Saved
                </ListboxItem>

                <ListboxItem showDivider key="marketplace" className='py-2' classNames={{title: "font-bold"}} color='primary' startContent={<IoCart className={iconClasses} />} >
                    Marketplace
                </ListboxItem>
                
                <ListboxSection title="Your Shortcuts" classNames={{heading: "font-mono text-sm text-slate-500 px-2 py-1"}}></ListboxSection>
                
                <ListboxItem key="movie" className='py-2' classNames={{title: "font-bold"}} color='secondary' 
                startContent={<Avatar radius="md" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREeDphvXA4tXQZXQBtpUMGftC00WkX6YUKOPfRCZvTIEDWjN_o9V6_a5hE2OoXTtL2fIfWzpBOcMqscvm4YcvSu3ZfPq9vWUwll5M5MS0&s=10" />}>
                    Movies 
                </ListboxItem>
                <ListboxItem key="book" className='py-2' classNames={{title: "font-bold"}} color='secondary' 
                startContent={<Avatar radius="md" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsvxJEvVuYVgnJps8ZXMwFlZOdAfUBwAfNHDVYg5tYMu3m4zMqu8OR-Lk&s" />}>
                    Books 
                </ListboxItem>
                <ListboxItem key="city" className='py-2' classNames={{title: "font-bold"}} color='secondary' 
                startContent={<Avatar radius="md" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSfeswPSilC6SDBYVskk5KNOz-2VicK2o7FA&s" />}>
                    Cities 
                </ListboxItem>
                
            </Listbox>
        </ListboxWrapper>
    );
}
