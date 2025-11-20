import { Task } from "../services/api";
import { Pencil, Trash2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskCard = ({ task, onDelete, onEdit }: TaskCardProps) => {
  const getStatusStyle = () => {
    switch (task.status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "in-progress":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-yellow-600 bg-yellow-100";
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-slate-900">{task.title}</h3>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <Pencil className="w-5 h-5 text-slate-600" />
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>

      <p className="text-slate-600 mt-2">{task.description}</p>

      <div className="flex justify-between items-center mt-4">
        <span
          className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusStyle()}`}
        >
          {task.status}
        </span>

        <span className="text-xs text-slate-500">
          Created by: {task.createdBy ?? "Unknown"}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
