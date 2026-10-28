import { useEffect, useState } from "react";
import { api } from "../services/api.js";

export default function Naming() {
  const [data, setData] = useState(null);
  useEffect(() => { api.naming().then(setData); }, []);
  if (!data) return <div className="page">Loading…</div>;

  return (
    <div className="page">
      <h1 className="page-title">NDN Naming Scheme</h1>
      <p className="page-sub">
        In NDN, content is addressed by <b>name</b>, not by IP address.
      </p>

      {data.examples.map((ex) => (
        <div key={ex.name} className="card" style={{ marginBottom: 16 }}>
          <h3 style={{ marginTop: 0, fontFamily: "monospace", fontSize: 14 }}>
            {ex.name}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            {ex.components.map((c, i) => (
              <div key={i} style={{
                padding: "8px 12px", background: "var(--accent-soft)",
                border: "1px solid var(--accent)", borderRadius: 8, fontSize: 12,
              }}>
                <div style={{ fontWeight: 700, color: "var(--accent)" }}>/{c.part}</div>
                <div style={{ color: "var(--muted)" }}>{c.meaning}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Rules of NDN Naming</h3>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {data.rules.map((r) => (<li key={r} style={{ padding: "4px 0" }}>{r}</li>))}
        </ul>
      </div>
    </div>
  );
}
