import uuid
import time

# In-memory session store (for now)
SESSIONS = {}

SESSION_TTL = 60 * 60  # 1 hour

def create_session():
    session_id = str(uuid.uuid4())
    SESSIONS[session_id] = {
        "created_at": time.time()
    }
    return {
        "session_id": session_id
    }
