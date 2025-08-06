import React from 'react';
import { Plus } from 'lucide-react';

const AddTaskForm = ({ newTask, setNewTask, handleAddTask }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200 shadow-lg mb-8">
      <div className="flex gap-3">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          placeholder="Thêm công việc mới..."
          className="flex-1 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200"
        />
        <button
          onClick={handleAddTask}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2 shadow-md"
        >
          <Plus className="w-5 h-5" />
          Thêm
        </button>
      </div>
    </div>
  );
};

export default AddTaskForm;
