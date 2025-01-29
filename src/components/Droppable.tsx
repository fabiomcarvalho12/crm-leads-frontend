import { useDroppable } from "@dnd-kit/core";

export const Droppable = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col items-center bg-white rounded-lg p-4 shadow-md w-[300px] min-h-[400px] border border-gray-200"
    >
      {children}
    </div>
  );
};
