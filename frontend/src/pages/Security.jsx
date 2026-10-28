import { Shield, CheckCircle } from "lucide-react";

export default function Security() {
  const checks = [
    "Signed Data packets",
    "Content integrity verified by hash",
    "Encryption for private rooms",
    "Trusted producers only",
    "Hash verification on every chunk",
    "Secure file sharing between nodes",
  ];

  return (
    <div className="page">
      <h1 className="page-title">Security</h1>
      <p className="page-sub">Data-centric security using signatures and hashes.</p>

      <div className="card" style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 20 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: "#ecfdf5", color: "var(--success)",
          display: "grid", placeItems: "center",
        }}>
          <Shield size={22} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Security Status: Secure</div>
          <div className="fmeta">All Data packets verified</div>
        </div>
      </div>

      <div className="grid grid-2">
        {checks.map(c => (
          <div key={c} className="card" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <CheckCircle size={16} color="var(--success)" />
            <span>{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
