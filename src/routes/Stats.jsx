import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Stats() {
    const { code } = useParams();
    const [link, setLink] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/links/${code}`)
            .then((res) => res.json())
            .then((data) => setLink(data));
    }, [code]);

    if (!link) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Stats for "{code}"</h2>

            <div className="border p-4 rounded shadow bg-white">
                <p><strong>Target URL:</strong> {link.targetUrl}</p>
                <p><strong>Total Clicks:</strong> {link.totalClicks}</p>
                <p>
                    <strong>Last Clicked:</strong>{" "}
                    {link.lastClickedAt ? new Date(link.lastClickedAt).toLocaleString() : "Never"}
                </p>
                <p><strong>Created:</strong> {new Date(link.created_at).toLocaleString()}</p>

                <button
                    className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
                    onClick={() => navigator.clipboard.writeText(`http://localhost:5000/${code}`)}
                >
                    Copy Short Link
                </button>
            </div>
        </div>
    );
}
