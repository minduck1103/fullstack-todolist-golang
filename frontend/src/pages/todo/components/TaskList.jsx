import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ 
  tasks, 
  editingId, 
  editingText, 
  setEditingText,
  handleToggleTask,
  handleStartEdit,
  handleSaveEdit,
  handleCancelEdit,
  handleDeleteTask
}) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-emerald-200 shadow-lg overflow-hidden">
        <div className="p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-emerald-800 mb-2">Chưa có công việc nào</h3>
          <p className="text-emerald-600">Hãy thêm công việc đầu tiên của bạn!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-emerald-200 shadow-lg overflow-hidden">
      <div className="divide-y divide-emerald-100">
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            editingId={editingId}
            editingText={editingText}
            setEditingText={setEditingText}
            handleToggleTask={handleToggleTask}
            handleStartEdit={handleStartEdit}
            handleSaveEdit={handleSaveEdit}
            handleCancelEdit={handleCancelEdit}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
