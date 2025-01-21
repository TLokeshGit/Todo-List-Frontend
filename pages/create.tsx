import React from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";

const CreateTask: React.FC = () => {
  const router = useRouter();

  const handleCreate = async (title: string, color: string) => {
    try {
      const res = await fetch("http://localhost:5001/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, color }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      router.push("/");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center pt-0 px-8 pb-24 font-sans text-white"> {/* Changed px-24 to px-8 */}
      <Header title="Create Task" />
      <TaskForm onSubmit={handleCreate} submitLabel="Add Task" showCompleted={false} />
    </div>
  );
};

export default CreateTask;