CHUNK_SIZE_MB = 1

def chunk_file(file_item):
    """Simulate chunking a file into 1MB chunks with hashes."""
    try:
        size_mb = float(file_item["size"].split()[0])
    except Exception:
        size_mb = 1.0
    chunks = max(1, int(size_mb / CHUNK_SIZE_MB))
    return [
        {
            "index": i + 1,
            "name": f"{file_item['ndn_name']}/chunk/{i+1}",
            "size": f"{CHUNK_SIZE_MB} MB",
            "hash": f"chunk-{file_item['hash']}-{i+1}",
            "status": "received",
        }
        for i in range(chunks)
    ]
