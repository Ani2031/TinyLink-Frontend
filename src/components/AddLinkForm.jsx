import { useState } from "react";

export default function AddLinkForm({ refresh }) {
    const [url, setUrl] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await fetch("http://localhost:5000/api/links", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, code }),
        });

        if (res.status === 409) {
            setError("Custom code already exists!");
            setLoading(false);
            return;
        }

        const data = await res.json();

        setUrl("");
        setCode("");
        refresh();
        setLoading(false);
    };

    return (
        <form
            onSubmit={submit}
            className="border p-4 rounded shadow bg-white mb-4"
        >
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
