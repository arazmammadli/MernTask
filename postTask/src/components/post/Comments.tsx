import { useState } from 'react'
import AddComment from './AddComment';
import { IComment } from '../../types';
import { SetPostType } from '../../utils';

const Comments = ({ comments, commentInput, dataSet, id }: { comments: IComment[], commentInput: React.RefObject<HTMLInputElement>, dataSet: SetPostType, id: number }) => {
    const [commentsSlice, setCommentsSlice] = useState(3);

    const showNextComments = () => {
        setCommentsSlice(commentsSlice + 3);
    };

    return (
        <>
            <div className="p-4 pt-1 pb-4">
                {comments.slice(0, commentsSlice).map((c, index) => (
                    <p key={c.id} className="mb-1">
                        <span className="mr-1 font-bold">Comment {index += 1}</span>
                        <span>{c.comment}</span>
                    </p>
                ))}
                {comments.length >= 3 && commentsSlice < comments.length && (
                    <button
                        className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none border-none hover:border-none"
                        type="button"
                        onClick={showNextComments}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                showNextComments();
                            }
                        }}
                    >
                        View more comments
                    </button>
                )}
            </div>
            <AddComment dataSet={dataSet} id={id} commentInput={commentInput} />
        </>
    )
};

export default Comments;