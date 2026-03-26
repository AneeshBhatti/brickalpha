import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("REBRICKABLE_API_KEY")
BASE_URL = "https://rebrickable.com/api/v3/lego/sets"


def get_set_data(set_num: str):
    if not API_KEY:
        raise ValueError("Missing REBRICKABLE_API_KEY in .env")

    url = f"{BASE_URL}/{set_num}/"
    headers = {
        "Authorization": f"key {API_KEY}"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 404:
        return None

    response.raise_for_status()
    data = response.json()

    return {
        "set_num": data.get("set_num"),
        "name": data.get("name"),
        "year": data.get("year"),
        "theme_id": data.get("theme_id"),
        "num_parts": data.get("num_parts"),
        "set_img_url": data.get("set_img_url"),
    }