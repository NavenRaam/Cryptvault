from sqlalchemy.orm import Session
from .models import EncryptedFile


def store_file(db: Session, vault_id: str, encrypted_object: dict):
    record = EncryptedFile(
        vault_id=vault_id,
        file_id=encrypted_object["file_id"],
        version=encrypted_object["version"],
        ciphertext=encrypted_object["ciphertext"],
        encrypted_file_key=encrypted_object["encrypted_file_key"],
        iv_file=encrypted_object["iv_file"],
        iv_key=encrypted_object["iv_key"],
        search_tokens=encrypted_object["search_tokens"],
        filename=encrypted_object["filename"],
        mime_type=encrypted_object["mime_type"],
    )

    db.add(record)
    db.commit()


def search_files(db: Session, vault_id: str, search_token: str):
    return (
        db.query(EncryptedFile)
        .filter(
            EncryptedFile.vault_id == vault_id,
            EncryptedFile.search_tokens.any(search_token),
        )
        .all()
    )