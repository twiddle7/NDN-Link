import { Outlet, NavLink, Link } from "react-router-dom";
import {
  Home as HomeIcon, MessageSquare, FolderOpen, Layers, CheckSquare,
  Network as NetworkIcon, Database, Users, Activity as ActivityIcon,
  Shield, GitCompare, Settings as SettingsIcon, Search,
  Package, Tag, ShieldAlert, Combine
} from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../services/api.js";

const nav = [
  { section: "DEMO APPS" },
  { to: "home",     label: "Home",     icon: HomeIcon },
  { to: "chat",     label: "Messages", icon: MessageSquare },
  { to: "files",    label: "Files",    icon: FolderOpen },
  { to: "modules",  label: "Modules",  icon: Layers },
  { to: "tasks",    label: "Tasks",    icon: CheckSquare },

  { section: "NDN CORE" },
  { to: "packets",     label: "Packets",     icon: Package },
  { to: "naming",      label: "Naming",      icon: Tag },
  { to: "tables",      label: "CS/PIT/FIB",  icon: Database },
  { to: "tamper",      label: "Tamper Test", icon: ShieldAlert },
  { to: "aggregation", label: "Aggregation", icon: Combine },

  { section: "NETWORK" },
  { to: "network",  label: "Network",  icon: NetworkIcon },
  { to: "cache",    label: "Cache",    icon: Database },
  { to: "members",  label: "Members",  icon: Users },
  { to: "activity", label: "Activity", icon: ActivityIcon },
  { to: "security", label: "Security", icon: Shield },
  { to: "compare",  label: "Compare",  icon: GitCompare },
  { to: "settings", label: "Settings", icon: SettingsIcon },
];

export default function WorkspaceLayout() {
  const [user, setUser] = useState({ name: "Devika", color: "#6366f1" });

  useEffect(() => {
    api.users().then(list => {
      const u = list.find(x => x.name === "Devika") || list[0];
      if (u) setUser({ name: u.name, color: u.avatar_color, role: u.role });
    }).catch(() => {});
  }, []);

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <Link to="/" className="brand">
          <div className="brand-dot">N</div>
          <span>NDN-Link</span>
        </Link>

        {nav.map((item, i) => {
          if (item.section) {
            return (
              <div
                key={i}
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--muted)",
                  letterSpacing: 0.5,
                  padding: "12px 12px 4px",
                }}
              >
                {item.section}
              </div>
            );
          }
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            >
              <item.icon size={17} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <div className="sidebar-footer">
          <div className="avatar" style={{ background: user.color }}>
            {user.name?.[0]}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{user.name}</div>
            <div style={{ fontSize: 11, color: "var(--success)" }}>● Online</div>
          </div>
        </div>
      </aside>

      <div className="main">
        <div className="topbar">
          <div className="search-box">
            <Search size={15} />
            <input placeholder="Search messages, files, tasks, members..." />
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
            <span className="badge success">NDN Connected</span>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
