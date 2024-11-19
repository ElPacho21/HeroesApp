import { useEffect, useState } from "react"
import { IHeroes } from "../../../types/IHeroes";
import { useNavigate, useParams } from "react-router-dom";
import { heroesData } from "../../../data/heroes";
import styles from "./HeroPage.module.css";

export const HeroPage = () => {
    
    const [hero, setHero] = useState<IHeroes | null>(null);
    const {id} = useParams();

    const getHeroById = () =>{
        const result = heroesData.find((h) => h.id === id);
        result? setHero(result): setHero(null);
    };

    useEffect(() => {
        getHeroById();
    }, []);

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(-1);
    };
    return (
    <>
        {hero && 
        <div className={styles.containerHeroPage}>
            <div className={styles.containerImgHeroPage}>
                <img src={`/assets/heroes/${id}.jpg`} alt="" />
            </div>
            <div>
                <h3>{hero.superhero}</h3>
                <ul>
                    <li><b>Alter Ego: </b>{hero.alter_ego}</li>

                    <li><b>Publicador: </b>{hero.publisher}</li>

                    <li><b>Primer Aparición: </b>{hero.first_appearance}</li>

                    <li><b>Personaje/s: </b>{hero.characters}</li>
                </ul>
                <button className={styles.button} onClick={handleNavigate}>Regresar</button>
            </div>
        </div>}
    </>
  )
}
