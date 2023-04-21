// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const prisma = new PrismaClient();
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Please sign in" });

    // Delete post
    try {
      const postId = req.query.id as string;
      const result = await prisma.post.delete({
        where: {
          id: postId,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Something went wrong when deleting your post" });
    }
  }
}
