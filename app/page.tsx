"use client";
import axios from "axios";
import AddPost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Posts";
import { Post as PostInterface } from "./types/interfaces";

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, isLoading, isError } = useQuery<PostInterface[]>({
    queryKey: ["allPosts"],
    queryFn: allPosts,
    refetchOnMount: "always",
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
