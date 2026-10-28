import { useEffect, useState } from "react";
import { FileText, Download, Share2, Database, CheckCircle } from "lucide-react";
import { api } from "../services/api.js";

export default function Files() {
  const [files, setFiles] = useState([]);
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.files().then(setFiles).catch(() => {});
  }, []);

  const filtered = files.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase())
  );

  async function openFile(f) {
    setLoading(true);
    try {
      const res = await api.file(f.id);
      setDetail(res);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div className="page">
      <h1 className="page-title">Files</h1>
      <p className="page-sub">Search, share, and retrieve content by name.</p>

      {/* ---------- Search ---------- */}
      <div className="card" style={{ marginBottom: 16 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search files and documents…"
          style={{
            width: "100%",
            padding: "10px 14px",
            border: "1px solid var(--border)",
            borderRadius: 10,
            outline: "none",
            background: "var(--bg)",
            fontSize: 14,
          }}
        />
      </div>

      {/* ---------- File List ---------- */}
      <div className="card" style={{ padding: 0 }}>
        {filtered.length === 0 && (
          <div style={{ padding: 24, textAlign: "center", color: "var(--muted)" }}>
            No files match your search.
          </div>
        )}

        {filtered.map((f) => (
          <div key={f.id} className="file-row">
            <FileText size={20} color="var(--accent)" />

            <div>
              <div className="fname">{f.name}</div>
              <div className="fmeta" style={{ fontFamily: "monospace", fontSize: 11 }}>
                {f.ndn_name}
              </div>
            </div>

            <span className="fmeta">{f.type}</span>
            <span className="fmeta">{f.size}</span>
            <span className="fmeta">{f.owner}</span>

            <span>
              {f.cached ? (
                <span className="badge success">
                  <Database size={10} /> {f.cached_on}
                </span>
              ) : (
                <span className="badge">producer</span>
              )}
            </span>

            <div style={{ display: "flex", gap: 8 }}>
              <button className="icon-btn" title="Share">
                <Share2 size={15} />
              </button>
              <button
                className="icon-btn"
                title="Preview NDN flow"
                onClick={() => openFile(f)}
              >
                <Download size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Detail Panel ---------- */}
      {loading && (
        <div className="card" style={{ marginTop: 20 }}>
          <div style={{ color: "var(--muted)" }}>Resolving NDN Interest…</div>
        </div>
      )}

      {detail && !loading && (
        <div className="card" style={{ marginTop: 20 }}>
          <h3 style={{ marginTop: 0 }}>
            {detail.file.name}
            {detail.ndn_result?.signature_verified && (
              <span className="badge success" style={{ marginLeft: 8 }}>
                <CheckCircle size={10} /> Signature verified
              </span>
            )}
          </h3>

          <p
            className="fmeta"
            style={{ fontFamily: "monospace", marginTop: 4 }}
          >
            {detail.file.ndn_name}
          </p>

          <div className="grid grid-2" style={{ marginTop: 16 }}>
            <div>
              <div className="fmeta">Status</div>
              <div style={{ fontWeight: 600 }}>
                {detail.ndn_result.served_by === "no-node-online"
                  ? "NO NODE ONLINE"
                  : detail.ndn_result.status === "cache_hit"
                  ? "CACHE HIT"
                  : "CACHE MISS"}
              </div>
            </div>
            <div>
              <div className="fmeta">Served by</div>
              <div style={{ fontWeight: 600 }}>
                {detail.ndn_result.served_by === "no-node-online"
                  ? "—"
                  : detail.ndn_result.served_by}
              </div>
            </div>
          </div>

          {detail.ndn_result.served_by === "no-node-online" && (
            <div
              style={{
                marginTop: 16,
                padding: 12,
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 8,
                color: "#991b1b",
                fontSize: 13,
              }}
            >
              All network nodes are offline. In NDN, content can only be
              served if at least one node holding it (producer or cache) is
              online.
            </div>
          )}

          <div style={{ marginTop: 16 }}>
            <div className="fmeta">Chunks ({detail.chunks.length})</div>
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                marginTop: 6,
              }}
            >
              {detail.chunks.map((c) => (
                <span key={c.index} className="badge success">
                  chunk {c.index}
                </span>
              ))}
            </div>
          </div>

          <button
            className="btn btn-secondary"
            style={{ marginTop: 16 }}
            onClick={() => setDetail(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}