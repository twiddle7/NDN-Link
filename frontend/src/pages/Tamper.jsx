import { useEffect, useState } from "react";
import { Shield, ShieldAlert, CheckCircle, XCircle } from "lucide-react";
import { api } from "../services/api.js";

export default function Tamper() {
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.files().then((list) => {
      setFiles(list);
      if (list.length) setSelected(list[0]);
    });
  }, []);

  async function runTest() {
    if (!selected) return;
    setResult(await api.tamper(selected.id));
  }

  return (
    <div className="page">
      <h1 className="page-title">Data-Centric Security — Tamper Test</h1>
      <p className="page-sub">
        Every Data packet is signed. If content is modified, the hash breaks
        and the signature fails.
      </p>

      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginTop: 0 }}>Choose a File</h3>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <select
            value={selected?.id || ""}
            onChange={(e) => {
              const f = files.find((x) => x.id === e.target.value);
              setSelected(f); setResult(null);
            }}
            style={{
              flex: 1, padding: "9px 12px", border: "1px solid var(--border)",
              borderRadius: 8, background: "var(--bg)",
            }}
          >
            {files.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={runTest}>
            <ShieldAlert size={15} /> Run Tamper Test
          </button>
        </div>
      </div>

      {result && (
        <>
          <div className="grid grid-2">
            <div className="card" style={{ borderTop: "3px solid var(--success)" }}>
              <h3 style={{ marginTop: 0 }}>
                <CheckCircle size={16} color="var(--success)" /> Original Packet
              </h3>
              <div className="fmeta">Content</div>
              <div style={{ fontFamily: "monospace", fontSize: 12, marginTop: 4 }}>
                {result.original.content}
              </div>
              <div className="fmeta" style={{ marginTop: 12 }}>Hash</div>
              <div style={{ fontFamily: "monospace", fontSize: 12 }}>
                {result.original.hash}
              </div>
              <div className="fmeta" style={{ marginTop: 12 }}>Signature</div>
              <span className="badge success">{result.original.signature}</span>
              <div className="fmeta" style={{ marginTop: 12 }}>Status</div>
              <span className="badge success">{result.original.status}</span>
            </div>

            <div className="card" style={{ borderTop: "3px solid var(--danger)" }}>
              <h3 style={{ marginTop: 0 }}>
                <ShieldAlert size={16} color="var(--danger)" /> Tampered Packet
              </h3>
              <div className="fmeta">Content</div>
              <div style={{ fontFamily: "monospace", fontSize: 12, marginTop: 4 }}>
                {result.tampered.content}
              </div>
              <div className="fmeta" style={{ marginTop: 12 }}>Hash</div>
              <div style={{ fontFamily: "monospace", fontSize: 12 }}>
                {result.tampered.hash}
              </div>
              <div className="fmeta" style={{ marginTop: 12 }}>Signature</div>
              <span className="badge danger">{result.tampered.signature}</span>
              <div className="fmeta" style={{ marginTop: 12 }}>Status</div>
              <span className="badge danger">{result.tampered.status}</span>
            </div>
          </div>

          <div className="card" style={{
            marginTop: 20, background: "#fef2f2", border: "1px solid #fecaca",
          }}>
            <h3 style={{ marginTop: 0, color: "#991b1b" }}>
              <XCircle size={16} /> Verdict
            </h3>
            <p style={{ margin: 0, color: "#991b1b" }}>{result.verdict}</p>
          </div>
        </>
      )}

      {!result && (
        <div className="card">
          <h3 style={{ marginTop: 0 }}><Shield size={16} /> Why This Matters</h3>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            In traditional networks, security is applied to the connection
            (TLS). In NDN, security is applied to the data itself. Every Data
            packet is signed by its producer. If any node modifies it — even a
            cache — the signature breaks.
          </p>
        </div>
      )}
    </div>
  );
}
