# 📊 Dommarjävel – Domarstatistik för Allsvenskan

Detta är ett frontendprojekt byggt i **Next.js 14** och **Tailwind CSS**. Det laddar in statistik från `data.json` och visar:

- Filter (domare, lag, säsong, hemma/borta)
- Statistikpanel (V–O–F, kort, straffar)
- Matchlista

## 🚀 Kom igång

### 1. Installera beroenden

```bash
npm install
```

### 2. Placera `data.json`

Kopiera in din `data.json` i:

```
/frontend/data/data.json
```

### 3. Starta utvecklingsservern

```bash
npm run dev
```

Besök `http://localhost:3000` i din webbläsare.

## 🧩 Teknikstack

- Next.js 14 (App Router-stöd)
- Tailwind CSS
- lucide-react (ikoner)
- TypeScript

## 🛰 Deployment

Vi rekommenderar att använda **Vercel** för enkel hosting.

## 🗂 Struktur

```
frontend/
├── components/
├── pages/
├── app/
├── styles/
├── data/ ← innehåller data.json
```

## 🔖 Licens

MIT
