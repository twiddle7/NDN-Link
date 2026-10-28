import { useEffect, useState } from "react";
import { api } from "../services/api.js";

export default function Cache() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    api.cacheStats().then(setStats);
    api.cacheActivity().then(setActivity);
  }, []);

  if (!stats) return <div className="page">Loading…</div>;

  return (
    <div className="page">
      <h1 className="page-title">In-Network Cache</h1>
      <p className="page-sub">Content served from nearby nodes instead of the original producer.</p>

      <div className="grid grid-3">
        <div className="card stat-card">
          <div className="stat-label">Cache Hit Rate</div>
          <div className="stat-value">{stats.hit_rate}%</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Cached Objects</div>
          <div className="stat-value">{stats.cached_objects}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Bandwidth Saved</div>
          <div className="stat-value">{stats.bandwidth_saved_mb} MB</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <h3 style={{ marginTop: 0 }}>Recent NDN Activity</h3>
        {activity.slice(0, 12).map(a => (
          <div key={a.id} className="activity-item">
            <span className="activity-time">{a.time}</span>
            <span className={`badge ${
              a.type === "cache_hit" ? "success" :
              a.type === "cache_miss" ? "danger" : ""
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
