"use client";

import Image from "next/image";
import Link from "next/link";
import { Post } from "../types/interfaces";
import { useState } from "react";
import Toggle from "../dashboard/Toggle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

interface Props {
  post: Post;
  myPosts?: boolean;
}

export default function Post({ post, myPosts }: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [toastPostId, setToastPostId] = useState<string>("");
  const queryClient = useQueryClient();

  if (!post) return <p>Loading posts...</p>;

  const { title: postContent, user, id, comments } = post;

  //Delete a post
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deletePost", { params: { id } }),
    {
      onSuccess: () => {
        toast.success("Post deleted successfully", { id: toastPostId });
        queryClient.invalidateQueries(["myPosts"]);
        queryClient.invalidateQueries(["allPosts"]);
        setIsDeleteModalOpen(false);
        setToastPostId("");
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          toast.error("Something went wrong when deleting your post", {
            id: toastPostId,
          });
        }
        setToastPostId("");
      },
    }
  );

  const onDeletePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setToastPostId(toast.loading("Deleting post...", { id: toastPostId }));
    mutate(id);
  };
  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image
            width={32}
            height={32}
            src={user?.image}
            alt="Profile Pic"
            className="w-14 rounded-full"
            priority
          />
          <h3 className="font-bold text-gray-700">{user?.name}</h3>
        </div>

        <div className="my-8">
          <p className="break-all">{postContent}</p>
        </div>
        <div className="flex gap-4 items-center">
          <Link href={`/post/${id}`}>
            <p className="text-sm font-bold cursor-pointer  text-gray-700">
              {comments?.length} Comments
            </p>
          </Link>
          {myPosts && (
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="text-sm font-bold cursor-pointer  text-red-500"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      {myPosts && isDeleteModalOpen && (
        <Toggle
          closeModal={(toggle: boolean) => setIsDeleteModalOpen(toggle)}
          deletePost={(e: React.MouseEvent<HTMLButtonElement>) =>
            onDeletePost(e)
          }
        />
      )}
    </>
  );
}
