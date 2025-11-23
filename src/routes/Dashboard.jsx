import { useEffect, useState } from "react";
import axios from "axios";
import AddLinkForm from "../components/AddLinkForm";
import LinkTable from "../components/LinkTable";

export default function Dashboard() {
    const [links, setLinks] = useState([]);
    const [filter, setFilter] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    const loadLinks = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/links`);
            setLinks(res.data);
        } catch (err) {
            console.error("Failed to load links", err);
        }
    };

    useEffect(() => {
        loadLinks();
    }, []);

    const filtered = links.filter(
        (l) =>
            l.code.toLowerCase().includes(filter.toLowerCase()) ||
            l.targetUrl.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

            <AddLinkForm refresh={loadLinks} />

            <input
                type="text"
                placeholder="Search by code or URL..."
                className="border p-2 rounded w-full my-4"
                onChange={(e) => setFilter(e.target.value)}
            />

            <LinkTable links={filtered} refresh={loadLinks} />
        </div>
    );
}
