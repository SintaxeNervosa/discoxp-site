import { useEffect, useState } from "react";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import HomeEfets from "../../components/layout/HomeEfeets"
import { Header } from "../../components/layout/Header";
import {BestSellersSection} from "../../components/layout/BestSellersSection"
import { XboxSection } from '../../components/layout/XboxSection';
import { NintendoSection } from '../../components/layout/NintendoSection';
import { PlayStationSection } from '../../components/layout/PlayStationSection';
import { Footer } from '../../components/layout/FooterFodastico'
import ApiService from "../../connection/apiService";
function Home() {

   

    return (
       <HomeEfets>
         <main className="home">
           <Header/>

            {/* <div className="banner">
                <img src="/img/gta.png" alt="" />
            </div> */}

            <div className="gallery">
                <div className="row row-down">
                    <img src="/img/capa/Black_ops_2_cover.jpg" alt="capa01" />
                    <img src="/img/capa/CrashTwinsanityAmerican.png" alt="capa02" />
                    <img src="/img/capa/Elden_Ring_capa.jpg" alt="capa03" />
                    <img src="/img/capa/fifa25.jpeg" alt="capa04" />
                    <img src="/img/capa/Final_Fantasy_7_Rebirth_capa.png" alt="capa05" />
                    <img src="/img/capa/forza-horizon-1.jpg" alt="capa06" />

                    <img src="/img/capa/Black_ops_2_cover.jpg" alt="capa01" />
                    <img src="/img/capa/CrashTwinsanityAmerican.png" alt="capa02" />
                    <img src="/img/capa/Elden_Ring_capa.jpg" alt="capa03" />
                    <img src="/img/capa/fifa25.jpeg" alt="capa04" />
                    <img src="/img/capa/Final_Fantasy_7_Rebirth_capa.png" alt="capa05" />
                    <img src="/img/capa/forza-horizon-1.jpg" alt="capa06" />
                </div>

                <div className="row row-up">
                    <img src="/img/capa/Capa_de_Forza_Horizon_5.jpg" alt="capa07" />
                    <img src="/img/capa/God_of_War_2_capa.png" alt="capa08" />
                    <img src="/img/capa/Gran_Turismo_2009_capa.png" alt="capa09" />
                    <img src="/img/capa/Halo-_Reach_box_art.jpg" alt="capa10" />
                    <img src="/img/capa/Legend_of_Zelda.png" alt="capa11" />
                    <img src="/img/capa/Minecraft_capa.png" alt="capa12" />

                    <img src="/img/capa/Capa_de_Forza_Horizon_5.jpg" alt="capa07" />
                    <img src="/img/capa/God_of_War_2_capa.png" alt="capa08" />
                    <img src="/img/capa/Gran_Turismo_2009_capa.png" alt="capa09" />
                    <img src="/img/capa/Halo-_Reach_box_art.jpg" alt="capa10" />
                    <img src="/img/capa/Legend_of_Zelda.png" alt="capa11" />
                    <img src="/img/capa/Minecraft_capa.png" alt="capa12" />
                </div>

                <div className="row row-down">
                    <img src="/img/capa/Need-for-speed.jpg" alt="capa13" />
                    <img src="/img/capa/Nfsc_capa_pt.jpg" alt="capa14" />
                    <img src="/img/capa/pokemon.jpg" alt="capa15" />
                    <img src="/img/capa/skate-3.jpg" alt="capa16" />
                    <img src="/img/capa/SpiderMan.jpeg" alt="capa17" />
                    <img src="/img/capa/The_Legend_of_Zelda-capa.png" alt="capa18" />

                    <img src="/img/capa/Need-for-speed.jpg" alt="capa13" />
                    <img src="/img/capa/Nfsc_capa_pt.jpg" alt="capa14" />
                    <img src="/img/capa/pokemon.jpg" alt="capa15" />
                    <img src="/img/capa/skate-3.jpg" alt="capa16" />
                    <img src="/img/capa/SpiderMan.jpeg" alt="capa17" />
                    <img src="/img/capa/The_Legend_of_Zelda-capa.png" alt="capa18" />
                </div>
            </div>

            <BestSellersSection/>

        <XboxSection/>
        <NintendoSection/>
        <PlayStationSection/>

          <Footer/>
        </main>
       </HomeEfets>
    );
}

export default Home;

