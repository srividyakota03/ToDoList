import React, { useState, useEffect } from 'react';

function Todo() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === '') return alert('Please enter a valid task!');
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false
    };
    setTasks([newTask, ...tasks]);
    setTask('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true;
  });

  const sortByName = () => {
    const sorted = [...tasks].sort((a, b) => a.text.localeCompare(b.text));
    setTasks(sorted);
  };

  return (
    <div className="todo-box">
      <div className="todo-controls">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task..."
        />
        <button onClick={addTask}>Add</button>
        <button onClick={sortByName}>Sort A-Z</button>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <ul className="task-list">
        {filteredTasks.map((t) => (
          <li key={t.id} className={t.completed ? 'done' : ''}>
            <span onClick={() => toggleComplete(t.id)}>{t.text}</span>
            <button onClick={() => removeTask(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
