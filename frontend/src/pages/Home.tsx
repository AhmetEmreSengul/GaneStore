import { useEffect } from "react";
import { useGameStore } from "../store/useGameStore";
import GameListCard from "../components/GameCard";

const Home = () => {
  const { getGames, games, isLoading } = useGameStore();

  useEffect(() => {
    getGames();
  }, []);

  if (isLoading)
    return (
      <div className="text-white h-screen w-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="flex items-center justify-center ">
      <GameListCard games={games!} />
    </div>
  );
};

export default Home;
