
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Välkommen till Dommarjävel</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link href="/domare" className="bg-white text-black rounded-2xl shadow-lg p-6 hover:bg-yellow-300 transition">
          <h2 className="text-xl font-semibold">👨‍⚖️ Utforska Domare</h2>
          <p>Se statistik och matcher baserat på vald domare.</p>
        </Link>
        <Link href="/lag" className="bg-white text-black rounded-2xl shadow-lg p-6 hover:bg-yellow-300 transition">
          <h2 className="text-xl font-semibold">🏟 Utforska Lag</h2>
          <p>Filtrera matcher baserat på lag, säsong och hemmaplan.</p>
        </Link>
        <Link href="/statistik" className="bg-white text-black rounded-2xl shadow-lg p-6 hover:bg-yellow-300 transition">
          <h2 className="text-xl font-semibold">📊 Topplistor</h2>
          <p>Se snällaste/elakaste domarna och andra topplistor.</p>
        </Link>
      </div>
    </main>
  );
}
