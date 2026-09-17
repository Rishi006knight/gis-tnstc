import subprocess

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def dump(query, filename):
    url = f"https://www.google.com/maps/search/{query.replace(' ', '+')}"
    cmd = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--dump-dom",
        "--virtual-time-budget=7000",
        url
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True, timeout=25, encoding='utf-8', errors='ignore')
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(proc.stdout)
    print(f"Dumped {len(proc.stdout)} chars to {filename}")

if __name__ == '__main__':
    dump("IRT Driver Training School Trichy", r"d:\projects\gis-tnstc\trichy_dom.html")
