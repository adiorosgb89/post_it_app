// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const prisma = new PrismaClient();

    // Get post details
    try {
      const data = await prisma.post.findUnique({
        where: { id: req.query.details as string },
        include: {
          user: true,
          comments: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: "Something went wrong " });
    }
  }
}
