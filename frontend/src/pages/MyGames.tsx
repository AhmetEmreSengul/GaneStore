import { useEffect } from "react";
import { useGameStore } from "../store/useGameStore";
import GameListCard from "../components/GameCard";

const MyGames = () => {
  const { isLoading, myGames, getMyGames } = useGameStore();

  useEffect(() => {
    getMyGames();
  }, []);

  if (isLoading) {
    <div className="text-white h-screen w-screen flex items-center justify-center">
      Loading...
    </div>;
  }

  if (myGames?.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <h1 className="text-white text-2xl">No games found</h1>
      </div>
    );
  }

  console.log(myGames);

  return (
    <div>
      <div className="flex items-center justify-center ">
        <GameListCard games={myGames!} showButtons={true} />
      </div>
    </div>
  );
};

export default MyGames;
