import { useEffect, useState } from "react"
import { IHeroes } from "../../../types/IHeroes"
import { heroesData } from "../../../data/heroes";
import { ListHeroes } from "../../iu/ListHeroes/ListHeroes";

export const DCHeroes = () => {
  const [heroes, setHeroes] = useState<IHeroes[]>([]);

  const handleGetHeroesDC = () =>{
    const result = heroesData.filter((hero) => hero.publisher === "DC Comics");
    setHeroes(result);
  };

  useEffect(()=>{
    handleGetHeroesDC();
  }, []);

  return (
    <ListHeroes heroes={heroes} title="Heroes DC Comics"/>
  );
};
