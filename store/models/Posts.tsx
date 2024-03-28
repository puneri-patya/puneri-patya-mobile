import { Comment } from "./Comments";

export interface Post {
    _id: string;
    title: string;
    body: string;
    likes: [];
    comments: Comment[];
    latitude: 0;
    longitude: 0;
}