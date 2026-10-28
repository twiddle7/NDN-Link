import { useEffect, useState } from "react";
import { api } from "../services/api.js";

export default function Modules() {
  const [mods, setMods] = useState([]);
  useEffect(() => { api.modules().then(setMods); }, []);

  return (
    <div className="page">
      <h1 className="page-title">Modules</h1>
      <p className="page-sub">Organize your workspace by module and task.</p>

      <div className="grid grid-3">
        {mods.map(m => (
          <div key={m.id} className="card">
            <h3 style={{ marginTop: 0 }}>{m.name}</h3>
            {m.tasks.map(t => (
              <div key={t.id} style={{
                display: "flex", gap: 8, alignItems: "center",
                padding: "6px 0", borderBottom: "1px solid var(--border)",
              }}>
                <input type="checkbox" checked={t.done} readOnly />
                <span style={{ textDecoration: t.done ? "line-through" : "none", color: t.done ? "var(--muted)" : "var(--text)" }}>
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
