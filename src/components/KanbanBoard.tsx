"use client";

import { useState, useRef, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";
import TaskCard from "./TaskCard";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

interface Task {
  id: string;
  name: string;
}

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Record<string, { name: string; tasks: Task[] }>>({
    todo: { name: "To Do", tasks: [{ id: "1", name: "Task 1" }, { id: "2", name: "Task 2" }] },
    inProgress: { name: "In Progress", tasks: [{ id: "3", name: "Task 3" }, { id: "4", name: "Task 4" }, { id: "5", name: "Task 5" }] },
    done: { name: "Done", tasks: [{ id: "6", name: "Task 6" }, { id: "7", name: "Task 7" }] },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPhaseName, setNewPhaseName] = useState("");
  const [editingColumn, setEditingColumn] = useState<string | null>(null);
  const [temporaryName, setTemporaryName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Estado para coluna arrastada
  const [draggingColumn, setDraggingColumn] = useState<string | null>(null);

  useEffect(() => {
    if (editingColumn && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingColumn]);

  const handleDragStart = (event: any) => {
    const columnId = Object.keys(columns).find((key) => columns[key].tasks.some((task) => task.id === event.active.id));
    if (columnId) {
      setDraggingColumn(columnId);  // Marca a coluna que está sendo arrastada
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setDraggingColumn(null);  // Remove a coluna arrastada

    if (!over || active.id === over.id) return;

    const sourceColumn = Object.keys(columns).find((key) => columns[key].tasks.some((task) => task.id === active.id));
    const targetColumn = over.id;

    if (sourceColumn && targetColumn && sourceColumn !== targetColumn) {
      setColumns((prev) => {
        const sourceItems = [...prev[sourceColumn].tasks];
        const targetItems = [...prev[targetColumn].tasks];

        const [movedItem] = sourceItems.splice(sourceItems.findIndex((task) => task.id === active.id), 1);
        targetItems.push(movedItem);

        return {
          ...prev,
          [sourceColumn]: { ...prev[sourceColumn], tasks: sourceItems },
          [targetColumn]: { ...prev[targetColumn], tasks: targetItems },
        };
      });
    }
  };

  const handlePhaseRename = (id: string) => {
    setColumns((prev) => ({
      ...prev,
      [id]: { ...prev[id], name: temporaryName },
    }));
    setEditingColumn(null);
  };

  const handleAddPhase = () => {
    if (!newPhaseName.trim()) return;

    const id = newPhaseName.toLowerCase().replace(/\s+/g, "-");
    setColumns((prev) => ({
      ...prev,
      [id]: { name: newPhaseName, tasks: [] },
    }));
    setNewPhaseName("");
    setIsModalOpen(false);
  };

  const handleDeletePhase = (id: string) => {
    setColumns((prev) => {
      const updatedColumns = { ...prev };
      delete updatedColumns[id];
      return updatedColumns;
    });
  };

  return (
    <div className="p-4 flex flex-col space-y-4 bg-gray-100 min-h-screen relative z-0">
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex space-x-4 relative">
          {Object.keys(columns).map((column) => (
            <Droppable id={column} key={column}>
              <div
                className={`flex items-center justify-between mb-4 ${
                  draggingColumn === column ? 'z-50' : 'z-10'
                }`} // Aplica z-index dinâmico quando arrastando
              >
                {editingColumn === column ? (
                  <input
                    ref={inputRef}
                    className="text-xl font-semibold text-gray-800 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    value={temporaryName}
                    onChange={(e) => setTemporaryName(e.target.value)}
                    onBlur={() => handlePhaseRename(column)}
                  />
                ) : (
                  <span className="text-xl font-semibold text-gray-400 cursor-not-allowed text-left">
                    {columns[column].name}
                  </span>
                )}
                <div className="flex space-x-2 ml-auto">
                  <EditNoteIcon
                    fontSize="small"
                    className="text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={() => {
                      setEditingColumn(column);
                      setTemporaryName(columns[column].name);
                    }}
                  />
                  <DeleteIcon
                    fontSize="small"
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => handleDeletePhase(column)}
                  />
                </div>
              </div>
              <SortableContext items={columns[column].tasks.map(task => task.id)} strategy={rectSortingStrategy}>
                {columns[column].tasks.map((task) => (
                  <Draggable id={task.id} key={task.id}>
                    <TaskCard task={task} /> {/* Passando task inteira */}
                  </Draggable>
                ))}
              </SortableContext>
            </Droppable>
          ))}
        </div>

        {/* Add Phase Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 z-10"
        >
          <Image src="/plus.png" alt="Add Phase" width={20} height={20} />
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-[400px]">
              <h2 className="text-xl font-semibold mb-4">Add New Phase</h2>
              <input
                type="text"
                value={newPhaseName}
                onChange={(e) => setNewPhaseName(e.target.value)}
                placeholder="Phase Name"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPhase}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
