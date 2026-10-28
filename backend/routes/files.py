from fastapi import APIRouter
from data.seed import FILES, NODES
from services.file_service import chunk_file
from services.ndn_service import ndn

router = APIRouter(prefix="/api/files", tags=["files"])

@router.get("")
def list_files():
    return FILES

@router.get("/{file_id}")
def get_file(file_id: str):
    f = next((x for x in FILES if x["id"] == file_id), None)
    if not f:
        return {"error": "not found"}
    result = ndn.request_content(f["ndn_name"], NODES)
    return {
        "file": f,
        "chunks": chunk_file(f),
        "ndn_result": {
            "status": result["status"],
            "served_by": result["served_by"],
            "signature_verified": ndn.verify_signature(result["data"]),
        },
    }

@router.get("/{file_id}/chunks")
def get_chunks(file_id: str):
    f = next((x for x in FILES if x["id"] == file_id), None)
    return chunk_file(f) if f else []
