from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from openai import OpenAI
from gtts import gTTS
import os
import base64

app = FastAPI()

# CORS für alle Domains (damit dein Frontend Zugriff hat)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenAI GPT-Zugang
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Statisches Frontend bereitstellen
app.mount("/static", StaticFiles(directory="frontend"), name="static")

@app.get("/", response_class=HTMLResponse)
async def serve_index():
    return FileResponse("frontend/index.html")

# Datenmodell für API-Anfragen
class TextRequest(BaseModel):
    text: str
    lang: str = "de"  # Standard: Deutsch

@app.post("/gpt")
async def generate_response(req: TextRequest):
    prompt = req.text.strip()
    sprache = req.lang
    if sprache == "de":
        system_prompt = (
            "Du bist eine barrierefreie Kommunikationshilfe für eine nichtsprechende Person "
            "aus der deutschsprachigen Schweiz. Gib 3 höfliche, einfache Sätze als Vorschläge. "
            "Keine Nummerierung."
        )
    elif sprache == "es":
        system_prompt = (
            "Eres una herramienta de comunicación accesible para una persona que no puede hablar "
            "en Suiza de habla alemana. La persona quiere comunicarse en español. Da 3 frases amables y simples. "
            "No uses numeración ni introducción."
        )
    else:
        system_prompt = "Gib 3 einfache Vorschläge."

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": prompt}
    ]
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            n=1,
            max_tokens=500
        )
        answer = response.choices[0].message.content.strip()
        lines = [s.strip("- ").strip() for s in answer.split("\n") if s.strip() and not s.strip()[0].isdigit()]
        return {"suggestions": lines[:3]}
    except Exception as e:
        return {"error": str(e)}

@app.post("/tts")
async def synthesize_speech(req: TextRequest):
    try:
        tts = gTTS(req.text, lang=req.lang if req.lang in ["de", "es"] else "de")
        tts.save("output.mp3")
        with open("output.mp3", "rb") as f:
            audio = base64.b64encode(f.read()).decode()
        return {"audio": audio}
    except Exception as e:
        return {"error": str(e)}