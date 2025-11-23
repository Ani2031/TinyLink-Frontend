import { useState } from "react";
import axios from "axios";

export default function AddLinkForm({ refresh }) {
    const API_URL = import.meta.env.VITE_API_URL;

    const [url, setUrl] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await axios.post(`${API_URL}/api/links`, { url, code });
            setUrl("");
            setCode("");
            refresh();
        } catch (err) {
            if (err.response?.status === 409) {
                setError("Custom code already exists!");
            } else {
                setError("Something went wrong. Try again.");
            }
        }

        setLoading(false);
    };

    return (
        <form onSubmit={submit} className="border p-4 rounded shadow bg-white mb-4">
            <h3 className="font-semibold mb-2">Create Short Link</h3>

            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Long URL"
                    required
                    className="border p-2 rounded"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Custom short code (optional)"
                    className="border p-2 rounded"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <button
                disabled={loading}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
            >
                {loading ? "Creating..." : "Shorten"}
            </button>
        </form>
    );
}
