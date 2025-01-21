import React from "react";
import { FaTrash, FaCheck } from "react-icons/fa"; // Add FaCheck icon

interface TaskItemProps {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  color,
  completed,
  onToggleComplete,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between w-full bg-[#2C2C2C] p-4 rounded-md mb-2">
      <div className="flex items-center">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete(id);
          }}
          className={`mr-2 h-6 w-6 rounded-full cursor-pointer flex items-center justify-center border-2 ${
            completed ? "bg-purple-600 border-sky-500" : "border-sky-500"
          }`}
        >
          {completed && <FaCheck className="text-white text-xs" />}
        </div>
        <span
          className={`text-lg ${completed ? "line-through" : ""}`}
          style={{ color }} // Apply color to the task title
        >
          {title}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        className="focus:outline-none text-gray-500 hover:text-gray-700" // Ensured gray colors
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default TaskItem;
