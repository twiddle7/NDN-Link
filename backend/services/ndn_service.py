"""
NDN Service Layer (Simulated)
-----------------------------
Three-tier lookup in request_content():
    1. In-network cache (any ONLINE node that has it)  -> served_by: "Node X"
    2. Local content store (only if network is up)     -> served_by: "local"
    3. Producer fallback                               -> served_by: "producer"
    4. All nodes offline                               -> served_by: "no-node-online"
"""

import hashlib
import time
from datetime import datetime


class NDNService:
    def __init__(self):
        self.pit = {}
        self.cs = {}
        self.fib = {}
        self.log = []
        self.node_caches = {}

    def create_interest(self, name):
        entry = {"name": name, "ts": time.time(), "type": "interest"}
        self.pit[name] = entry["ts"]
        self._log("interest", f"Interest created for {name}", name)
        return entry

    def publish_data(self, name, content):
        data = {
            "name": name,
            "content": content,
            "hash": self._hash(content),
            "signed": True,
            "ts": time.time(),
            "type": "data",
        }
        self.cs[name] = data
        self.pit.pop(name, None)
        self._log("data", f"Data published for {name}", name)
        return data

    def request_content(self, name, nodes=None):
        self.create_interest(name)

        online_nodes = [n for n in (nodes or []) if n["status"] == "online"]
        network_is_up = len(online_nodes) > 0

        # 1. In-network cache (any online node that has it)
        node_caches = getattr(self, "node_caches", {})
        if name in node_caches and network_is_up:
            candidates = node_caches[name]
            if isinstance(candidates, str):
                candidates = [candidates]

            for candidate in candidates:
                node = next((n for n in online_nodes if n["name"] == candidate), None)
                if node:
                    data = {
                        "name": name,
                        "content": f"content from {candidate}",
                        "hash": self._hash(name),
                        "signed": True,
                        "type": "data",
                    }
                    self._log("cache_hit", f"Cache HIT on {candidate}", name)
                    return {
                        "status": "cache_hit",
                        "served_by": candidate,
                        "data": data,
                    }

        # 2. Local content store (only if network is up)
        if name in self.cs and network_is_up:
            self._log("cache_hit", f"Local cache HIT for {name}", name)
            return {
                "status": "cache_hit",
                "served_by": "local",
                "data": self.cs[name],
            }

        # 3. Producer fallback
        if network_is_up:
            self._log("cache_miss", f"Cache MISS for {name}", name)
            data = self.publish_data(name, f"Simulated content for {name}")
            return {
                "status": "cache_miss",
                "served_by": "producer",
                "data": data,
            }

        # 4. All nodes offline
        self._log(
            "cache_miss",
            f"All nodes offline, cannot retrieve {name}",
            name,
        )
        return {
            "status": "cache_miss",
            "served_by": "no-node-online",
            "data": {"name": name, "content": None, "signed": False},
        }

    def cache_content(self, name, content):
        self.cs[name] = {
            "name": name,
            "content": content,
            "hash": self._hash(content),
            "signed": True,
            "ts": time.time(),
        }
        self._log("cache_hit", f"Cached {name}", name)

    def verify_signature(self, data):
        ok = data.get("signed", False)
        self._log(
            "security",
            f"Signature {'verified' if ok else 'failed'}",
            data.get("name"),
        )
        return ok

    def get_cache_status(self):
        return {
            "objects": len(self.cs),
            "names": list(self.cs.keys()),
            "pit_entries": len(self.pit),
            "fib_prefixes": len(self.fib),
        }

    def _hash(self, content):
        if isinstance(content, str):
            content = content.encode()
        return hashlib.sha256(content).hexdigest()[:12]

    def _log(self, kind, message, ndn_name=None):
        self.log.append(
            {
                "id": f"log{len(self.log) + 1}",
                "time": datetime.now().strftime("%H:%M:%S"),
                "type": kind,
                "message": message,
                "ndn_name": ndn_name,
            }
        )

    def get_activity(self, limit=50):
        return self.log[-limit:][::-1]


# ----------------------------------------------------------------------
# Singleton service used by the FastAPI app
# ----------------------------------------------------------------------
ndn = NDNService()

# Multi-node cache map:
#   content_name -> [list of nodes that have it cached]
# Any ONLINE node in the list can serve the request.
# ----------------------------------------------------------------------
NDN_NODE_CACHES = {
    "/college/cn/teamA/files/project-report.pdf":  ["Node C", "Node B", "Node D"],
    "/college/cn/teamA/files/architecture.png":    ["Node C", "Node D"],
    "/college/cn/teamA/files/presentation.pptx":   ["Node B", "Node C"],
    "/college/cn/teamA/files/network-design.pdf":  ["Node B"],
    "/college/cn/teamA/files/research-notes.docx": ["Node D"],
}

ndn.node_caches = NDN_NODE_CACHES