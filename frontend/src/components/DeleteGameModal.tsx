import React from "react";
import { useGameStore } from "../store/useGameStore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const DeleteGameModal = ({
  id,
  setDeleteGameId,
}: {
  id: string;
  setDeleteGameId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { deleteGame, isDeleting } = useGameStore();

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-10 text-white">
      <div className="bg-cream-50/50 backdrop-blur-sm border border-border-light p-6 rounded-xl shadow-lg">
        <h1 className="text-lg font-black">Delete Game</h1>
        <h3 className="font-light mt-3">
          Are you sure you want to delete this game?
        </h3>

        <div className="flex justify-between mt-4">
          <div className="p-2 bg-red-500 text-white rounded-lg">
            {isDeleting ? (
              <span className="inline-flex gap-2">
                Deleting
                <AiOutlineLoading3Quarters className="animate-spin size-4" />
              </span>
            ) : (
              <button className="cursor-pointer" onClick={() => deleteGame(id)}>
                Yes I'm sure.
              </button>
            )}
          </div>

          <button
            onClick={() => setDeleteGameId("")}
            className="p-2 bg-gray-500 rounded-lg cursor-pointer"
          >
            Nevermind.
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteGameModal;
