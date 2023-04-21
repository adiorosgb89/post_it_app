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

    const { comment, postId }: { comment: string; postId: string } = req.body;

    // Add a comment
    try {
      // Check comment
      if (comment.length > 300) {
        return res
          .status(403)
          .json({ error: "Comment too long, write a shorter comment" });
      } else if (!comment.length) {
        return res.status(403).json({ error: "Don't leave this empty" });
      }
      const result = await prisma.comment.create({
        data: {
          message: comment,
          userId: prismaUser?.id ?? "",
          postId,
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
