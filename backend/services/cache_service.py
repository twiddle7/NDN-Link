from services.ndn_service import ndn

def get_cache_stats(nodes):
    total_cached = sum(n["cached"] for n in nodes)
    total_hits   = sum(n["cache_hits"] for n in nodes)
    total_reqs   = sum(n["requests"] for n in nodes)
    hit_rate = round((total_hits / total_reqs) * 100, 1) if total_reqs else 0
    return {
        "hit_rate": hit_rate,
        "cached_objects": total_cached,
        "bandwidth_saved_mb": round(total_hits * 0.32, 1),
        "hits": total_hits,
        "misses": total_reqs - total_hits,
        "ndn": ndn.get_cache_status(),
    }
