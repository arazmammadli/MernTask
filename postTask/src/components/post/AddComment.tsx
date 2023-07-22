import React, { useState, SyntheticEvent } from 'react'
import { SetPostType } from '../../utils';
import { addTodo } from '../../utils/addComment';

const AddComment = ({ commentInput, dataSet,id }: { commentInput: React.RefObject<HTMLInputElement>, dataSet: SetPostType,id:number }) => {
    const [comment, setComment] = useState<string>('');

    const handleSubmitComment = (event: SyntheticEvent<HTMLFormElement | HTMLButtonElement>) => {
        event.preventDefault();

        dataSet((prevData) => prevData.map((d) => ({
            ...d,
            comments:d.id === id ? addTodo(d.comments,comment) : d.comments
        })))
        setComment('');
    };
    return (
        <div className="border-t border-gray-primary">
            <form
                className="flex justify-between pl-0 pr-5"
                method="POST"
                onSubmit={(event) =>
                    comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
                }
            >
                <input
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 outline-none"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentInput}
                />
                <button
                    className={`text-sm font-bold text-[#005c98] border-none ${!comment && 'opacity-25'} hover:border-none`}
                    type="button"
                    disabled={comment.length < 1}
                    onClick={handleSubmitComment}
                >
                    Add
                </button>
            </form>
        </div>
    )
};

export default AddComment;