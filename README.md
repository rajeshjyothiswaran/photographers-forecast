# Photographer's Forecast

A 7-day weather scoring tool for photographers — built to answer the question: *is it worth getting up for this sunrise?*

**[→ Open the tool](https://rajeshjyothiswaran.github.io/photographers-forecast/)**  
**[→ User guide](https://rajeshjyothiswaran.github.io/photographers-forecast/guide.html)**

---

## What it does

Scores each day 0–100 across four categories photographers care about:

| Tab | What it scores |
|-----|---------------|
| 🌅 Sunrise | Color potential during the golden hour window |
| 🌇 Sunset | Color potential during the sunset window |
| ★ Stars | Astrophotography conditions — cloud cover, moon phase, Milky Way window |
| ☁ Fog | Radiation fog and marine stratus probability 3–10 AM |

For coastal locations, a **tide chart** automatically appears showing the full day's tide curve, high/low times, and sunrise/sunset markers — so you can plan around both light and water level.

---

## Features

- **My Locations** — unified location list, seeded with 4 Sonoma Coast defaults, fully editable. Add any city, zip code, or place worldwide. Locations persist across sessions.
- **City / zip code search** — powered by OpenStreetMap Nominatim. Works globally with a "Search worldwide" toggle.
- **Tide charts** — automatic for any coastal location within 60km of a tide station. US locations use NOAA; international locations use TideCheck (20,000+ stations, 200+ countries).
- **Milky Way window** — calculates when the galactic core is above 10°, intersected with moon-free dark hours.
- **Moon phase scoring** — full moon penalty, moon-free window length, moonrise/moonset times.
- **Bortle scale** — preset locations have hand-verified light pollution values; custom locations default to Bortle 5.
- **AQI / wildfire smoke** — optional air quality layer. Low smoke can enhance color; high smoke degrades it.
- **Golden & blue hour times** — exact times for each day, not just sunrise/sunset.
- **Hourly cloud detail** — expandable table showing cloud cover hour-by-hour in the scoring window.
- **Pattern-aware verdicts** — the detail panel describes the specific sky pattern (smoulder zone, painter's sky, marine stratus, cirrus wash) rather than just a score tier.
- **°F / °C toggle** — temperature and dewpoint in your preferred unit.
- **URL state** — current location is saved in the URL so you can share or bookmark a specific view.
- **Feedback emailer** — report what you actually saw to help calibrate scoring over time.
- **Dark mode** — follows system preference.

---

## Scoring logic

Scores are derived from hourly weather model data averaged over the relevant window for each tab. Key factors:

**Sunrise / Sunset color**
- Low cloud 20–75% (broken cloud catches light from below)
- Mid and high cloud structure
- Humidity 60–88%
- Coastal marine stratus pattern bonus
- "Painter's sky" bonus: dense high cirrus + broken low cloud

**Stars**
- Best 4-hour clear stretch in the moon-free dark window
- Moon phase penalty (full moon = –60 points)
- Humidity and dewpoint spread (atmospheric transparency)
- Bortle light pollution penalty
- Milky Way core visibility cap

**Fog**
- Dewpoint–temperature spread < 3°C (primary driver)
- Humidity > 80%
- Wind speed < 5 mph
- Coastal location bonus; ridge location penalty

---

## Data sources

| Source | Used for |
|--------|----------|
| [Open-Meteo](https://open-meteo.com) | 7-day hourly weather forecast (free, no API key) |
| [Open-Meteo Air Quality](https://open-meteo.com) | US AQI forecast (optional) |
| [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org) | City / zip code geocoding |
| [NOAA Tides & Currents](https://tidesandcurrents.noaa.gov) | US tide predictions (free, no API key) |
| [TideCheck](https://tidecheck.com) | International tide predictions (API key required) |
| SunCalc (Vladimir Agafonkin, BSD-2-Clause) | Sun times, moon phase, moonrise/set |

---

## Preset locations

| Location | Type | Notes |
|----------|------|-------|
| Jenner | Coast | Russian River mouth · marine stratus · Bortle 3 |
| Salt Point SP | Coast | Rocky coast · Bortle 2 · best dark sky coastal site |
| Mercuryville | Ridge | 2,720 ft · above fog layer · Bortle 3 |
| Geyserville | Valley | Alexander Valley floor · Bortle 4 |

All presets can be removed and replaced with your own locations.

---

## License

Copyright (c) 2026 Rajesh Jyothiswaran / LadyBugFarm Images. All rights reserved.  
See [LICENSE](LICENSE) for full terms.

Built for [LadyBugFarm Images](https://rjfineart.com).
