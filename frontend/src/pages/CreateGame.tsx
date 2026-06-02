import { useState } from "react";
import { useGameStore } from "../store/useGameStore";

const CreateGame = () => {
  const { createGame } = useGameStore();

  const [game, setGame] = useState({
    name: "",
    genreId: 1,
    price: 0,
    releaseDate: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createGame(game);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold">Create Game</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center mt-2 gap-3"
      >
        <input
          required
          type="text"
          placeholder="Name"
          className="p-2 rounded-lg border"
          value={game.name}
          onChange={(e) => setGame({ ...game, name: e.target.value })}
        />
        <input
          required
          type="number"
          placeholder="Genre ID"
          className="p-2 rounded-lg border"
          max={5}
          min={1}
          value={game.genreId}
          onChange={(e) => setGame({ ...game, genreId: +e.target.value })}
        />
        <input
          required
          type="number"
          placeholder="Price"
          className="p-2 rounded-lg border"
          value={game.price}
          onChange={(e) => setGame({ ...game, price: +e.target.value })}
        />
        <input
          required
          type="date"
          placeholder="Name"
          className="p-2 rounded-lg border"
          value={game.releaseDate}
          onChange={(e) => setGame({ ...game, releaseDate: e.target.value })}
        />
        <button className="px-4 py-2 rounded-lg border">Create Game</button>
      </form>
    </div>
  );
};

export default CreateGame;
