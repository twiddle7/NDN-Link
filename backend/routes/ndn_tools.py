"""
NDN Tools — endpoints that expose the actual NDN protocol concepts.
"""

from fastapi import APIRouter
from pydantic import BaseModel
import hashlib
import time
from services.ndn_service import ndn
from data.seed import FILES, NODES

router = APIRouter(prefix="/api/ndn", tags=["ndn"])


@router.get("/packets/{file_id}")
def get_packets(file_id: str):
    f = next((x for x in FILES if x["id"] == file_id), None)
    if not f:
        return {"error": "file not found"}

    interest = {
        "type": "Interest",
        "name": f["ndn_name"],
        "must_be_fresh": True,
        "lifetime_ms": 4000,
        "hop_limit": 32,
        "nonce": hashlib.sha256(f"{f['id']}{time.time()}".encode()).hexdigest()[:8],
        "timestamp": time.strftime("%H:%M:%S"),
    }

    result = ndn.request_content(f["ndn_name"], NODES)
    data_obj = result["data"]

    data = {
        "type": "Data",
        "name": f["ndn_name"],
        "content_type": "Blob",
        "freshness_ms": 5000,
        "signature_type": "SHA256withECDSA",
        "hash": data_obj.get("hash", ""),
        "signed": data_obj.get("signed", False),
        "served_by": result["served_by"],
        "status": result["status"],
        "cached": result["served_by"] not in ("producer", "no-node-online"),
    }

    return {"interest": interest, "data": data}


@router.get("/naming")
def get_naming_scheme():
    return {
        "examples": [
            {
                "name": "/college/cn/teamA/files/project-report.pdf",
                "components": [
                    {"part": "college", "meaning": "Campus"},
                    {"part": "cn", "meaning": "Subject (Computer Networks)"},
                    {"part": "teamA", "meaning": "Team prefix"},
                    {"part": "files", "meaning": "Content type"},
                    {"part": "project-report.pdf", "meaning": "File name"},
                ],
            },
            {
                "name": "/ndn-link/chat/computer-networks/message/001",
                "components": [
                    {"part": "ndn-link", "meaning": "Application"},
                    {"part": "chat", "meaning": "Chat subsystem"},
                    {"part": "computer-networks", "meaning": "Room"},
                    {"part": "message", "meaning": "Message type"},
                    {"part": "001", "meaning": "Sequence number"},
                ],
            },
        ],
        "rules": [
            "Hierarchical, like URLs but not locations",
            "Content is addressed by name, not IP",
            "/college/cn/teamA = producer prefix",
            "/chunk/N = file chunk",
            "Names are signed and verifiable",
        ],
    }


@router.get("/tables")
def get_ndn_tables():
    cache_status = ndn.get_cache_status()
    fib = [
        {"prefix": n["ndn_prefix"], "next_hop": n["name"], "status": n["status"]}
        for n in NODES
    ]
    return {
        "cs": {
            "name": "Content Store",
            "description": "Data packets this node has cached",
            "count": cache_status["objects"],
            "objects": cache_status["names"][:10],
        },
        "pit": {
            "name": "Pending Interest Table",
            "description": "Interests waiting for Data",
            "count": cache_status["pit_entries"],
            "entries": list(ndn.pit.keys())[:10],
        },
        "fib": {
            "name": "Forwarding Information Base",
            "description": "Routes for name prefixes",
            "count": len(fib),
            "entries": fib,
        },
    }


class TamperRequest(BaseModel):
    file_id: str


@router.post("/tamper")
def tamper_test(body: TamperRequest):
    f = next((x for x in FILES if x["id"] == body.file_id), None)
    if not f:
        return {"error": "file not found"}

    original_content = f"Simulated content for {f['ndn_name']}"
    original_hash = hashlib.sha256(original_content.encode()).hexdigest()[:12]
    tampered_content = original_content + " [MODIFIED BY ATTACKER]"
    tampered_hash = hashlib.sha256(tampered_content.encode()).hexdigest()[:12]

    return {
        "file": f["name"],
        "ndn_name": f["ndn_name"],
        "original": {
            "content": original_content,
            "hash": original_hash,
            "signature": "verified",
            "status": "ACCEPTED",
        },
        "tampered": {
            "content": tampered_content,
            "hash": tampered_hash,
            "signature": "MISMATCH",
            "status": "REJECTED",
        },
        "verdict": "Content modified in transit. Hash mismatch detected. Delivery blocked.",
    }


@router.get("/aggregation")
def aggregation_demo():
    return {
        "consumers": ["Devika", "Kriswin", "Hrithik"],
        "requested_name": "/college/cn/teamA/files/project-report.pdf",
        "interests_sent_by_consumers": 3,
        "interests_forwarded_upstream": 1,
        "explanation": (
            "In NDN, if multiple consumers request the same content at the same time, "
            "the PIT aggregates them. Only one Interest is forwarded upstream. "
            "When Data returns, it is delivered to all requesters. "
            "This saves bandwidth — TCP would have created three separate connections."
        ),
    }
