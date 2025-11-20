import { useState, useEffect } from 'react';
import { tasksAPI, Task } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { Plus, Search, Filter } from 'lucide-react';

const Dashboard = () => {
  const { isAdmin } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await tasksAPI.getTasks();
      let data = res.data;

      if (!Array.isArray(data)) data = [];

      // Search filter
      if (search.trim()) {
        data = data.filter((t: Task) =>
          t.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Status filter
      if (statusFilter) {
        data = data.filter((t: Task) => t.status === statusFilter);
      }

      setTasks(data);
    } catch (e) {
      console.error("Error loading tasks:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (data: any) => {
    try {
      await tasksAPI.createTask(data);
      setShowForm(false);
      fetchTasks();
    } catch (e) {
      console.error("Error creating:", e);
    }
  };

  const handleUpdateTask = async (data: any) => {
    if (!editingTask) return;

    try {
      await tasksAPI.updateTask(editingTask._id, data);
      setEditingTask(null);
      fetchTasks();
    } catch (e) {
      console.error("Error updating:", e);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await tasksAPI.deleteTask(id);
      fetchTasks();
    } catch (e) {
      console.error("Error deleting:", e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {isAdmin ? "All Tasks" : "My Tasks"}
            </h1>
            <p className="text-slate-600 mt-1">{tasks.length} total tasks</p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>

        {/* FILTER BAR */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchTasks();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                aria-label="Search tasks"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                aria-label="Filter tasks"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2.5 border border-slate-300 rounded-lg"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 text-white rounded-lg"
            >
              Search
            </button>
          </form>
        </div>

        {/* TASK LIST */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border">
            <p className="text-slate-600">No tasks found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={() => handleDeleteTask(task._id)}
                onEdit={() => setEditingTask(task)}
              />
            ))}
          </div>
        )}
      </div>

      {(showForm || editingTask) && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          loading={false}
        />
      )}
    </div>
  );
};

export default Dashboard;
