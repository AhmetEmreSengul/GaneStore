import { useEffect, useState } from "react";
import { useGameStore } from "../store/useGameStore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const EditGameModal = ({
  id,
  setEditGameId,
}: {
  id: string;
  setEditGameId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { game, isEditing, isLoading, updateGame, getGameById } =
    useGameStore();
  const [updateData, setUpdateData] = useState({
    name: "",
    genreId: "",
    price: 0,
    releaseDate: "",
  });

  useEffect(() => {
    getGameById(id);
  }, [id]);

  useEffect(() => {
    if (!game) return;

    setUpdateData({
      name: game.name,
      genreId: game.genre,
      price: game.price,
      releaseDate: game.releaseDate,
    });
  }, [game]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateGame(updateData, id);
  };

  const handleCancel = () => {
    setEditGameId("");
    useGameStore.setState({ game: null });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center flex-col z-10 text-white">
      <h1 className="text-2xl font-black">Edit Game</h1>
      {isLoading ? (
        <div>
          <span className="inline-flex gap-2">
            <AiOutlineLoading3Quarters className="animate-spin size-4" />
          </span>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center mt-2 gap-3 p-3 bg-white-50/50 backdrop-blur-sm border border-border-light rounded-xl"
        >
          <input
            required
            type="text"
            placeholder="Name"
            className="p-2 rounded-lg border"
            value={updateData.name}
            onChange={(e) =>
              setUpdateData({ ...updateData, name: e.target.value })
            }
          />
          <input
            required
            type="number"
            placeholder="Genre ID"
            className="p-2 rounded-lg border w-full"
            max={5}
            min={1}
            value={updateData.genreId as any}
            onChange={(e) =>
              setUpdateData({ ...updateData, genreId: e.target.value })
            }
          />
          <input
            required
            type="number"
            placeholder="Price"
            className="p-2 rounded-lg border"
            value={updateData.price as any}
            onChange={(e) =>
              setUpdateData({ ...updateData, price: +e.target.value })
            }
          />
          <input
            required
            type="date"
            placeholder="Name"
            className="p-2 rounded-lg border w-full"
            value={updateData.releaseDate}
            onChange={(e) =>
              setUpdateData({ ...updateData, releaseDate: e.target.value })
            }
          />
          <div className="flex justify-between mt-4 gap-2">
            <div className="p-2 bg-red-500 text-white rounded-lg">
              {isEditing ? (
                <span className="inline-flex gap-2">
                  Editing
                  <AiOutlineLoading3Quarters className="animate-spin size-4" />
                </span>
              ) : (
                <button type="submit" className="cursor-pointer">
                  Edit Game
                </button>
              )}
            </div>

            <button
              onClick={handleCancel}
              className="p-2 bg-gray-500 rounded-lg cursor-pointer"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditGameModal;
