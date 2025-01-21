import React, { useState, useEffect } from "react";
import { FaCheck, FaPlus } from "react-icons/fa";

interface TaskFormProps {
  initialTitle?: string;
  initialColor?: string;
  initialCompleted?: boolean;
  onSubmit: (title: string, color: string, completed?: boolean) => void; // Updated to handle optional completed parameter
  submitLabel: string;
  showCompleted?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialTitle = "",
  initialColor = "#ff0000",
  initialCompleted = false,
  onSubmit,
  submitLabel,
  showCompleted = true,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState(initialColor);
  const [completed, setCompleted] = useState(initialCompleted);

  useEffect(() => {
    setTitle(initialTitle);
    setColor(initialColor);
    setCompleted(initialCompleted);
  }, [initialTitle, initialColor, initialCompleted]);

  const colors = [
    "#ff0000",
    "#ffa500",
    "#ffff00",
    "#008000",
    "#0000ff",
    "#800080",
    "#ffc0cb",
    "#a52a2a",
  ];

  const handleSubmit = () => {
    if (showCompleted) {
      onSubmit(title, color, completed);
    } else {
      onSubmit(title, color);
    }
  };

  return (
    <div className="w-full max-w-xl">
      <label className="text-sky-500 mb-2 block text-xl">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ex. Brush your teeth"
        className="w-full p-4 mb-4 rounded-md bg-[#2C2C2C] text-white placeholder-gray-400 text-lg"
      />
      <label className="text-sky-500 mb-2 block text-xl">Color</label>
      <div className="flex mb-4">
        {colors.map((swatch) => (
          <div
            key={swatch}
            onClick={() => setColor(swatch)}
            className={`w-8 h-8 rounded-full mr-3 cursor-pointer ${
              color === swatch ? "border-2 border-white" : ""
            }`}
            style={{ backgroundColor: swatch }}
          ></div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className={`w-full bg-sky-500 text-white p-4 rounded-md flex items-center justify-center text-lg`} // Consistently using bg-sky-500 and text-white
        >
          {submitLabel}{" "}
          <span className="bg-white text-sky-500 rounded-full w-8 h-8 flex items-center justify-center ml-2">
            {submitLabel === "Save Task" ? <FaCheck /> : <FaPlus />}
          </span>
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
