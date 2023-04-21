"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function AddComment({ id }: { id: string }) {
  const [comment, setComment] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [toastCommentId, setToastCommentId] = useState<string>("");
  const queryClient = useQueryClient();

  // Add a comment
  const { mutate } = useMutation(
    async (data: object) =>
      await axios.post("/api/posts/addComment", { ...data }),
    {
      onSuccess: (data) => {
        toast.success("Comment added", { id: toastCommentId });
        queryClient.invalidateQueries(["postDetails"]);
        queryClient.invalidateQueries(["allPosts"]);
        queryClient.invalidateQueries(["myPosts"]);
        setToastCommentId("");
        setComment("");
        setIsDisabled(false);
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          toast.error("Comment could not be added", { id: toastCommentId });
        }
        setToastCommentId("");
        setIsDisabled(false);
      },
    }
  );

  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToastCommentId(
      toast.loading("Adding your comment...", { id: toastCommentId })
    );
    setIsDisabled(true);
    mutate({ comment, postId: id });
  };

  const verifyDisabled = () => {
    if (comment.length > 300 || !comment.length) {
      return true;
    }
    return isDisabled;
  };
  return (
    <form onSubmit={submitComment} className="my-8">
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <textarea
          onChange={(e) => setComment(e.target.value)}
          name="comment"
          value={comment}
          className="p-4 text-lg rounded-md bg-gray-200 border border-solid  border-gray-400"
        ></textarea>
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={verifyDisabled()}
          className={`text-sm bg-teal-600 ${
            !verifyDisabled() && "hover:bg-blue-700"
          } text-white font-bold py-2 px-6 rounded-xl disabled:opacity-25`}
          type="submit"
        >
          Add a comment
        </button>
        <p
          className={`font-bold text-sm ${
            comment.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${comment.length}/300`}</p>
      </div>
    </form>
  );
}
