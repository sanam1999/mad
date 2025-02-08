// hooks/useVolunteerPost.js
import { useState } from "react";

export const useVolunteerPost = () => {
  const [post, setPost] = useState('');

  const updatePost = (newPost) => {
    setPost(newPost);
    console.log("Post updated:", newPost);
  };

  return { post, updatePost };
};