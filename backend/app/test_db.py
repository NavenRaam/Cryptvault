from .database import engine

try:
    with engine.connect() as conn:
        print("PostgreSQL connection successful!")
except Exception as e:
    print("Database connection failed:", e)
