import {useState} from "react"
import { IPost } from "../types";


export const usePost = (initial:IPost[]) => useState<IPost[]>(initial);
export type UsePostType = ReturnType<typeof usePost>
export type PostType = UsePostType[0];
export type SetPostType = UsePostType[1];