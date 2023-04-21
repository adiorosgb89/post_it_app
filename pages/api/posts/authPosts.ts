// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const prisma = new PrismaClient();
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Please sign in" });

    // Get auth users posts
    try {
      const data = await prisma.user.findUnique({
        where: { email: session?.user?.email as string },
        include: {
          posts: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              comments: true,
              user: true,
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
