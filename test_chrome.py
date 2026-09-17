import subprocess
import re
import urllib.parse

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def get_google_maps_coords(query):
    url = f"https://www.google.com/maps/search/{urllib.parse.quote(query)}"
    cmd = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--dump-dom",
        "--virtual-time-budget=7000",
        url
    ]
    try:
        proc = subprocess.run(cmd, capture_output=True, text=True, timeout=25, encoding='utf-8', errors='ignore')
        out = proc.stdout
        # Search for !3d{lat}!4d{lon}
        coords = re.findall(r'!3d(-?\d+\.\d{4,})!4d(-?\d+\.\d{4,})', out)
        if coords:
            lat, lon = coords[0]
            print(f"[FOUND !3d!4d] {query} -> ({lat}, {lon})")
            return float(lat), float(lon)
        
        # Fallback: /@lat,lon or [null,null,lat,lon]
        coords_alt = re.findall(r'\[null,null,(-?\d+\.\d{4,}),(-?\d+\.\d{4,})\]', out)
        if coords_alt:
            lat, lon = coords_alt[0]
            print(f"[FOUND alt] {query} -> ({lat}, {lon})")
            return float(lat), float(lon)
            
        print(f"[NOT FOUND] {query}")
        return None
    except Exception as e:
        print(f"[ERROR] {query}: {e}")
        return None

if __name__ == '__main__':
    get_google_maps_coords("Hotel Anantha Bhavan Idaiseval")
    get_google_maps_coords("Hotel Sri Balaji Ariyas Gedilam Ulundurpet")
    get_google_maps_coords("IRT Driver Training Wing Gummidipundi")

