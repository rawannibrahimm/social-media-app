import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment, FaBookmark } from "react-icons/fa";
import { FiShare } from "react-icons/fi";

export default function PostCardActions({comments}) {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(200);

    const toggleLike = () => {
        setLiked(prev => !prev);
        setLikesCount(prev => (liked ? prev - 1 : prev + 1));
        };
    return (
        <>  
            <div className="flex justify-between px-5 items-center sm:px-4">
                <div className="flex items-center gap-4 sm:gap-6 py-2">

                <button onClick={toggleLike}
                        className="flex items-center gap-1 sm:gap-2 text-red-600/80 
                        cursor-pointer transition-transform hover:scale-105 ">
                        {liked ? (
                            <AiFillHeart className="w-6 h-6 sm:w-7 sm:h-7" />) 
                            : ( <AiOutlineHeart className="w-6 h-6 sm:w-7 sm:h-7" /> )
                        }
                    <span className="text-sm sm:text-base font-medium">{likesCount}</span>
                </button>

                <button className="flex items-center gap-1 sm:gap-2 hover:text-blue-500 transition-colors cursor-pointer">
                    <FaRegComment className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-sm sm:text-base font-medium"> {comments?.length ?? 0} </span>
                </button>

                <button className="flex items-center gap-1 sm:gap-2 hover:text-blue-500 transition-colors cursor-pointer">
                    <FiShare className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base font-medium"> 200 </span>
                </button>
            </div>

            <button className="flex items-center text-yellow-500/70 cursor-pointer hover:scale-105 transition-transform">
                <FaBookmark className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

        </div>
        </>
    )
}
