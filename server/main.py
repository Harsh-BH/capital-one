import os
import uvicorn
from fastapi import FastAPI , UplaodFile , File , Form , HTTPException

from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional , List , Dict , Any



app = FastAPI(title = "Multi-Modal AI Server")

app.add_middleware(
    CORSMiddleware , 
    allow_origins = ["*"] ,
    allow_credentials = True ,
    allow_methods = ["*"] ,
    allow_headers = ["*"]
)

UPLOAD_DIR = "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

class QuestionRequest(BaseModel):
    question:str
    context:Optional[str] = None


class DocumentProcessRequest(BaseModel):
    document_id:str
    query:Optional[str] = None


class ModelResponse(BaseModel):
    response: str
    model_type: str
    confidence : Optional[float] = None
    metadata: Optional[Dict[str,Any]] = None



class ModelRouter:
    def __init__(self):

        self.rag_model = RagModel()
        self.qa_model = QAModel()
        self.vision_model = VisionModel()

    def route_question(self , question : str , context: Optional[str] = None)->ModelResponse:
        if context:

            return ModelResponse(
                response = f"Rag Model answer for{question}",
                model_type = "RAG",
                confidence = 0.95,
                metadata = {"conext_len": len(context)}
            )
        else:
            return ModelResponse(
                response = f"QA Model answer for {question}",
                model_type = "QA",
                confidence = 0.90
            )
    

    def process_document(self , file_path:str)->ModelResponse:

        return 
    
    ## rag implemntation will be there


    def process_media(self ,file_path:str , media_type:str)->ModelResponse:

        return ModelResponse()


        ## code will be there 




model_router = ModelRouter()


@app.get("/")
def read_root():
    return {"message": "Welcome to the Multi-Modal AI Server"}


@app.post("/question", response_model = ModelResponse)

async def handle_question(request: QuestionRequest):

    try:
        response = model_router.route_question(request.question , request.context)

        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/upload/document" , response_model = ModelResponse)
async def upload_document(file : UplaodFile = File(...)):

    try:
        allowed_extensions = [".pdf" , ".txt" , ".docx" , ".md"]

        file_extension = Path(file.filename).suffix.lower()

        if file_extension not in allowed_extensions:
            raise HTTPException(status_code = 400 , detail = "Unsupported file type")

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        unique_id = str(uuid.uuid64())[:8]

        save_path = UPLOAD_DIR / f"doc_{timestamp}_{unique_id}{file_extension}"
        

        with open(save_path,"wb") as buffer:
            shutil.copyfileobj(file.file , buffer)

        return model_router.process_document(str(save_path))

    except Exception as e:
        raise HTTPException(status_code = 500 , detail = f"error processing document:{str(e)}")


@app.post("/upload/media" , response_model = ModelResponse)
async def upload_media(
    file : UploadFIle = File(...),
    media_type = str = Form(...)
):

    try:
        if media_type not in ["audio" , "video"]:
            raise HTTPException(status_code = 400 , detail = "Media type msut be 'audio' or 'video'")

        file_extension = Path(file.filename).suffix.lower()

        audio_extensions = [".mp3", ".wav", ".ogg", ".m4a"]
        video_extensions = [".mp4", ".avi", ".mov", ".mkv"]

        if media_type == "audio" and file_extension not in audio_extensions:
            raise HTTPException(status_code = 400 , detail = "Unsupported audio format")

        if media_type == "video" and file_extension not in video_extensions:
            raise HTTPException(status_code = 400 , detail = "Unsupported video format")


        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        unique_id = str(uuid.uuid4())[:8]
        save_path = UPLOAD_DIR / f"{media_type}_{timestamp}_{unique_id}{file_extension}"
        
        # Save uploaded file
        with open(save_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Process the media file
        return model_router.process_media(str(save_path), media_type)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing media: {str(e)}")

if __name__ =="main":
    port = int(os.getenv("PORT",8000))
    uvicorn.run("main:app",host = "0.0.0.0" , port = port , reload = True)
        












