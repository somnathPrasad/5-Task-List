import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  GithubLoginButton,
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
  LinkedInLoginButton,
  TelegramLoginButton,
  InstagramLoginButton,
} from "react-social-login-buttons";
import { useSession, getSession, signIn, signOut } from "next-auth/react";
import TodayDate from "../components/todayDate";
import { useState } from "react";
import Router from "next/router";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import { useEffect } from "react";

const date = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const dateTime = `${year}-${month}-${date}`;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { tasks: [] } };
  }
  const tasks = await prisma.task.findMany({
    where: {
      author: { email: session.user.email },
      date: dateTime
    },
  });
  return {
    props: { tasks },
  };
};

type tasks = {
  id: string;
  task: string;
  authorId: string;
};

export default function Home({ tasks }: { tasks: tasks[] }) {
  const { data: session } = useSession();
  const [newTask, setNewTask] = useState("");
  const [allTask, setAllTasks] = useState([]);
  function handleTaskOnClick(e: any) {
    e.target.classList.toggle("line-through");
  }
  useEffect(() => {
    setAllTasks(tasks)
  }, [tasks]);
  
  const displayTasks = allTask.map((task) => (
    <li
      key={task.id}
      className="cursor-pointer mt-5 mb-5 text-center"
      onClick={handleTaskOnClick}
    >
      {task.task}
    </li>
  ));

  const createTask = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { newTask };
      await fetch("api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
      setNewTask("");
    } catch (error) {
      console.error(error);
    }
  };

  if (!session) {
    return (
      <div className={styles.container}>
        <Head>
          <title>5 Task List</title>
          <meta name="description" content="5 Task List Main page" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <div className="center-v-h">
            <GithubLoginButton onClick={() => signIn("github")} />
            <FacebookLoginButton onClick={() => signIn("facebook")} />
            <GoogleLoginButton onClick={() => signIn("google")} />
            <TwitterLoginButton onClick={() => signIn("twitter")} />
            <LinkedInLoginButton onClick={() => signIn("linkedin")} />
            <TelegramLoginButton onClick={() => signIn("telegram")} />
            <InstagramLoginButton onClick={() => signIn("instagram")} />
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <title>5 Task List</title>
          <meta name="description" content="5 Task List Main page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="justify-center content-center items-center text-center">
          <button onClick={() => signOut()}>SignOut</button>
          <div className="m-10 inline-block pb-5">
            <div className="justify-center content-center text-center font-sans text-5xl font-bold mb-10 pb-4 border-b-4">
              <TodayDate dateString={new Date().toISOString()} />
            </div>
            <div className="justify-center content-center text-center text-3xl">
              <ol>
                {tasks.length ? displayTasks : <li className="text-left">Create 5 new Tasks.</li>}
              </ol>
            </div>
            <div className="text-center items-center">
              <form onSubmit={createTask}>
                <input
                  type="text"
                  className="shadow appearance-none border rounded mr-5 py-2 px-3 text-gray-700 text-2xl leading-tight focus:outline-none focus:shadow-outline"
                  value={newTask}
                  placeholder="Type new task"
                  onChange={(e) => setNewTask(e.target.value)}
                />

                <input
                  disabled={!newTask}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline justify-center text-2xl"
                  type="submit"
                  value="Create"
                />
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
