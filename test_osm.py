import requests
import json

headers = {'User-Agent': 'TNSTCGISPortal/2.0 (contact: info@tnstc.tn.gov.in)'}

def search_osm(query):
    url = f"https://nominatim.openstreetmap.org/search?q={requests.utils.quote(query)}&format=json&limit=3&countrycodes=in"
    try:
        r = requests.get(url, headers=headers, timeout=5)
        if r.status_code == 200 and r.json():
            data = r.json()[0]
            print(f"OSM for '{query}': {data['display_name'][:60]} -> {data['lat']}, {data['lon']}")
            return float(data['lat']), float(data['lon'])
    except Exception as e:
        print(f"OSM err {query}: {e}")
    return None, None

if __name__ == '__main__':
    search_osm("TNSTC Karaikudi")
    search_osm("TNSTC Pudukkottai")
    search_osm("TNSTC Dharmapuri")
    search_osm("TNSTC Pasumalai Madurai")
    search_osm("TNSTC Nagal Nagar Dindigul")
    search_osm("TNSTC Virudhunagar")
    search_osm("TNSTC Vannarpet Tirunelveli")
    search_osm("TNSTC Ranithottam Nagercoil")
    search_osm("TNSTC Karur")
