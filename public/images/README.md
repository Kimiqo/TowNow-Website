# Site images (local)

Images are loaded from `/images/...` so the marketing site does not depend on Unsplash at runtime.

## First time (no photos yet)

From the `Website_TowNow` folder:

```bash
npm run images:seed
```

This creates **tiny grey JPEG placeholders** for every path `siteContent.ts` expects, so nothing 404s.

## Replace with real photos (needs internet)

```bash
npm run images:download
```

That overwrites the files under `public/images/` with curated Unsplash sources: **towing / flatbed / breakdown**, plus **African city roads** (e.g. Lagos, Cape Town) where we could license freely—swap URLs in `scripts/download-site-images.mjs` if you want different regions.

If the script fails (DNS, firewall, VPN), download the same URLs in a browser, save into the paths below, and keep the filenames.

## Folders

| Folder       | Use case                          |
| ------------ | --------------------------------- |
| `towing/`    | Flatbed, fleet, truck on road     |
| `roads/`     | Highways, night road, motion blur |
| `cars/`      | Everyday traffic / context        |
| `logistics/` | Convoy, yard / coverage           |
| `mechanics/` | Workshop / verified drivers       |
| `business/`  | Laptop estimates, POS payments  |
| `maps/`      | Navigation / tracking             |
| `people/`    | Phone / request flow              |
| `devices/`   | App download mock                 |
| `support/`   | Contact / dispatch                |
