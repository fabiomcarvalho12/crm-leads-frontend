// TaskModal.tsx
interface TaskModalProps {
  onClose: () => void;
  task: { id: string; name: string };
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose, task }) => {
  return (
    <div className="modal">
      <h2>Task Details</h2>
      <p>Task ID: {task.id}</p>
      <p>Task Name: {task.name}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default TaskModal;
