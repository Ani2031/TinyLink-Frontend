export default function LinkTable({ links, refresh }) {

    const deleteLink = async (code) => {
        if (!confirm("Delete this link?")) return;

        await fetch(`http://localhost:5000/api/links/${code}`, {
            method: "DELETE",
        });

        refresh();
    };

    const copy = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied!");
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full border text-left bg-white shadow rounded">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3">Short Code</th>
                        <th className="p-3">Target URL</th>
                        <th className="p-3">Clicks</th>
                        <th className="p-3">Last Click</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {links.map((l) => (
                        <tr key={l.code} className="border-t">
                            <td className="p-3 font-mono">{l.code}</td>
                            <td className="p-3 truncate max-w-xs">{l.targetUrl}</td>
                            <td className="p-3">{l.totalClicks}</td>
                            <td className="p-3">
                                {l.lastClickedAt
                                    ? new Date(l.lastClickedAt).toLocaleString()
                                    : "Never"}
                            </td>
                            <td className="p-3 flex gap-2">
                                <button
                                    onClick={() => copy(`http://localhost:5000/${l.code}`)}
                                    className="px-3 py-1 bg-gray-800 text-white rounded"
                                >
                                    Copy
                                </button>

                                <button
                                    onClick={() => (window.location.href = `/code/${l.code}`)}
                                    className="px-3 py-1 bg-blue-600 text-white rounded"
                                >
                                    Stats
                                </button>

                                <button
                                    onClick={() => deleteLink(l.code)}
                                    className="px-3 py-1 bg-red-600 text-white rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {links.length === 0 && (
                        <tr>
                            <td colSpan="5" className="p-4 text-center text-gray-500">
                                No links yet
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
