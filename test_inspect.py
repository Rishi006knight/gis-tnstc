import subprocess
import re
import urllib.parse
import json

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def search_maps(query):
    url = f"https://www.google.com/maps/search/{urllib.parse.quote(query)}"
    cmd = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--dump-dom",
        "--virtual-time-budget=8000",
        url
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True, timeout=25, encoding='utf-8', errors='ignore')
    out = proc.stdout
    
    # 1. Look for !3d{lat}!4d{lon}
    c3d = re.findall(r'!3d(-?\d+\.\d{4,})!4d(-?\d+\.\d{4,})', out)
    if c3d:
        return float(c3d[0][0]), float(c3d[0][1]), "!3d!4d"
        
    # 2. Look for [null,null,lat,lon]
    cn = re.findall(r'\[null,null,(-?\d+\.\d{4,}),(-?\d+\.\d{4,})\]', out)
    if cn:
        # filter out default google maps center (e.g. US center 37.0625, -95.677)
        for lat, lon in cn:
            flat, flon = float(lat), float(lon)
            if 8.0 <= flat <= 14.0 and 76.0 <= flon <= 81.0:
                return flat, flon, "[null,null]"
                
    # 3. Look for coordinates in any link or text in Tamil Nadu bounding box
    all_coords = re.findall(r'(\d{1,2}\.\d{4,8}),\s*(\d{2,3}\.\d{4,8})', out)
    for lat, lon in all_coords:
        flat, flon = float(lat), float(lon)
        if 8.0 <= flat <= 14.0 and 76.0 <= flon <= 81.0:
            return flat, flon, "bbox"
            
    return None, None, "not found"

if __name__ == '__main__':
    queries = [
        "Hotel Anantha Bhavan Idaiseval NH 44 Kovilpatti",
        "Hotel Sri Balaji Ariyas Gedilam Ulundurpet",
        "Hotel Sri Balaji Bhavan Ulundurpet NH 45",
        "IRT Driver Training School Trichy",
        "TNSTC HVDT Centre Vellore Rangapuram",
        "TNSTC Head Office Villupuram Salamedu",
        "TNSTC Kumbakonam Head Office",
        "TNSTC Pasumalai Madurai",
        "TNSTC Ranithottam Nagercoil"
    ]
    for q in queries:
        lat, lon, method = search_maps(q)
        print(f"Result: {q} => ({lat}, {lon}) via {method}")
