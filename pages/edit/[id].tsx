import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import TaskForm from "../../components/TaskForm";

const EditTask: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [initialData, setInitialData] = useState({
    title: "",
    color: "#ffffff",
    completed: false,
  });

  useEffect(() => {
    if (!id) return;
    fetchTask(id as string);
  }, [id]);

  const fetchTask = async (taskId: string) => {
    try {
      const res = await fetch(`http://localhost:5001/tasks/${taskId}`);
      if (!res.ok) {
        if (res.status === 404) {
          console.error("Task not found");
          router.push("/");
          return;
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Expected JSON response");
      }
      const task = await res.json();
      setInitialData({
        title: task.title,
        color: task.color,
        completed: task.completed,
      });
    } catch (error) {
      console.error("Failed to fetch task:", error);
    }
  };

  const handleUpdate = async (
    title: string,
    color: string,
    completed?: boolean
  ) => {
    // Make completed parameter optional
    if (!id) return;
    try {
      const res = await fetch(`http://localhost:5001/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, color, completed }), // Include completed in the update
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      router.push("/");
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center pt-0 px-8 pb-24 font-sans text-white">
      {" "}
      <Header title="Edit Task" showBackButton />
      <TaskForm
        initialTitle={initialData.title}
        initialColor={initialData.color}
        onSubmit={handleUpdate}
        submitLabel="Save Task"
      />
    </div>
  );
};

export default EditTask;
