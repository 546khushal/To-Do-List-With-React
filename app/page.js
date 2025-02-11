"use client"
import React, { useState, useEffect } from 'react';

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Load tasks from local storage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setMainTask(savedTasks);
  }, []);

  // Save tasks to local storage whenever mainTask changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(mainTask));
  }, [mainTask]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // If editing an existing task
      const updatedTasks = [...mainTask];
      updatedTasks[editIndex] = { title, desc };
      setMainTask(updatedTasks);
      setEditIndex(null);
    } else {
      // If adding a new task
      setMainTask([...mainTask, { title, desc }]);
    }
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const editHandler = (i) => {
    const taskToEdit = mainTask[i];
    setTitle(taskToEdit.title);
    setDesc(taskToEdit.desc);
    setEditIndex(i);
  };

  let renderTask = <h2 className="text-gray-600 text-center text-2xl">No Task Available</h2>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className="flex items-center justify-between mb-5 bg-white p-4 rounded-lg shadow-md">
          <div className="flex-1">
            <h5 className="text-xl font-semibold text-gray-800">{t.title}</h5>
            <h6 className="text-lg text-gray-600">{t.desc}</h6>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => editHandler(i)}
              className="bg-blue-500 rounded font-bold text-white px-4 py-2 hover:bg-blue-600 transition-all"
            >
              Edit
            </button>
            <button
              onClick={() => deleteHandler(i)}
              className="bg-red-500 rounded font-bold text-white px-4 py-2 hover:bg-red-600 transition-all"
            >
              Delete
            </button>
          </div>
        </li>
      );
    });
  }

  return (
    <>
      <div className="bg-gray-800 text-white p-6">
        <h1 className="text-3xl font-bold text-center">Khushal's To-Do List</h1>
      </div>
      <form onSubmit={submitHandler} className="p-6 bg-gray-100">
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <textarea
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter description here..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white p-3 rounded-lg font-bold hover:bg-gray-900 transition-all"
        >
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </form>
      <div className="p-6 bg-gray-50">
        <ul className="space-y-4">{renderTask}</ul>
      </div>
    </>
  );
};

export default Page;