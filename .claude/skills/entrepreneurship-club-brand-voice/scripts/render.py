#!/usr/bin/env python3
"""Render a brand HTML file to PDF or PNG with headless Chrome/Chromium.

Usage:
  render.py page.html out.pdf                       # A4 (or whatever @page says)
  render.py page.html out.png --size 1080x1350      # social post, 2x pixel density
  render.py page.html out.png --size 1920x1080 --scale 1

The HTML can reference brand files with the prefix "brand/", e.g.
  <link rel="stylesheet" href="brand/brand.css">
  <img src="brand/logo/lockup-white.png">
  <script src="brand/starfield.js"></script>
The script resolves "brand/" to this skill's assets folder.
"""
import argparse, os, shutil, subprocess, sys, tempfile, glob, pathlib

ASSETS = pathlib.Path(__file__).resolve().parent.parent / "assets"

def find_chrome():
    for env in ("CHROME_PATH", "BROWSER_PATH"):
        if os.environ.get(env): return os.environ[env]
    # headless_shell first: its screenshot viewport is exactly --window-size.
    cands = glob.glob("/opt/pw-browsers/chromium_headless_shell-*/*/headless_shell")
    cands += glob.glob(os.path.expanduser("~/.cache/ms-playwright/chromium_headless_shell-*/*/headless_shell"))
    cands += glob.glob("/opt/pw-browsers/chromium-*/chrome-linux/chrome")
    cands += glob.glob(os.path.expanduser("~/.cache/ms-playwright/chromium-*/chrome-linux/chrome"))
    cands += ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
              "/Applications/Chromium.app/Contents/MacOS/Chromium",
              r"C:\Program Files\Google\Chrome\Application\chrome.exe"]
    for n in ("chromium", "chromium-browser", "google-chrome", "google-chrome-stable", "chrome"):
        p = shutil.which(n)
        if p: cands.append(p)
    for c in cands:
        if c and os.path.exists(c): return c
    sys.exit("No Chrome/Chromium found. Set CHROME_PATH.")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("html"); ap.add_argument("out")
    ap.add_argument("--size", help="WxH in CSS px for PNG output, e.g. 1080x1350")
    ap.add_argument("--scale", type=float, default=2)
    ap.add_argument("--wait", type=int, default=6000, help="ms of virtual time for fonts/scripts")
    a = ap.parse_args()

    src = pathlib.Path(a.html).resolve()
    work = pathlib.Path(tempfile.mkdtemp())
    # Mirror the page's folder so its own relative files still work, then add brand/.
    for p in src.parent.iterdir():
        try: (work / p.name).symlink_to(p)
        except FileExistsError: pass
    if not (work / "brand").exists(): (work / "brand").symlink_to(ASSETS)
    page = work / src.name

    out = pathlib.Path(a.out).resolve()
    out.parent.mkdir(parents=True, exist_ok=True)
    cmd = [find_chrome(), "--headless", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
           "--allow-file-access-from-files", f"--virtual-time-budget={a.wait}"]
    if out.suffix.lower() == ".pdf":
        cmd += ["--no-pdf-header-footer", f"--print-to-pdf={out}"]
    else:
        if not a.size: sys.exit("PNG output needs --size WxH")
        w, h = a.size.lower().split("x")
        cmd += [f"--window-size={w},{h}", f"--force-device-scale-factor={a.scale}", f"--screenshot={out}"]
    cmd.append(page.as_uri())
    r = subprocess.run(cmd, capture_output=True, text=True)
    if not out.exists():
        sys.exit("Render failed:\n" + r.stderr[-2000:])
    if out.suffix.lower() == ".png":
        try:
            from PIL import Image
            got = Image.open(out).size
            want = (round(int(w) * a.scale), round(int(h) * a.scale))
            if got != want:
                print(f"warning: PNG is {got}, expected {want}. Full Chrome shrinks the viewport; "
                      "use a headless_shell binary via CHROME_PATH.", file=sys.stderr)
        except ImportError:
            pass
    print(out)

if __name__ == "__main__":
    main()
