import { useEffect, useState } from "react";
import { Users, MessageSquare, FolderOpen, Database, Network, Target } from "lucide-react";
import StatCard from "../components/StatCard.jsx";
import { api } from "../services/api.js";

export default function Home() {
  const [stats, setStats] = useState({
    online: 0, chats: 0, files: 0, cached: 0, nodes: 0, hitRate: 0,
  });

  useEffect(() => {
    Promise.all([
      api.onlineUsers(), api.chats(), api.files(), api.cacheStats(), api.networkStatus(),
    ]).then(([users, chats, files, cache, net]) => {
      setStats({
        online: users.length,
        chats: chats.length,
        files: files.length,
        cached: cache.cached_objects,
        nodes: net.total,
        hitRate: cache.hit_rate,
      });
    }).catch(() => {});
  }, []);

  return (
    <div className="page">
      <h1 className="page-title">Good afternoon, Devika</h1>
      <p className="page-sub">Here's what's happening in your NDN workspace.</p>

      <div className="grid grid-3">
        <StatCard icon={Users}         label="Online Members"       value={stats.online} />
        <StatCard icon={MessageSquare} label="Active Conversations" value={stats.chats} />
        <StatCard icon={FolderOpen}    label="Shared Files"         value={stats.files} />
        <StatCard icon={Database}      label="Cached Content"       value={stats.cached} />
        <StatCard icon={Network}       label="Network Nodes"        value={stats.nodes} />
        <StatCard icon={Target}        label="Cache Hit Rate"       value={`${stats.hitRate}%`} />
      </div>
    </div>
  );
}
