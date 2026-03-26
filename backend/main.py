from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.rebrickable_service import get_set_data

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "BrickAlpha backend is running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/sets/{set_num}")
def get_set(set_num: str):
    try:
        set_data = get_set_data(set_num)
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching set data: {str(e)}")
    
    if not set_data:
        raise HTTPException(status_code=404, detail="Set not found")
    
    return set_data