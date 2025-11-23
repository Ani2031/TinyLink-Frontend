import { useEffect, useState } from "react";
import AddLinkForm from "../components/AddLinkForm";
import LinkTable from "../components/LinkTable";

export default function Dashboard() {
    const [links, setLinks] = useState([]);
    const [filter, setFilter] = useState("");

    const loadLinks = async () => {
        const res = await fetch("http://localhost:5000/api/links");
        const data = await res.json();
        setLinks(data);
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
