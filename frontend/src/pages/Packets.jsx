import { useEffect, useState } from "react";
import { Package, ArrowRight, CheckCircle } from "lucide-react";
import { api } from "../services/api.js";

export default function Packets() {
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [packets, setPackets] = useState(null);

  useEffect(() => {
    api.files().then((list) => {
      setFiles(list);
      if (list.length) {
        setSelected(list[0]);
        api.packets(list[0].id).then(setPackets);
      }
    });
  }, []);

  async function selectFile(f) {
    setSelected(f);
    setPackets(await api.packets(f.id));
  }

  return (
    <div className="page">
      <h1 className="page-title">NDN Packet Inspector</h1>
      <p className="page-sub">
        Actual Interest and Data packets — the core of Named Data Networking.
      </p>

      <div className="grid grid-2" style={{ marginBottom: 20 }}>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Select a File</h3>
          <div style={{ maxHeight: 300, overflowY: "auto" }}>
            {files.map((f) => (
              <button
                key={f.id}
                onClick={() => selectFile(f)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "10px 12px", marginBottom: 6,
                  border: "1px solid var(--border)", borderRadius: 8,
                  background: selected?.id === f.id ? "var(--accent-soft)" : "var(--bg)",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 13 }}>{f.name}</div>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: "var(--muted)" }}>
                  {f.ndn_name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {packets && (
          <div className="card">
            <h3 style={{ marginTop: 0 }}><Package size={16} /> Protocol Flow</h3>
            <div style={{
              display: "flex", alignItems: "center", gap: 10, padding: 12,
              background: "var(--bg)", borderRadius: 8, marginBottom: 14,
            }}>
              <strong>Consumer</strong>
              <ArrowRight size={16} color="var(--accent)" />
              <strong>NDN Forwarding</strong>
              <ArrowRight size={16} color="var(--accent)" />
              <strong>{packets.data.served_by}</strong>
            </div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>
              {packets.data.status === "cache_hit"
                ? "Content was served from a cache — producer not contacted."
                : "Content came from the original producer."}
            </div>
          </div>
        )}
      </div>

      {packets && (
        <div className="grid grid-2">
          <div className="card" style={{ borderLeft: "4px solid var(--accent)" }}>
            <h3 style={{ marginTop: 0 }}>Interest Packet</h3>
            <table style={tableStyle}>
              <tbody>
                <Row k="Type" v={packets.interest.type} />
                <Row k="Name" v={packets.interest.name} mono />
                <Row k="MustBeFresh" v={String(packets.interest.must_be_fresh)} />
                <Row k="Lifetime" v={`${packets.interest.lifetime_ms} ms`} />
                <Row k="HopLimit" v={packets.interest.hop_limit} />
                <Row k="Nonce" v={packets.interest.nonce} mono />
                <Row k="Timestamp" v={packets.interest.timestamp} />
              </tbody>
            </table>
          </div>

          <div className="card" style={{ borderLeft: "4px solid var(--success)" }}>
            <h3 style={{ marginTop: 0 }}>
              Data Packet{" "}
              <span className="badge success"><CheckCircle size={10} /> Signed</span>
            </h3>
            <table style={tableStyle}>
              <tbody>
                <Row k="Type" v={packets.data.type} />
                <Row k="Name" v={packets.data.name} mono />
                <Row k="ContentType" v={packets.data.content_type} />
                <Row k="Freshness" v={`${packets.data.freshness_ms} ms`} />
                <Row k="SignatureType" v={packets.data.signature_type} />
                <Row k="Hash" v={packets.data.hash} mono />
                <Row k="Signed" v={packets.data.signed ? "verified" : "failed"} />
                <Row k="Served by" v={packets.data.served_by} />
                <Row k="Cached" v={packets.data.cached ? "yes" : "no"} />
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ k, v, mono }) {
  return (
    <tr>
      <td style={cellK}>{k}</td>
      <td style={{ ...cellV, fontFamily: mono ? "monospace" : "inherit" }}>{v}</td>
    </tr>
  );
}

const tableStyle = { width: "100%", fontSize: 13, borderCollapse: "collapse" };
const cellK = { padding: "6px 0", color: "var(--muted)", width: "40%" };
const cellV = { padding: "6px 0", fontWeight: 500 };
