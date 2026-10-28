import { Link } from "react-router-dom";
import {
  MessageSquare, FolderOpen, Search, Database, Wifi, Layers,
  Shield, Users, ArrowRight
} from "lucide-react";

const features = [
  { icon: MessageSquare, title: "Team Chat",            desc: "Real-time communication between team members." },
  { icon: FolderOpen,    title: "Secure File Sharing",  desc: "Share documents securely between nodes." },
  { icon: Search,        title: "NDN Content Requests", desc: "Request content using names instead of host addresses." },
  { icon: Database,      title: "In-Network Caching",   desc: "Previously requested content served from nearby nodes." },
  { icon: Wifi,          title: "Offline Resilience",   desc: "Access cached content even when the producer is offline." },
  { icon: Layers,        title: "Smart File Chunking",  desc: "Large files split into chunks for efficient transfer." },
  { icon: Users,         title: "Online Members",       desc: "See who is currently connected." },
  { icon: Shield,        title: "Secure Data",          desc: "Signatures for integrity, encryption for privacy." },
];

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <Link to="/" className="brand" style={{ padding: 0 }}>
          <div className="brand-dot">N</div>
          <span>NDN-Link</span>
        </Link>
        <nav className="landing-nav">
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#security">Security</a>
        </nav>
        <Link to="/workspace" className="btn btn-primary">
          Open Workspace <ArrowRight size={15} />
        </Link>
      </header>

      <section className="hero">
        <h1>Connect. Share. Discover. Anywhere.</h1>
        <p>
          A serverless collaboration platform powered by Named Data Networking,
          intelligent caching, and secure content sharing.
        </p>
        <div className="hero-actions">
          <Link to="/workspace" className="btn btn-primary">
            Open Workspace <ArrowRight size={15} />
          </Link>
          <a href="#features" className="btn btn-secondary">Explore Features</a>
        </div>
      </section>

      <section id="features" className="features">
        <h2 style={{ textAlign: "center", marginBottom: 8 }}>Built for Modern Teams</h2>
        <p style={{ textAlign: "center", color: "var(--muted)", marginBottom: 32 }}>
          Everything you need — powered by a content-centric network.
        </p>
        <div className="feature-grid">
          {features.map(f => (
            <div key={f.title} className="feature-card">
              <div className="f-icon"><f.icon size={18} /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
