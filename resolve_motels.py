import subprocess
import re
import urllib.parse
import json
import time

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

motels = [
    {"id": 1, "name": "Hotel Anantha Bhavan", "query": "Hotel Anantha Bhavan Idaiseval NH 44 Kovilpatti", "fallback_query": "Idaiseval Kovilpatti NH 44"},
    {"id": 2, "name": "Hotel Sri Balaji Ariyas", "query": "Hotel Sri Balaji Ariyas Gedilam Ulundurpet", "fallback_query": "Sengurichi Toll Plaza Ulundurpet NH 45"},
    {"id": 3, "name": "Indian High Way Motel", "query": "Indian High Way Motel Dharapuram Oddanchatram", "fallback_query": "Oddanchatram Bypass Dharapuram Tirupur"},
    {"id": 4, "name": "Hotel Ramesh", "query": "Hotel Ramesh Melakaranthai Thoothukkudi", "fallback_query": "Melakaranthai Madurai Road Thoothukkudi"},
    {"id": 5, "name": "Pandian Motel", "query": "Pandian Motel Marungapuri Sethupatty Trichy", "fallback_query": "Sethupatty Marungapuri Trichy NH 38"},
    {"id": 6, "name": "Siv Murugaa Restaurants", "query": "Siv Murugaa Restaurant Pavithiram Karur", "fallback_query": "Pavithiram Covai Road Karur"},
    {"id": 7, "name": "Hotel Udhaya", "query": "Hotel Udhaya Billanakuppam Krishnagiri NH 44", "fallback_query": "Billanakuppam Polupalli Krishnagiri NH 44"},
    {"id": 8, "name": "Sri Saravana Bavan", "query": "Sri Saravana Bavan Kurubarapalli Krishnagiri", "fallback_query": "Kurubarapalli Krishnagiri NH 44"},
    {"id": 9, "name": "Hotel Anandhaas", "query": "Hotel Anandhaas Kallar Mettupalayam Ooty Road", "fallback_query": "Kallar Railway Gate Mettupalayam"},
    {"id": 10, "name": "Hotel Surya", "query": "Hotel Surya Billanakuppam Krishnagiri NH 44", "fallback_query": "Surya Complex Billanakuppam Krishnagiri"},
    {"id": 11, "name": "Hotel Shree Ananda Bhavan", "query": "Hotel Shree Ananda Bhavan Billanakuppam Krishnagiri", "fallback_query": "Periyapulivarisai Billanakuppam Krishnagiri"},
    {"id": 12, "name": "Annapurna Hotel", "query": "Annapurna Hotel Pondi Alamelumangapuram Thiruvallur", "fallback_query": "Kesavaraja Kuppam TT Kandigai Thiruvallur"},
    {"id": 13, "name": "Hotel Shree Saravana Bavan", "query": "Hotel Shree Saravana Bavan Bandarapalli Krishnagiri", "fallback_query": "Bandarapalli Billanakuppam Krishnagiri NH 44"},
    {"id": 14, "name": "Sri Balaji Bhavan", "query": "Sri Balaji Bhavan Oddanchatram Dindigul", "fallback_query": "Oddanchatram Dindigul Main Road"},
    {"id": 15, "name": "Atchaya Bakery & Hotel", "query": "Atchaya Bakery Hotel Zamin Alamarathupatti Karur", "fallback_query": "Zamin Alamarathupatti Karur NH 44"},
    {"id": 16, "name": "Hotel Krishna Bhavan", "query": "Hotel Krishna Bhavan Achiyur Dharapuram Tirupur", "fallback_query": "Achiyur Dharapuram Dindigul Road Tirupur"},
    {"id": 17, "name": "Gayathri Bhavan", "query": "Gayathri Bhavan Melpettai Tindivanam NH 45", "fallback_query": "Salavathi Melpettai Tindivanam GST Road"},
    {"id": 18, "name": "Sri Ambayiram", "query": "Sri Ambayiram Chinnasalem Kallakurichi", "fallback_query": "Chinnasalem Salem Cuddalore Main Road"},
    {"id": 19, "name": "Agathiyar Hotel & Tea Park", "query": "Agathiyar Hotel Tea Park Ponnambalampatti Toll Vaiyampatti Manapparai", "fallback_query": "Ponnambalampatti Toll Plaza Vaiyampatti Manapparai"},
    {"id": 20, "name": "Ananda Bhavan A/C", "query": "Ananda Bhavan Vaikundam Toll Plaza Sankari Salem NH 544", "fallback_query": "Vaikundam Toll Plaza Sankari Salem"},
    {"id": 21, "name": "Sree Mutharamman Hotel Saravana Bhavan", "query": "Sree Mutharamman Hotel Saravana Bhavan Puthalapattu Chittoor", "fallback_query": "Veppanapalli Puthalapattu Chittoor NH 140"},
    {"id": 22, "name": "Sri Aiswarya Hotel", "query": "Sri Aiswarya Hotel Thennilai Karur Kovai Road", "fallback_query": "Thennilai Kovai Main Road Karur"},
    {"id": 23, "name": "Karthika Chettinadu Mess", "query": "Karthika Chettinadu Mess Thottampatti Pugalur Karur", "fallback_query": "Thottampatti Pugalur Karur NH 81"},
    {"id": 24, "name": "Hotel Aryaas", "query": "Hotel Aryaas Vijayamangalam Toll Gate Erode NH 544", "fallback_query": "Vijayamangalam Toll Plaza Erode NH 544"},
    {"id": 25, "name": "Sree Mutharamman Hotel Saravana Bhavan (Return)", "query": "Sree Mutharamman Hotel Saravana Bhavan Kothakota Puthalapattu Chittoor", "fallback_query": "Vemu Institute Kothakota Puthalapattu Chittoor"},
    {"id": 26, "name": "Hotel Vasantha Bhavan", "query": "Hotel Vasantha Bhavan Reliance Padur Ulundurpet NH 45", "fallback_query": "Padur Ulundurpet Chennai Trichy Highway"},
    {"id": 27, "name": "Hotel Sri Akash Bhavan", "query": "Hotel Sri Akash Bhavan Kollar Mailam Tindivanam", "fallback_query": "Kollar Mailam Gingee Tindivanam Road"},
    {"id": 28, "name": "Sri Sai Saravana Bavan", "query": "Sri Sai Saravana Bavan Kangeyam Bus Stand Tirupur", "fallback_query": "Kangeyam Bus Stand Tirupur"},
    {"id": 29, "name": "Hotel Srinivasa", "query": "Hotel Srinivasa Adaikkalapuram V Salai Vikravandi NH 45", "fallback_query": "V Salai Vikravandi Chennai Trichy Highway"},
    {"id": 30, "name": "Hotel ECR Inn", "query": "Hotel ECR Inn Kadappakkam Cheyyur ECR", "fallback_query": "Kadappakkam Cheyyur ECR Chengalpattu"},
    {"id": 31, "name": "Bairavi Hotel", "query": "Bairavi Hotel Chengapalli Tirupur NH 544", "fallback_query": "Chengapalli Tirupur NH 544 Bypass"},
    {"id": 32, "name": "Hotel Ganesh Bhavan", "query": "Hotel Ganesh Bhavan V Salai Vikravandi NH 45", "fallback_query": "Adaikkalapuram V Salai Vikravandi"},
    {"id": 33, "name": "Hotel Senthur", "query": "Hotel Senthur Marakkanam ECR Main Road Villupuram", "fallback_query": "Marakkanam ECR Villupuram"},
    {"id": 34, "name": "Hotel Sree Annapoorna", "query": "Hotel Sree Annapoorna Adaikkalapuram Vikravandi NH 45", "fallback_query": "Adaikkalapuram Vikravandi Chennai Trichy Highway"},
    {"id": 35, "name": "Hotel Sri Aboorva", "query": "Hotel Sri Aboorva Kappiyampuliyur Vikravandi NH 32", "fallback_query": "Vadakuchipalayam Kappiyampuliyur Vikravandi"},
    {"id": 36, "name": "Hotel New Aristo", "query": "Hotel New Aristo Sithani Vikravandi NH 45", "fallback_query": "Sithani Chittani Vikravandi NH 45"},
    {"id": 37, "name": "Hotel Archana", "query": "Hotel Archana Sithani Opp Veedur Dam Tindivanam NH 45", "fallback_query": "Veedur Dam Sithani Tindivanam Bypass NH 45"},
    {"id": 38, "name": "Sri Anandha Bhavan", "query": "Sri Anandha Bhavan Pathirapuliyur Vikravandi NH 45", "fallback_query": "Pathirapuliyur Vikravandi Chennai Trichy Road"},
    {"id": 39, "name": "Hotel Sri Saravana Bhavan", "query": "Hotel Sri Saravana Bhavan Vikravandi Toll Plaza NH 45", "fallback_query": "Vikravandi Toll Plaza Chennai Trichy NH 45"},
    {"id": 40, "name": "Nellai Ariyas (Northbound)", "query": "Nellai Ariyas Pandalgudi Virudhunagar NH 38", "fallback_query": "Pandalgudi Virudhunagar NH 38"},
    {"id": 41, "name": "Reiyan Shika Unavagam", "query": "Reiyan Shika Unavagam Thulukkapatti RR Nagar Virudhunagar", "fallback_query": "Thulukkapatti RR Nagar Virudhunagar NH 44"},
    {"id": 42, "name": "Nellai Ariyas (Southbound)", "query": "Nellai Ariyas Melakaranthai Thoothukkudi NH 38", "fallback_query": "Melakaranthai Madurai Road Thoothukkudi NH 38"},
    {"id": 43, "name": "Hotel Hari Bhavan & Iniya Cafe", "query": "Hotel Hari Bhavan Iniya Cafe Thethupatti Karur NH 44", "fallback_query": "Thethupatti Bangarpadi Pirivu Karur NH 44"},
    {"id": 44, "name": "Hotel Aarathi", "query": "Hotel Aarathi Salarapatty Vedasandur Dindigul NH 44", "fallback_query": "Salarapatty Vedasandur Dindigul NH 44"},
    {"id": 45, "name": "Hotel Janani", "query": "Hotel Janani Pondipadi Thiruttani Thiruvallur NH 716", "fallback_query": "Pondipadi Thiruttani Thiruvallur NH 716"},
    {"id": 46, "name": "Hotel Sri Saravana Jothi", "query": "Hotel Sri Saravana Jothi Chinnasalem Kallakurichi", "fallback_query": "Chinnasalem Thathathiripuram Salem Main Road"},
    {"id": 47, "name": "J P Hotel", "query": "J P Hotel Baluchetti Chathiram Kanchipuram NH 48", "fallback_query": "Baluchetti Chathiram Kanchipuram Chennai Bangalore Road"},
    {"id": 48, "name": "Hotel Sri Gowri Vilas", "query": "Hotel Sri Gowri Vilas Paramankeni Cheyyur ECR", "fallback_query": "Paramankeni Cheyyur ECR Chengalpattu"},
    {"id": 49, "name": "Panama Hotel", "query": "Panama Hotel Oppilan Vilakku Kadaladi ECR Ramanathapuram", "fallback_query": "Oppilan Vilakku Kadaladi Kadugasanthai ECR"},
    {"id": 50, "name": "Saravanan Bhavan Hotel", "query": "Hotel Saravana Bhavan Pallakkapalayam Excel College Namakkal NH 544", "fallback_query": "Excel College Pallakkapalayam Salem Covai Bypass"},
    {"id": 51, "name": "Shri Balaji Bhavan", "query": "Shri Balaji Bhavan Bandarapalli Krishnagiri NH 44", "fallback_query": "Bandarapalli Veppanapalli Krishnagiri NH 44"},
    {"id": 52, "name": "Thangam Hotel", "query": "Thangam Hotel Harur Dharmapuri SH 18", "fallback_query": "Sakkilipatti Harur Dharmapuri Salem Vellore Highway"},
    {"id": 53, "name": "Sri Durgai Mess", "query": "Sri Durgai Mess Kondapuram Kaveripakkam Ranipet NH 48", "fallback_query": "Kondapuram Kaveripakkam Vellore Chennai NH 48"},
    {"id": 54, "name": "Meenakshi Bhavan", "query": "Meenakshi Bhavan Batlagundu Dindigul NH 183", "fallback_query": "Batlagundu Dindigul Main Road NH 183"},
    {"id": 55, "name": "Pandian Motel (Marungapuri)", "query": "Pandian Motel Kallupatti Marungapuri Trichy NH 38", "fallback_query": "Kallupatti Marungapuri Trichy Madurai Corridor"},
    {"id": 56, "name": "Shre Krishnaa Hotel", "query": "Shre Krishnaa Hotel Melumalai Shoolagiri Krishnagiri NH 44", "fallback_query": "Melumalai Shoolagiri Krishnagiri NH 44"},
    {"id": 57, "name": "Hotel Meenachi", "query": "Hotel Meenachi Saram Tindivanam GST Road NH 45", "fallback_query": "Saram Village Tindivanam Olakkur GST Road NH 45"},
]

def search_query(query):
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
        c3d = re.findall(r'!3d(-?\d+\.\d{4,})!4d(-?\d+\.\d{4,})', out)
        if c3d:
            lat, lon = float(c3d[0][0]), float(c3d[0][1])
            if 8.0 <= lat <= 14.0 and 76.0 <= lon <= 81.0:
                return lat, lon, "!3d!4d"
        cn = re.findall(r'\[null,null,(-?\d+\.\d{4,}),(-?\d+\.\d{4,})\]', out)
        for lat, lon in cn:
            flat, flon = float(lat), float(lon)
            if 8.0 <= flat <= 14.0 and 76.0 <= flon <= 81.0:
                return flat, flon, "cn"
        all_coords = re.findall(r'(\d{1,2}\.\d{4,8}),\s*(\d{2,3}\.\d{4,8})', out)
        for lat, lon in all_coords:
            flat, flon = float(lat), float(lon)
            if 8.0 <= flat <= 14.0 and 76.0 <= flon <= 81.0 and not (abs(flat-12.7479)<0.001 and abs(flon-80.1951)<0.001):
                return flat, flon, "text"
        return None, None, "none"
    except Exception as e:
        return None, None, str(e)

def resolve_motel(item):
    lat, lon, method = search_query(item["query"])
    if lat is None and "fallback_query" in item:
        lat, lon, method = search_query(item["fallback_query"])
    if lat is not None:
        print(f"[FOUND {method}] {item['id']}. {item['name']} -> ({lat}, {lon})")
        return {"id": item["id"], "name": item["name"], "lat": lat, "lon": lon, "status": "ok"}
    else:
        print(f"[NOT FOUND] {item['id']}. {item['name']}")
        return {"id": item["id"], "name": item["name"], "lat": None, "lon": None, "status": "missing"}

if __name__ == '__main__':
    results = []
    for m in motels:
        res = resolve_motel(m)
        results.append(res)
        time.sleep(0.3)
    with open(r"d:\projects\gis-tnstc\motels_coords_result.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)
    print("All 57 motels processed! Saved to motels_coords_result.json")
