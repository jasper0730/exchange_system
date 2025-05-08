export default function PageTitle({ title }) {
    return (
        <div className="pb-3 border-b-4 border-gray-300">
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    );
}