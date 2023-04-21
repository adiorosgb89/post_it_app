// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({ error: "Please sign in to make a post" });

    // Get user
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });

    const { title }: { title: string } = req.body;

    // Create post
    try {
      // Check title
      if (title.length > 300) {
        return res
          .status(403)
          .json({ error: "Post too long, write a shorter post" });
      } else if (!title.length) {
        return res.status(403).json({ error: "Don't leave this empty" });
      }
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser?.id ?? "",
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Something went wrong when creating post" });
    }
  }
}
