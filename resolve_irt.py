import subprocess
import re
import urllib.parse
import time

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

irt_centers = [
    {"id": 1, "name": "IRT Driver Training Wing - Gummidipundi", "query": "IRT Driver Training Wing Gummidipundi"},
    {"id": 2, "name": "IRT Driver Training School - Trichy", "query": "TNSTC Periyamilaguparai Trichy"},
    {"id": 3, "name": "TNSTC HVDT Centre - Vellore", "query": "TNSTC Rangapuram Vellore"},
    {"id": 4, "name": "TNSTC HVDT Centre - Villupuram", "query": "TNSTC Head Office Salamedu Villupuram"},
    {"id": 5, "name": "TNSTC HVDT Centre - Kumbakonam", "query": "TNSTC Head Office Railway Station New Road Kumbakonam"},
    {"id": 6, "name": "TNSTC HVDT Centre - Karaikudi", "query": "TNSTC Maruthupathi Karaikudi"},
    {"id": 7, "name": "TNSTC HVDT Centre - Pudukottai", "query": "TNSTC Pillai Thanneer Panthal Pudukottai"},
    {"id": 8, "name": "TNSTC HVDT Centre - Pollachi", "query": "TNSTC Depot Coimbatore Road Pollachi"},
    {"id": 9, "name": "TNSTC HVDT Centre - Erode", "query": "TNSTC Depot Bhavani Erode"},
    {"id": 10, "name": "TNSTC HVDT Centre - Salem", "query": "TNSTC Ramakrishna Road Salem"},
    {"id": 11, "name": "TNSTC HVDT Centre - Dharmapuri", "query": "TNSTC Bharathipuram Dharmapuri"},
    {"id": 12, "name": "TNSTC HVDT Centre - Madurai", "query": "TNSTC Pasumalai Madurai"},
    {"id": 13, "name": "TNSTC HVDT Centre - Dindigul", "query": "TNSTC Nagal Nagar Dindigul"},
    {"id": 14, "name": "TNSTC HVDT Centre - Virudhunagar", "query": "TNSTC Kumarasamy Raja Nagar Virudhunagar"},
    {"id": 15, "name": "TNSTC HVDT Centre - Tirunelveli", "query": "TNSTC Vannarpet Tirunelveli"},
    {"id": 16, "name": "TNSTC HVDT Centre - Nagercoil", "query": "TNSTC Ranithottam Nagercoil"},
    {"id": 17, "name": "TNSTC HVDT Centre - Karur", "query": "TNSTC Manmangalam Karur"},
]

def resolve(item):
    query = item["query"]
    url = f"https://www.google.com/maps/search/{urllib.parse.quote(query)}"
    cmd = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--dump-dom",
        "--virtual-time-budget=6000",
        url
    ]
    try:
        proc = subprocess.run(cmd, capture_output=True, text=True, timeout=18, encoding='utf-8', errors='ignore')
        out = proc.stdout
        
        # Check !3d{lat}!4d{lon}
        c3d = re.findall(r'!3d(-?\d+\.\d{4,})!4d(-?\d+\.\d{4,})', out)
        if c3d:
            lat, lon = float(c3d[0][0]), float(c3d[0][1])
            if 8.0 <= lat <= 14.0 and 76.0 <= lon <= 81.0:
                print(f"[FOUND !3d!4d] {item['id']}. {item['name']} -> ({lat}, {lon})")
                return {"id": item["id"], "name": item["name"], "lat": lat, "lon": lon, "status": "ok"}
                
        # Check [null,null,lat,lon]
        cn = re.findall(r'\[null,null,(-?\d+\.\d{4,}),(-?\d+\.\d{4,})\]', out)
        for lat, lon in cn:
            flat, flon = float(lat), float(lon)
            if 8.0 <= flat <= 14.0 and 76.0 <= flon <= 81.0:
                print(f"[FOUND cn] {item['id']}. {item['name']} -> ({flat}, {flon})")
                return {"id": item["id"], "name": item["name"], "lat": flat, "lon": flon, "status": "ok"}
                
        # Check staticmap or any coords
        all_coords = re.findall(r'(\d{1,2}\.\d{4,8}),\s*(\d{2,3}\.\d{4,8})', out)
        for lat, lon in all_coords:
            flat, flon = float(lat), float(lon)
            if 8.0 <= flat <= 14.0 and 76.0 <= flon <= 81.0 and not (abs(flat-12.7479)<0.001 and abs(flon-80.1951)<0.001):
                print(f"[FOUND text] {item['id']}. {item['name']} -> ({flat}, {flon})")
                return {"id": item["id"], "name": item["name"], "lat": flat, "lon": flon, "status": "ok"}

        print(f"[NOT FOUND] {item['id']}. {item['name']} (query: {query})")
        return {"id": item["id"], "name": item["name"], "lat": None, "lon": None, "status": "missing"}
    except Exception as e:
        print(f"[ERROR] {item['id']}. {item['name']}: {e}")
        return {"id": item["id"], "name": item["name"], "lat": None, "lon": None, "status": f"error: {e}"}

if __name__ == '__main__':
    results = []
    for item in irt_centers:
        res = resolve(item)
        results.append(res)
        time.sleep(0.5)
    
    import json
    with open(r"d:\projects\gis-tnstc\irt_coords_result.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)
    print("Done! Saved to irt_coords_result.json")
