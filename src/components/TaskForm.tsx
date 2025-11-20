import { useState, useEffect } from 'react';
import { Task } from '../services/api';
import { X } from 'lucide-react';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (data: {
    title: string;
    description: string;
    status: string;
  }) => void;
  onCancel: () => void;
  loading: boolean;
}

const TaskForm = ({ task, onSubmit, onCancel, loading }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, status });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {task ? "Edit Task" : "Create Task"}
          </h2>
          <button onClick={onCancel}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block mb-2">Title</label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="status" className="block mb-2">
              Status
            </label>
            <select
              id="status"
              aria-label="Task status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border p-3 rounded-lg"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="w-full border p-3 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white p-3 rounded-lg"
            >
              {loading ? "Saving..." : task ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
