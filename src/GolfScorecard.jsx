import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, GolfBall, RefreshCw } from "lucide-react";

export default function GolfScorecard() {
  const [numBuche, setNumBuche] = useState(9);
  const [scores, setScores] = useState(Array(9).fill(""));

  const par = {
    9: [4, 3, 4, 5, 4, 3, 4, 4, 5],
    18: [4, 3, 4, 5, 4, 3, 4, 4, 5, 4, 4, 3, 5, 4, 4, 3, 4, 5]
  };

  const handleChangeBuche = (e) => {
    const val = parseInt(e.target.value);
    setNumBuche(val);
    setScores(Array(val).fill(""));
  };

  const handleScoreChange = (index, value) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  const totaleScore = scores.reduce((acc, v) => acc + (parseInt(v) || 0), 0);
  const totalePar = par[numBuche].reduce((acc, v) => acc + v, 0);
  const differenza = totaleScore - totalePar;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-emerald-500 p-10 flex flex-col items-center text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-extrabold mb-10 drop-shadow-lg flex items-center gap-3"
      >
        <GolfBall className="w-10 h-10" /> Scorecard Golf Pro
      </motion.h1>

      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border-white/20 text-white rounded-2xl shadow-2xl p-6">
        <div className="mb-6">
          <label className="font-semibold text-lg">Numero di buche</label>
          <select
            className="w-full mt-2 p-3 rounded-xl bg-white/20 border border-white/30 text-white"
            value={numBuche}
            onChange={handleChangeBuche}
          >
            <option value={9}>9</option>
            <option value={18}>18</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {Array.from({ length: numBuche }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex justify-between items-center bg-white/20 p-4 rounded-xl shadow border border-white/20"
            >
              <span>Buca {i + 1} (par {par[numBuche][i]})</span>
              <input
                type="number"
                className="w-20 p-2 border rounded-xl bg-white text-black"
                value={scores[i]}
                onChange={(e) => handleScoreChange(i, e.target.value)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-white/20 rounded-xl border border-white/20 text-center shadow-lg"
        >
          <p className="text-2xl font-bold flex items-center justify-center gap-2">
            <Trophy /> Risultato Finale
          </p>
          <p className="text-xl mt-4">Totale colpi: <b>{totaleScore}</b></p>
          <p className="text-xl">Par totale: <b>{totalePar}</b></p>
          <p className="text-3xl mt-2 font-extrabold">
            Differenza dal par: {differenza >= 0 ? "+" + differenza : differenza}
          </p>
        </motion.div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setScores(Array(numBuche).fill(""))}
            className="bg-white text-green-700 font-bold px-5 py-2 rounded-xl shadow flex items-center gap-2"
          >
            <RefreshCw /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}