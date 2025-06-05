import { useEffect, useState } from "react";
import "./App.css";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

import Clock from "./components/Clock";

type Task = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
};

const API_URL = import.meta.env.VITE_API_URL as string;

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then(setTasks)
      .catch(console.error);
  }, []);

  const addTask = () => {
    if (!title.trim()) return;

    fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTasks((prev) => [newTask, ...prev]);
        setTitle("");
        setDescription("");
      })
      .catch(console.error);
  };

  const toggleComplete = (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks((prev) =>
          prev.map((t) => (t._id === id ? updatedTask : t))
        );
      })
      .catch(console.error);
  };

  const startEdit = (task: Task) => {
    setEditingTaskId(task._id);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditedTitle("");
    setEditedDescription("");
  };

  const saveEdit = (id: string) => {
    fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editedTitle, description: editedDescription }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks((prev) =>
          prev.map((t) => (t._id === id ? updatedTask : t))
        );
        cancelEdit();
      })
      .catch(console.error);
  };

  const deleteTask = (id: string) => {
    fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" })
      .then(() => {
        setTasks((prev) => prev.filter((t) => t._id !== id));
        setDeleteId(null);
      })
      .catch(console.error);
  };

  return (
    <div className="app">
      <Clock />
      <h1>Task Manager</h1>

      <div className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty">No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <div
              className={`task ${task.completed ? "completed" : ""}`}
              key={task._id}
            >
              <div className="task-info">
                {editingTaskId !== task._id && (
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task._id)}
                  />
                )}
                {editingTaskId === task._id ? (
                  <div className="edit-fields">
                    <input
                      className="edit-input"
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                      className="edit-textarea"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <div className="task-edit-actions">
                      <button className="save-btn" onClick={() => saveEdit(task._id)}>
                        Save <FaSave />
                      </button>
                      <button className="cancel-btn" onClick={cancelEdit}>
                        Cancel <FaTimes />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className={task.completed ? "slashed" : ""}>{task.title}</h3>
                    <p className={task.completed ? "slashed" : ""}>{task.description}</p>
                  </div>
                )}
              </div>
              {editingTaskId !== task._id && (
                <div className="task-actions">
                  <button className="edit-btn" onClick={() => startEdit(task)}>
                    Edit <FaEdit />
                  </button>
                  <button className="delete-btn" onClick={() => setDeleteId(task._id)}>
                    Delete <FaTrash />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Delete</h2>
            <p>Do you really want to delete this task?</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteId(null)}>
                Cancel <FaTimes />
              </button>
              <button className="delete-btn" onClick={() => deleteTask(deleteId)}>
                Delete <FaTrash />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
