import { useEffect, useState } from "react";
import { Database, Clock, Network } from "lucide-react";
import { api } from "../services/api.js";

export default function Tables() {
  const [data, setData] = useState(null);
  useEffect(() => { api.ndnTables().then(setData); }, []);
  if (!data) return <div className="page">Loading…</div>;

  return (
    <div className="page">
      <h1 className="page-title">NDN Tables — CS / PIT / FIB</h1>
      <p className="page-sub">The three core data structures of any NDN node.</p>

      <div className="grid grid-3">
        <div className="card" style={{ borderTop: "3px solid var(--success)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Database size={18} color="var(--success)" />
            <h3 style={{ margin: 0 }}>{data.cs.name}</h3>
          </div>
          <div style={{ marginTop: 6, color: "var(--muted)", fontSize: 12 }}>
            {data.cs.description}
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, marginTop: 12 }}>
            {data.cs.count}
          </div>
          <div className="fmeta">objects cached</div>
          <div style={{ marginTop: 12 }}>
            {data.cs.objects.map((n, i) => (
              <div key={i} style={{
                fontFamily: "monospace", fontSize: 11, padding: "4px 0",
                borderBottom: "1px solid var(--border)", color: "var(--muted)",
              }}>{n}</div>
            ))}
          </div>
        </div>

        <div className="card" style={{ borderTop: "3px solid var(--warn)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Clock size={18} color="var(--warn)" />
            <h3 style={{ margin: 0 }}>{data.pit.name}</h3>
          </div>
          <div style={{ marginTop: 6, color: "var(--muted)", fontSize: 12 }}>
            {data.pit.description}
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, marginTop: 12 }}>
            {data.pit.count}
          </div>
          <div className="fmeta">pending Interests</div>
          <div style={{ marginTop: 12 }}>
            {data.pit.entries.length === 0 ? (
              <div style={{ color: "var(--muted)", fontSize: 12 }}>
                No pending Interests right now.
              </div>
            ) : (
              data.pit.entries.map((n, i) => (
                <div key={i} style={{
                  fontFamily: "monospace", fontSize: 11, padding: "4px 0",
                  borderBottom: "1px solid var(--border)",
                }}>{n}</div>
              ))
            )}
          </div>
        </div>

        <div className="card" style={{ borderTop: "3px solid var(--accent)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Network size={18} color="var(--accent)" />
            <h3 style={{ margin: 0 }}>{data.fib.name}</h3>
          </div>
          <div style={{ marginTop: 6, color: "var(--muted)", fontSize: 12 }}>
            {data.fib.description}
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, marginTop: 12 }}>
            {data.fib.count}
          </div>
          <div className="fmeta">prefix routes</div>
          <div style={{ marginTop: 12 }}>
            {data.fib.entries.map((r, i) => (
              <div key={i} style={{
                padding: "6px 0", borderBottom: "1px solid var(--border)", fontSize: 12,
              }}>
                <div style={{ fontFamily: "monospace" }}>{r.prefix}</div>
                <div style={{ color: "var(--muted)", fontSize: 11 }}>
                  {r.next_hop}{" "}
                  <span className={`badge ${r.status === "online" ? "success" : "danger"}`}>
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <h3 style={{ marginTop: 0 }}>What Each Table Does</h3>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li><b>CS</b> — cache of Data packets. Checked first on every Interest.</li>
          <li><b>PIT</b> — records Interests waiting for Data.</li>
          <li><b>FIB</b> — routing table. Maps name prefixes to next hops.</li>
        </ul>
      </div>
    </div>
  );
}
