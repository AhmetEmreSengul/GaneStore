import { useState } from "react";
import { useGameStore, type Game } from "../store/useGameStore";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import DeleteGameModal from "./DeleteGameModal";
import EditGameModal from "./EditGameModal";

const GENRE_STYLES = {
  RPG: "bg-blue-950 text-blue-400 border border-blue-800/40",
  Action: "bg-red-950 text-red-400 border border-red-800/40",
  Strategy: "bg-green-950 text-green-400 border border-green-800/40",
  default: "bg-violet-950 text-violet-400 border border-violet-800/40",
};

function formatDate(dateStr: string) {
  if (!dateStr || dateStr.startsWith("0001")) return null;
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function GenreBadge({ genre }: { genre: string }) {
  const key = genre as keyof typeof GENRE_STYLES;
  const cls = GENRE_STYLES[key] || GENRE_STYLES.default;
  return (
    <span
      className={`${cls} text-xs font-semibold px-2.5 py-0.5 rounded-full tracking-wide`}
    >
      {genre}
    </span>
  );
}

export default function GameListCard({
  games,
  showButtons,
}: {
  games: Game[];
  showButtons?: boolean;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [deleteGameId, setDeleteGameId] = useState("");
  const [editGameId, setEditGameId] = useState("");

  const handleEditGame = (id: string) => {
    useGameStore.setState({
      game: games.find((game) => game.id === editGameId),
    });
    setEditGameId(id);
  };

  return (
    <div className="flex items-start justify-center p-10 font-mono">
      <div className="w-full max-w-2xl rounded-2xl border border-white/5 bg-[#161b27] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6]" />
            <h2 className="text-slate-200 text-sm font-semibold tracking-tight">
              Game records
            </h2>
          </div>
          <span className="text-xs text-slate-500 bg-white/5 border border-white/5 rounded-full px-3 py-0.5">
            {games.length} entries
          </span>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0f1117]">
              {["ID", "Name", "Genre", "Price", "Release date"].map((h) => (
                <th
                  key={h}
                  className="text-left text-[11px] uppercase tracking-widest text-slate-600 font-semibold px-6 py-2.5 border-b border-white/5"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {games.map((row) => {
              const isHovered = hovered === row.id;
              const formattedDate = formatDate(row.releaseDate);
              return (
                <tr
                  key={row.id}
                  onMouseEnter={() => setHovered(row.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`border-b border-white/4 transition-colors duration-100 ${isHovered ? "bg-white/3" : ""}`}
                >
                  <td className="px-6 py-3 text-slate-600 text-xs flex items-center justify-center">
                    #{row.id}
                    {showButtons && (
                      <span className="ml-2 inline-flex items-center space-x-2">
                        <button
                          onClick={() => handleEditGame(row.id)}
                          className="cursor-pointer"
                        >
                          <BiEdit className="size-5 text-sky-300" />
                        </button>
                        <button
                          className="cursor-pointer"
                          onClick={() => setDeleteGameId(row.id)}
                        >
                          <MdDelete className="size-5 text-red-400" />
                        </button>
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-slate-400">{row.name}</td>
                  <td className="px-6 py-3">
                    <GenreBadge genre={row.genre} />
                  </td>
                  <td className="px-6 py-3 text-cyan-400 text-xs">
                    ${row.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-3 text-xs">
                    {formattedDate ? (
                      <span className="text-slate-500">{formattedDate}</span>
                    ) : (
                      <span className="text-slate-700">—</span>
                    )}
                  </td>
                  {deleteGameId === row.id && (
                    <DeleteGameModal
                      id={row.id}
                      setDeleteGameId={setDeleteGameId}
                    />
                  )}
                  {editGameId === row.id && (
                    <EditGameModal id={row.id} setEditGameId={setEditGameId} />
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
