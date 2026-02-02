import "./App.css";
import React, { useState } from "react";

function App() {
  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setInputTask(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (inputTask.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: inputTask,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    setInputTask("");
  };

  const UpdateTask = (e) => {
    e.preventDefault();
    if (inputTask.trim() === "") return;

    const updatedTasks = tasks.map((task) =>
      task.id === editIndex ? { ...task, text: inputTask } : task
    );

    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    setEditIndex(null);
    setInputTask("");
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const handleEdit = (editIndex, newText) => {
    setEditIndex(editIndex);
    setInputTask(newText);
  };

  const isEditing = editIndex !== null;

  const taskStatus = (e) => {
    if (isEditing) {
      UpdateTask(e);
    } else {
      addTask(e);
    }
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm === "") {
      setFilteredTasks(tasks);
    } else {
      const result = tasks.filter((task) =>
        task.text.toLowerCase().includes(searchTerm)
      );
      setFilteredTasks(result);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Todo list
        </h1>

        <div className="mb-6">
          <input
            type="text"
            onChange={handleSearchChange}
            placeholder="Search task..."
            className="flex-1 p-3 border-2 w-full border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
          />
        </div>

        <div className="mb-6">
          <form className="flex flex-row gap-3" onSubmit={taskStatus}>
            <input
              type="text"
              value={inputTask}
              onChange={handleInputChange}
              placeholder="Add a new task..."
              className="flex-1 p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              required
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition-all shadow-lg"
            >
              {isEditing ? "Save" : "Add"}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl shadow-md border-l-4 border-yellow-400"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-800 font-medium">
                  {task.text}
                </span>
                <div className="flex gap-2">
                  <button
                    className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all"
                    onClick={() => removeTask(task.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all"
                    onClick={() => handleEdit(task.id, task.text)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;