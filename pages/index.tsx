import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FaRocket, FaClipboardList } from "react-icons/fa"; // Add FaClipboardList import
import TaskItem from "../components/TaskItem"; // Import TaskItem component
import Link from "next/link"; // Import Link
import { useRouter } from "next/router"; // Import useRouter

interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
}

const Home: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    setTotalTasks(tasks.length);
    setCompletedTasks(tasks.filter((task) => task.completed).length);
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5001/tasks"); // Update API endpoint
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Expected JSON response");
      }
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const toggleComplete = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    try {
      const res = await fetch(`http://localhost:5001/tasks/${id}`, {
        // Update API endpoint
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const updatedTask = await res.json();
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5001/tasks/${id}`, {
        // Update API endpoint
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <div className="min-h-screen bg-[#1A1A1A] flex flex-col items-center pt-0 px-16 pb-24 font-sans text-white">
        {/* Header */}
        <header className="w-screen flex flex-col items-center mb-8 bg-black pt-6 pb-16 px-16 -mx-16 relative">
          <div className="flex items-center">
            <FaRocket className="text-white mr-2" />
            <h1 className="text-5xl font-semibold">
              <span className="text-sky-500">Todo</span>{" "}
              <span className="text-purple-600">App</span>
            </h1>
          </div>
          <Link
            href="/create"
            className="bg-sky-500 text-white flex items-center justify-center px-6 py-3 rounded-md w-full max-w-lg absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-xl"
          >
            Create Task
            <span className="bg-white text-sky-500 rounded-full w-6 h-6 flex items-center justify-center ml-2">
              +
            </span>
          </Link>
        </header>
        <div className="w-2/3 flex justify-between text-white text-md mt-4 px-18">
          {" "}
          <span>
            <span className="text-sky-500">Tasks</span>{" "}
            <span className="bg-gray-500 text-white px-3 py-1 rounded-full">
              {totalTasks}
            </span>
          </span>
          <span>
            <span className="text-purple-600">Completed</span>{" "}
            <span className="bg-gray-500 text-white px-3 py-1 rounded-full">
              {completedTasks === 0
                ? "0"
                : `${completedTasks} of ${totalTasks}`}
            </span>
          </span>
        </div>
        <hr className="w-full border-white mt-4 mb-4" />
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center text-white mt-4">
            {" "}
            <FaClipboardList className="text-2xl mb-2" />
            <p className="text-lg font-normal text-center">
              You don't have any tasks registered yet. Create tasks and organize
              your to-do items.
            </p>
          </div>
        ) : (
          /* Task List */
          <div className="w-2/3 mt-8">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.tagName !== "DIV" && target.tagName !== "BUTTON") {
                    router.push(`/edit/${task.id}`);
                  }
                }}
                className="cursor-pointer w-full"
              >
                <TaskItem
                  id={task.id}
                  title={task.title}
                  color={task.color}
                  completed={task.completed}
                  onToggleComplete={toggleComplete}
                  onDelete={deleteTask}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
