import Head from "next/head";
import styles from "../styles/Home.module.css";
import TodayDate from "../components/todayDate";
import { tasks } from "../data/tasks";
import prisma from "../lib/prisma";
import { useState } from "react";

export default function Task() {
    const [newTask, setNewTask] = useState("");
  
    function handleTaskOnClick(e: any) {
      e.target.classList.toggle("line-through");
    }
  
    function handleInputOnChange(e: any) {
      setNewTask(e.target.value);
    }
  
    function handleButtonClick() {
      if(newTask !== ""){
  
      }
    }
  
    return (
      <div className={styles.container}>
        <Head>
          <title>5 Task List</title>
          <meta name="description" content="5 Task List Main page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className="justify-center content-center items-center text-center">
          <div className="m-10 inline-block pb-5">
            <div className="justify-center content-center text-center font-sans text-5xl font-bold mb-10 pb-4 border-b-4">
              <TodayDate dateString={new Date().toISOString()} />
            </div>
            <div className="justify-center content-center text-center text-3xl">
              <ol>
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="cursor-pointer mt-5 mb-5 text-left"
                    onClick={handleTaskOnClick}
                  >
                    {task.id}. {task.task}
                  </li>
                ))}
              </ol>
            </div>
            <div className="text-center items-center">
              <input
                type="text"
                className="shadow appearance-none border rounded mr-5 py-2 px-3 text-gray-700 text-2xl leading-tight focus:outline-none focus:shadow-outline"
                value={newTask}
                onChange={handleInputOnChange}
              />
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline justify-center text-2xl"
                onClick={handleButtonClick}
              >
                Add
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
  