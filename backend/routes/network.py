from fastapi import APIRouter
from data.seed import NODES

router = APIRouter(prefix="/api/network", tags=["network"])

@router.get("/nodes")
def nodes():
    return NODES

@router.get("/status")
def status():
    online = [n for n in NODES if n["status"] == "online"]
    return {
        "total": len(NODES),
        "online": len(online),
        "offline": len(NODES) - len(online),
        "nodes": NODES,
    }

@router.post("/nodes/{node_id}/toggle")
def toggle(node_id: str):
    for n in NODES:
        if n["id"] == node_id:
            n["status"] = "offline" if n["status"] == "online" else "online"
            return n
    return {"error": "not found"}
