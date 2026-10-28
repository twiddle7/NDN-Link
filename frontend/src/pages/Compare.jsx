export default function Compare() {
  return (
    <div className="page">
      <h1 className="page-title">NDN-Link vs Traditional LAN</h1>
      <p className="page-sub">Same user experience. Different network architecture.</p>

      <div className="grid grid-2">
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Traditional LAN</h3>
          <pre style={{ fontFamily: "monospace", fontSize: 13, color: "var(--muted)" }}>
{`Client
  ↓
IP Address
  ↓
Specific Server
  ↓
Data`}
          </pre>
          <p style={{ color: "var(--muted)" }}>
            The system asks: <b>“Where is the server?”</b>
          </p>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>NDN-Link</h3>
          <pre style={{ fontFamily: "monospace", fontSize: 13, color: "var(--accent)" }}>
{`User
  ↓
Content Name
  ↓
NDN Forwarding
  ↓
Producer OR Cache
  ↓
Data`}
          </pre>
          <p style={{ color: "var(--muted)" }}>
            The system asks: <b>“Where can I get this content?”</b>
          </p>
        </div>
      </div>
    </div>
  );
}
