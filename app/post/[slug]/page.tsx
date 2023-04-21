"use client";

import AddComment from "@/app/components/AddComment";
import Post from "@/app/components/Posts";
import { Post as PostInterface } from "@/app/types/interfaces";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

type URL = {
  params: {
    slug: string;
  };
};

const getDetails = async (slug: string) => {
  const { data } = await axios.get(`/api/posts/${slug}`);
  return data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading, isError } = useQuery<PostInterface>({
    queryKey: ["postDetails"],
    queryFn: () => getDetails(url.params.slug),
    staleTime: Infinity,
  });

  if (isError) return <p>Error</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Post post={data} />
      <AddComment id={data.id} />
      {data?.comments?.map((comment) => (
        <div key={comment.id} className="my-6 bg-white/75 p-8 rounded-md">
          <div className="flex items-center gap-2">
            <Image
              width={24}
              height={24}
              src={comment.user.image}
              alt="Profile Pic"
              className="w-6 rounded-full"
            />
            <h3 className="font-bold text-sm ">{comment.user.name}</h3>
            <h3 className="text-xs text-gray-500">{comment.createdAt}</h3>
          </div>
          <div className="py-4">{comment.message}</div>
        </div>
      ))}
    </div>
  );
}
