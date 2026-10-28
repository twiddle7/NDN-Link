import { useEffect, useState } from "react";
import { api } from "../services/api.js";

export default function Members() {
  const [users, setUsers] = useState([]);
  useEffect(() => { api.users().then(setUsers); }, []);

  const groups = {
    Online:  users.filter(u => u.status === "online"),
    Away:    users.filter(u => u.status === "away"),
    Offline: users.filter(u => u.status === "offline"),
  };

  return (
    <div className="page">
      <h1 className="page-title">Members</h1>
      <p className="page-sub">
        {users.length} members · {groups.Online.length} online · {groups.Away.length} away · {groups.Offline.length} offline
      </p>

      {Object.entries(groups).map(([label, list]) => (
        <div key={label} className="card" style={{ marginBottom: 16 }}>
          <h3 style={{ marginTop: 0 }}>{label}</h3>
          {list.map(u => (
            <div key={u.id} className="member-row">
              <div className="member-avatar">
                <div className="avatar" style={{ background: u.avatar_color }}>{u.name[0]}</div>
                <span
                  className="member-status-dot"
                  style={{
                    background: u.status === "online" ? "var(--success)"
                              : u.status === "away"   ? "var(--warn)"
                              : "var(--muted)"
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{u.name}</div>
                <div className="fmeta">{u.role} · last active {u.last_active}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
