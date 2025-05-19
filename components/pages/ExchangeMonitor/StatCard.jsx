export default function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded shadow text-center border border-gray-200">
      <h3 className="text-lg font-bold text-gray-700 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}