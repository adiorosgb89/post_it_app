"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Post as PostInterface, User } from "../types/interfaces";
import Post from "../components/Posts";

const myPosts = async () => {
  const response = await axios.get("/api/posts/authPosts");
  return response.data;
};

export default function MyPosts() {
  const { data, isLoading, isError } = useQuery<User>({
    queryKey: ["myPosts"],
    queryFn: myPosts,
    refetchInterval: 1000,
  });

  if (isError) return <p>Error</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <main>
      {data?.posts?.map((post: PostInterface) => (
        <Post key={post.id} post={post} myPosts />
      ))}
    </main>
  );
}
