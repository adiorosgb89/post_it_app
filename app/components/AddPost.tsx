"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function AddPost() {
  const [title, setTitle] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [toastPostId, setToastPostId] = useState<string>("");
  const queryClient = useQueryClient();

  //Create a post
  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
    {
      onSuccess: (data) => {
        toast.success("Post created", { id: toastPostId });
        queryClient.invalidateQueries(["allPosts"]);
        queryClient.invalidateQueries(["myPosts"]);
        setToastPostId("");
        setTitle("");
        setIsDisabled(false);
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          const { error } = err.response?.data;
          toast.error(error, { id: toastPostId });
        }
        setToastPostId("");
      },
    }
  );

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToastPostId(toast.loading("Creating post...", { id: toastPostId }));
    mutate(title);
  };

  const verifyDisabled = () => {
    if (title.length > 300 || !title.length) {
      return true;
    }
    return isDisabled;
  };
  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="What's on your mind?"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
        <button
          disabled={verifyDisabled()}
          className={`text-sm bg-teal-600 ${
            !verifyDisabled() && "hover:bg-blue-700"
          } text-white font-bold py-2 px-6 rounded-xl disabled:opacity-25`}
          type="submit"
        >
          Post
        </button>
      </div>
    </form>
  );
}
