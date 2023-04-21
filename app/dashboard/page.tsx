import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Post as PostInterface } from "../types/interfaces";
import Post from "../components/Posts";
import MyPosts from "./MyPosts";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  const { user } = session;
  return (
    <main>
      <h1 className="test-2xl font-bold"> Welcome back {user?.name}</h1>
      <MyPosts />
    </main>
  );
}
