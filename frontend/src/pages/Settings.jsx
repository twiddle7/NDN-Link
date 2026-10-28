export default function Settings() {
  return (
    <div className="page">
      <h1 className="page-title">Settings</h1>
      <p className="page-sub">Profile, appearance, notifications, and network.</p>

      <div className="grid grid-2">
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Profile</h3>
          <div className="fmeta">Name</div>
          <input defaultValue="Devika" style={inputStyle} />
          <div className="fmeta" style={{ marginTop: 10 }}>Email</div>
          <input defaultValue="devika@college.edu" style={inputStyle} />
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Appearance</h3>
          <p className="fmeta">Default: Light / White</p>
          <select style={inputStyle}>
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Network</h3>
          <div className="fmeta">NDN Node ID</div>
          <input defaultValue="node-A" style={inputStyle} />
          <div className="fmeta" style={{ marginTop: 10 }}>NDN Prefix</div>
          <input defaultValue="/college/cn/teamA" style={inputStyle} />
          <div className="fmeta" style={{ marginTop: 10 }}>Connection</div>
          <span className="badge success">● Connected</span>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Security</h3>
          <div className="fmeta">Signature</div>
          <span className="badge success">✓ Enabled</span>
          <div className="fmeta" style={{ marginTop: 10 }}>Encryption</div>
          <span className="badge success">✓ Enabled</span>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "9px 12px",
  border: "1px solid var(--border)", borderRadius: 8,
  outline: "none", marginTop: 4, background: "var(--bg)",
};
