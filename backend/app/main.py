from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import init_db

from .database import SessionLocal
from .storage import store_file, search_files

app = FastAPI(title="CryptVault Backend")

@app.on_event("startup")
def startup():
    init_db()

# CORS (frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔐 Zero-Knowledge Upload
@app.post("/upload")
def upload_file(payload: dict, db: Session = Depends(get_db)):

    vault_id = payload.get("vault_id")
    encrypted_object = payload.get("data")

    if not vault_id or not encrypted_object:
        raise HTTPException(status_code=400, detail="Invalid payload")

    store_file(db, vault_id, encrypted_object)
    return {"status": "stored"}


# 🔍 Blind Search
@app.post("/search")
def search(payload: dict, db: Session = Depends(get_db)):
    vault_id = payload.get("vault_id")
    search_token = payload.get("search_token")

    if not vault_id or not search_token:
        raise HTTPException(status_code=400, detail="Invalid payload")

    results = search_files(db, vault_id, search_token)

    return {
        "results": [
            {
                "file_id": r.file_id,
                "ciphertext": r.ciphertext,
                "encrypted_file_key": r.encrypted_file_key,
                "iv_file": r.iv_file,
                "iv_key": r.iv_key,
                "search_tokens": r.search_tokens,
                "version": r.version,
            }
            for r in results
        ]
    }