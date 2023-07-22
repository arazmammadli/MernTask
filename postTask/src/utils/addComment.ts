import { IComment } from "../types";
import shortid from 'shortid';

export const addTodo = (comments: IComment[], comment: string): IComment[] => [
    ...comments,
    {
        id: shortid.generate(),
        comment: comment
    },
];