import React from 'react';
import { Check, Edit3, Save, X, Trash2 } from 'lucide-react';

const TaskItem = ({ 
  task, 
  index, 
  editingId, 
  editingText, 
  setEditingText,
  handleToggleTask,
  handleStartEdit,
  handleSaveEdit,
  handleCancelEdit,
  handleDeleteTask
}) => {
  return (
    <div
      className={`p-4 hover:bg-emerald-50 transition-all duration-200 ${
        task.completed ? 'opacity-60' : ''
      }`}
      style={{
        animation: `slideIn 0.3s ease-out ${index * 0.1}s both`
      }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleToggleTask(task.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            task.completed
              ? 'bg-green-500 border-green-500'
              : 'border-emerald-300 hover:border-emerald-400'
          }`}
        >
          {task.completed && <Check className="w-4 h-4 text-white" />}
        </button>

        <div className="flex-1">
          {editingId === task.id ? (
            <input
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
              onBlur={handleSaveEdit}
              className="w-full px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              autoFocus
            />
          ) : (
            <span
              className={`text-emerald-800 cursor-pointer ${
                task.completed ? 'line-through' : ''
              }`}
              onDoubleClick={() => handleStartEdit(task.id, task.text)}
            >
              {task.text}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {editingId === task.id ? (
            <>
              <button
                onClick={handleSaveEdit}
                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleStartEdit(task.id, task.text)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
