import { useState } from 'react'
import { SetPostType } from '../../utils';

const Actions = ({ totalLikes, likedPhoto, dataSet,id }: { totalLikes: number, likedPhoto: boolean, dataSet: SetPostType,id:number }) => {
    const [toggleLiked, setToggleLiked] = useState<boolean>(likedPhoto);
    const [likes, setLikes] = useState(totalLikes)

    const handleToggleLiked = () => {
        setToggleLiked((toggleLiked) => !toggleLiked);
        setLikes((likes) => toggleLiked ? likes - 1 : likes + 1);
        dataSet((prev) => prev.map((d) => ({
            ...d,
            beyenilibMi:d.id === id ? !likedPhoto : d.beyenilibMi
        })))
    }

    return (
        <>
            <div className="flex justify-between px-4 py-2">
                <div className="flex flex-row gap-3 items-center">
                    <svg
                        onClick={handleToggleLiked}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleToggleLiked();
                            }
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        tabIndex={0}
                        className={`w-8 mr-4 select-none cursor-pointer focus:outline-none ${toggleLiked ? 'fill-red-700 text-red-primary' : 'text-black-light'
                            }`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                    <div className="py-0">
                        <p className="font-bold">{likes} like</p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Actions;