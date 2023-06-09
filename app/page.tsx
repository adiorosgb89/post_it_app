"use client";
import axios from "axios";
import AddPost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Posts";
import { Post as PostInterface } from "./types/interfaces";
import { useEffect } from "react";

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, isLoading, isError, refetch } = useQuery<PostInterface[]>({
    queryKey: ["allPosts"],
    queryFn: allPosts,
    refetchInterval: 1000,
  });

  if (isError) return <p>Error</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <main>
      <AddPost />
      {data.map((post: PostInterface) => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
}
