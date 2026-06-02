import { useState } from "react";
import { useGameStore } from "../store/useGameStore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const EditGameModal = ({
  id,
  setEditGameId,
}: {
  id: string;
  setEditGameId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { updateGame, game, isEditing } = useGameStore();
  const [updateData, setUpdateData] = useState({
    Name: game?.name,
    GenreId: game?.genre,
    Price: game?.price,
    ReleaseDate: game?.releaseDate,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateGame(updateData, id);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-10 text-white">
      <h1 className="text-lg font-black">Edit Game</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center mt-2 gap-3 p-3 bg-white-50/50 backdrop-blur-sm border border-border-light rounded-xl"
      >
        <input
          required
          type="text"
          placeholder="Name"
          className="p-2 rounded-lg border"
          value={updateData.Name}
          onChange={(e) =>
            setUpdateData({ ...updateData, Name: e.target.value })
          }
        />
        <input
          required
          type="number"
          placeholder="Genre ID"
          className="p-2 rounded-lg border"
          max={5}
          min={1}
          value={updateData.GenreId}
          onChange={(e) =>
            setUpdateData({ ...updateData, GenreId: +e.target.value })
          }
        />
        <input
          required
          type="number"
          placeholder="Price"
          className="p-2 rounded-lg border"
          value={updateData.Price}
          onChange={(e) =>
            setUpdateData({ ...updateData, Price: +e.target.value })
          }
        />
        <input
          required
          type="date"
          placeholder="Name"
          className="p-2 rounded-lg border"
          value={updateData.ReleaseDate}
          onChange={(e) =>
            setUpdateData({ ...updateData, ReleaseDate: e.target.value })
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
            onClick={() => setEditGameId("")}
            className="p-2 bg-gray-500 rounded-lg cursor-pointer"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditGameModal;
