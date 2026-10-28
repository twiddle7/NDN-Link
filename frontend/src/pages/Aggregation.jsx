import { useEffect, useState } from "react";
import { Combine, ArrowRight } from "lucide-react";
import { api } from "../services/api.js";

export default function Aggregation() {
  const [data, setData] = useState(null);
  useEffect(() => { api.aggregation().then(setData); }, []);
  if (!data) return <div className="page">Loading…</div>;

  return (
    <div className="page">
      <h1 className="page-title">Interest Aggregation</h1>
      <p className="page-sub">
        NDN combines multiple requests for the same content into one Interest.
      </p>

      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginTop: 0 }}>Consumers</h3>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {data.consumers.map((c) => (
            <div key={c} className="avatar"
              style={{ background: "#6366f1", width: 40, height: 40 }}>
              {c[0]}
            </div>
          ))}
        </div>
        <div className="fmeta" style={{ marginTop: 10 }}>
          Requesting: <b style={{ fontFamily: "monospace" }}>{data.requested_name}</b>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card" style={{ borderTop: "3px solid var(--danger)" }}>
          <h3 style={{ marginTop: 0 }}>Without Aggregation (TCP style)</h3>
          <div style={{ fontSize: 13, lineHeight: 2 }}>
            {data.consumers.map((c) => (
              <div key={c}>
                {c} → /files/report.pdf <span className="badge danger">Interest</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, fontSize: 13 }}>
            Upstream Interests:{" "}
            <b style={{ color: "var(--danger)" }}>
              {data.interests_sent_by_consumers}
            </b>
          </div>
        </div>

        <div className="card" style={{ borderTop: "3px solid var(--success)" }}>
          <h3 style={{ marginTop: 0 }}>With NDN Aggregation</h3>
          <div style={{ fontSize: 13, lineHeight: 2 }}>
            {data.consumers.map((c) => (<div key={c}>{c}</div>))}
            <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
              <ArrowRight size={16} color="var(--success)" />
              <span className="badge success">1 upstream Interest</span>
            </div>
          </div>
          <div style={{ marginTop: 14, fontSize: 13 }}>
            Upstream Interests:{" "}
            <b style={{ color: "var(--success)" }}>
              {data.interests_forwarded_upstream}
            </b>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <h3 style={{ marginTop: 0 }}><Combine size={16} /> Why This Matters</h3>
        <p style={{ margin: 0, color: "var(--muted)" }}>{data.explanation}</p>
      </div>
    </div>
  );
}
