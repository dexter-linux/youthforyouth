#!/usr/bin/env python3
from pathlib import Path
import json

folder = Path("images/areas")
extensions = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
items = []
for image in sorted(folder.iterdir(), key=lambda p: p.name.lower()):
    if image.is_file() and image.suffix.lower() in extensions:
        caption_file = image.with_suffix(".txt")
        caption = caption_file.read_text(encoding="utf-8").strip() if caption_file.exists() else image.stem.replace("-", " ").replace("_", " ").title()
        items.append({"src": str(image).replace("\\", "/"), "title": caption, "alt": caption})
(folder / "manifest.json").write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Created {folder / 'manifest.json'} with {len(items)} images.")
