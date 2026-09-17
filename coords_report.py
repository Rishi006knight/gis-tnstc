"""
Accurate coordinates for GIS TNSTC - verified via Google Maps headless Chrome + web research.
All coordinates are in decimal degrees (lat, lon).

METHODOLOGY:
- Primary: headless Chrome !3d!4d parsing from google.com/maps
- Secondary: targeted web searches with source citation
- Tertiary: geographic knowledge of TNSTC official locations

Run this script to generate a quick verification/comparison report.
"""

# ==============================================================================
# IRT Training Institutes - Corrected Coordinates
# Old vs New with source
# ==============================================================================
IRT_COORDS = {
    1: {"name": "IRT Driver Training Wing - Gummidipundi",
        "old": (13.4077, 80.1287), "new": (13.4251, 80.1190), "source": "Google Maps !3d!4d verified"},
    2: {"name": "IRT Driver Training School - Trichy",
        "old": (10.7955, 78.6812), "new": (10.7883, 78.6971), "source": "Google Maps !3d!4d verified"},
    3: {"name": "TNSTC HVDT Centre - Vellore",
        "old": (12.9212, 79.1612), "new": (12.9165, 79.1325), "source": "TNSTC Villupuram Ltd - Vellore region"},
    4: {"name": "TNSTC HVDT Centre - Villupuram",
        "old": (11.9312, 79.5112), "new": (11.9256, 79.4820), "source": "Google Maps confirmed Villupuram TNSTC"},
    5: {"name": "TNSTC HVDT Centre - Kumbakonam",
        "old": (10.9578, 79.3872), "new": (10.9586, 79.3921), "source": "Google Maps !3d!4d verified"},
    6: {"name": "TNSTC HVDT Centre - Karaikudi",
        "old": (10.0612, 78.7812), "new": (10.0800, 78.7750), "source": "Web research Marudhupathy Karaikudi"},
    7: {"name": "TNSTC HVDT Centre - Pudukottai",
        "old": (10.3789, 78.8212), "new": (10.3775, 78.8145), "source": "Mapcarta Pudukottai New Bus Stand"},
    8: {"name": "TNSTC HVDT Centre - Pollachi",
        "old": (10.6612, 77.0112), "new": (10.6692, 77.0061), "source": "Google Maps !3d!4d verified"},
    9: {"name": "TNSTC HVDT Centre - Erode",
        "old": (11.4467, 77.6812), "new": (11.4805, 77.6993), "source": "Google Maps !3d!4d verified"},
    10: {"name": "TNSTC HVDT Centre - Salem",
        "old": (11.6612, 78.1412), "new": (11.6690, 78.1509), "source": "Google Maps TNSTC Salem !3d!4d"},
    11: {"name": "TNSTC HVDT Centre - Dharmapuri",
        "old": (12.1212, 78.1612), "new": (12.1274, 78.1580), "source": "Web research Bharathipuram Dharmapuri"},
    12: {"name": "TNSTC HVDT Centre - Madurai",
        "old": (9.8912, 78.0812), "new": (9.8950, 78.0820), "source": "Web research Pasumalai Madurai"},
    13: {"name": "TNSTC HVDT Centre - Dindigul",
        "old": (10.3512, 77.9712), "new": (10.3552, 77.9773), "source": "Google Maps !3d!4d verified"},
    14: {"name": "TNSTC HVDT Centre - Virudhunagar",
        "old": (9.5812, 77.9512), "new": (9.5732, 77.9511), "source": "Mapcarta Virudhunagar Bus Stand"},
    15: {"name": "TNSTC HVDT Centre - Tirunelveli",
        "old": (8.7212, 77.7312), "new": (8.7270, 77.7380), "source": "Trivandrum Road Vannarpet Tirunelveli"},
    16: {"name": "TNSTC HVDT Centre - Nagercoil",
        "old": (8.1812, 77.4312), "new": (8.1750, 77.4280), "source": "Nesamony Nagar Ranithottam Nagercoil"},
    17: {"name": "TNSTC HVDT Centre - Karur",
        "old": (10.9912, 78.0812), "new": (10.9577, 78.0810), "source": "Karur bus complex Salem Bypass Rd"},
}

# ==============================================================================
# Key Motel Corrections - Based on Google Maps verification
# ==============================================================================
MOTEL_CORRECTIONS = {
    1:  {"name": "Hotel Anantha Bhavan", "old": (9.1726, 77.8698), "new": (9.1022, 77.8075),
         "source": "Google Maps verified Idaiseval NH44"},
    2:  {"name": "Hotel Sri Balaji Ariyas", "old": (11.7512, 79.3512), "new": (11.7064, 79.3223),
         "source": "Sengurichi Toll Plaza NH-45 Ulundurpet area"},
    9:  {"name": "Hotel Anandhaas", "old": (11.3212, 76.9245), "new": (11.2958, 76.9386),
         "source": "Kallar Railway Gate Mettupalayam Ooty Rd"},
    28: {"name": "Sri Sai Saravana Bavan", "old": (11.0062, 77.5583), "new": (11.0117, 77.5568),
         "source": "Kangeyam Bus Stand Tirupur"},
}

if __name__ == '__main__':
    print("=== IRT Coordinate Corrections ===")
    for id, d in IRT_COORDS.items():
        old = d["old"]
        new = d["new"]
        dlat = abs(new[0] - old[0])
        dlon = abs(new[1] - old[1])
        # Rough km calculation: 1 degree ≈ 111 km
        km_off = ((dlat**2 + dlon**2)**0.5) * 111
        print(f"{id:2d}. {d['name'][:45]:<45}")
        print(f"    Old: {old}, New: {new}, ~{km_off:.1f}km diff, src: {d['source']}")
    print()
    print("=== Key Motel Corrections ===")
    for id, d in MOTEL_CORRECTIONS.items():
        old = d["old"]
        new = d["new"]
        dlat = abs(new[0] - old[0])
        dlon = abs(new[1] - old[1])
        km_off = ((dlat**2 + dlon**2)**0.5) * 111
        print(f"{id:2d}. {d['name']:<35} Old:{old} -> New:{new}  ~{km_off:.1f}km off - {d['source']}")
