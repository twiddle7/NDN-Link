import { useEffect, useState } from "react";
import { api } from "../services/api.js";

export default function Activity() {
  const [items, setItems] = useState([]);
  useEffect(() => { api.activity().then(setItems); }, []);

  return (
    <div className="page">
      <h1 className="page-title">Activity Log</h1>
      <p className="page-sub">Every Interest, Data, cache hit, and security event.</p>

      <div className="card">
        {items.map(a => (
          <div key={a.id} className="activity-item">
            <span className="activity-time">{a.time}</span>
            <span className={`badge ${
              a.type === "cache_hit" ? "success" :
              a.type === "cache_miss" ? "danger" :
              a.type === "security" ? "warn" : ""
            }`}>{a.type}</span>
            <div>
              <div>{a.message}</div>
              {a.ndn_name && <div className="activity-name">{a.ndn_name}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
