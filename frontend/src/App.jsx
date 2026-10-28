import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import WorkspaceLayout from "./layouts/WorkspaceLayout.jsx";
import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";
import Files from "./pages/Files.jsx";
import Modules from "./pages/Modules.jsx";
import Tasks from "./pages/Tasks.jsx";
import Network from "./pages/Network.jsx";
import Cache from "./pages/Cache.jsx";
import Members from "./pages/Members.jsx";
import Activity from "./pages/Activity.jsx";
import Security from "./pages/Security.jsx";
import Compare from "./pages/Compare.jsx";
import Settings from "./pages/Settings.jsx";
import Packets from "./pages/Packets.jsx";
import Naming from "./pages/Naming.jsx";
import Tables from "./pages/Tables.jsx";
import Tamper from "./pages/Tamper.jsx";
import Aggregation from "./pages/Aggregation.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/workspace" element={<WorkspaceLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="chat" element={<Chat />} />
        <Route path="files" element={<Files />} />
        <Route path="modules" element={<Modules />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="packets" element={<Packets />} />
        <Route path="naming" element={<Naming />} />
        <Route path="tables" element={<Tables />} />
        <Route path="tamper" element={<Tamper />} />
        <Route path="aggregation" element={<Aggregation />} />
        <Route path="network" element={<Network />} />
        <Route path="cache" element={<Cache />} />
        <Route path="members" element={<Members />} />
        <Route path="activity" element={<Activity />} />
        <Route path="security" element={<Security />} />
        <Route path="compare" element={<Compare />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
