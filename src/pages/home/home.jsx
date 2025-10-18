import "./home.scss";
import { lazy, Suspense, useEffect, useState } from "react";
import HomeEfets from "../../components/layout/HomeEfeets"
import { Header } from "../../components/layout/Header";;

//Loaders dos componentes pesados
const BestSellersSection = lazy(() => 
  import('../../components/layout/BestSellersSection').then(module => ({
    default: module.BestSellersSection
  }))
);

const XboxSection = lazy(() => 
  import('../../components/layout/XboxSection').then(module => ({
    default: module.XboxSection
  }))
);

const NintendoSection = lazy(() => 
  import('../../components/layout/NintendoSection').then(module => ({
    default: module.NintendoSection
  }))
);

const PlayStationSection = lazy(() => 
  import('../../components/layout/PlayStationSection').then(module => ({
    default: module.PlayStationSection
  }))
);

const Footer = lazy(() => 
  import('../../components/layout/FooterFodastico').then(module => ({
    default: module.Footer
  }))
);

const Optimizador = ({ src, alt, ...props }) => (
    <img src={src} alt={alt} loading="lazy" {...props} decoding="async" {...props} />
)

//loading
const SetionLoander = () => (
    <div className="loader-container">
        CARREGANDO...
    </div>
)
function Home() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(true);
        }, 1000); // Simula um carregamento de 2 segundos

        return () => clearTimeout(timer);
    }, [])

    ///alison vai fazer o resto daqui
    const imagesGallery1 = [
        { src: "/img/capa/Black_ops_2_cover.jpg", alt: "capa01" },
    ]
    const imagesGallery2 = [
        { src: "/img/capa/Capa_de_Forza_Horizon_5.jpg", alt: "capa07" },
    ]
    const imagesGallery3 = [
        { src: "/img/capa/Need-for-speed.jpg", alt: "capa13" },
    ]
    return (
        <>
            <Header />
            <HomeEfets>
                <main className="home">
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

                    {/* Seções com lanzig loading e suspense para carregar melhor*/}
                    {isLoading && (
                        <Suspense fallback={<SetionLoander />}>
                            <BestSellersSection />
                            <XboxSection />
                            <NintendoSection />
                            <PlayStationSection />
                            <Footer />
                        </Suspense>
                    )}
                </main>
            </HomeEfets>
        </>
    );
}

export default Home;

