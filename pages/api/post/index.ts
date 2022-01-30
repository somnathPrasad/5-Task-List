import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    const { newTask } = req.body;
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const dateTime = `${year}-${month}-${date}`;
  
    const session = await getSession({ req });
    const result = await prisma.task.create({
      data: {
        task: newTask,
        author: { connect: { email: session?.user?.email } },
        date: dateTime,
      },
    });
    res.json(result);
  }