from sqlalchemy import ARRAY, Column, Integer, String, JSON
from .database import Base

class EncryptedFile(Base):
    __tablename__ = "encrypted_files"

    id = Column(Integer, primary_key=True, index=True)

    # Session isolation
    session_id = Column(String, index=True)

    # Metadata
    file_id = Column(String, index=True)
    version = Column(Integer)

    # Encrypted content
    ciphertext = Column(String)
    encrypted_file_key = Column(String)

    # IVs
    iv_file = Column(String)
    iv_key = Column(String)

    # Searchable encryption beacons
    search_tokens = Column(ARRAY(String))
