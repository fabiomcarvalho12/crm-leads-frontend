import KanbanBoard from "../../../../components/KanbanBoard";

export default function MyLeadsPage() {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <h1 className="hidden md:block text-lg font-semibold">All My Leads</h1>
      <KanbanBoard />
    </div>
  );
}