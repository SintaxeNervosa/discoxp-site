import "./home.scss";
import { lazy, Suspense, useEffect, useState } from "react";
import HomeEfets from "../../components/layout/HomeEfeets";
import { Header } from "../../components/layout/Header";
import { useNavigate } from "react-router-dom";

//Loaders dos componentes pesados
const BestSellersSection = lazy(() =>
  import("../../components/layout/BestSellersSection").then((module) => ({
    default: module.BestSellersSection,
  }))
);

const XboxSection = lazy(() =>
  import("../../components/layout/XboxSection").then((module) => ({
    default: module.XboxSection,
  }))
);

const NintendoSection = lazy(() =>
  import("../../components/layout/NintendoSection").then((module) => ({
    default: module.NintendoSection,
  }))
);

const PlayStationSection = lazy(() =>
  import("../../components/layout/PlayStationSection").then((module) => ({
    default: module.PlayStationSection,
  }))
);

const Footer = lazy(() =>
  import("../../components/layout/FooterFodastico").then((module) => ({
    default: module.Footer,
  }))
);

const Optimizador = ({ src, alt, ...props }) => (
  <img src={src} alt={alt} loading="lazy" decoding="async" {...props} />
);

//loading
const SetionLoander = () => (
  <div className="loader-container">CARREGANDO...</div>
);
function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const redirectOrder = sessionStorage.getItem('redirectOrder');

    if (redirectOrder != null) {
      navigate("/order")
    }

    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 1000); // Simula um carregamento de 2 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <HomeEfets>
        <main className="home">
          <div className="gallery">
            <div className="row row-down">
              <Optimizador src="/img/capa/Black_ops_2_cover.jpg" alt="capa01" />
              <Optimizador src="/img/capa/CrashTwinsanityAmerican.png" alt="capa02" />
              <Optimizador src="/img/capa/Elden_Ring_capa.jpg" alt="capa03" />
              <Optimizador src="/img/capa/fifa25.jpeg" alt="capa04" />
              <Optimizador src="/img/capa/Final_Fantasy_7_Rebirth_capa.png" alt="capa05"
              />
              <Optimizador src="/img/capa/forza-horizon-1.jpg" alt="capa06" />
              <Optimizador src="/img/capa/Black_ops_2_cover.jpg" alt="capa01" />
              <Optimizador src="/img/capa/CrashTwinsanityAmerican.png" alt="capa02" />
              <Optimizador src="/img/capa/Elden_Ring_capa.jpg" alt="capa03" />
              <Optimizador src="/img/capa/fifa25.jpeg" alt="capa04" />
              <Optimizador src="/img/capa/Final_Fantasy_7_Rebirth_capa.png" alt="capa05" />
              <Optimizador src="/img/capa/forza-horizon-1.jpg" alt="capa06" />
            </div>

            <div className="row row-up">
              <Optimizador src="/img/capa/Capa_de_Forza_Horizon_5.jpg" alt="capa07" />
              <Optimizador src="/img/capa/God_of_War_2_capa.png" alt="capa08" />
              <Optimizador src="/img/capa/Gran_Turismo_2009_capa.png" alt="capa09" />
              <Optimizador src="/img/capa/Halo-_Reach_box_art.jpg" alt="capa10" />
              <Optimizador src="/img/capa/Legend_of_Zelda.png" alt="capa11" />
              <Optimizador src="/img/capa/Minecraft_capa.png" alt="capa12" />
              <Optimizador src="/img/capa/Capa_de_Forza_Horizon_5.jpg" alt="capa07" />
              <Optimizador src="/img/capa/God_of_War_2_capa.png" alt="capa08" />
              <Optimizador src="/img/capa/Gran_Turismo_2009_capa.png" alt="capa09" />
              <Optimizador src="/img/capa/Halo-_Reach_box_art.jpg" alt="capa10" />
              <Optimizador src="/img/capa/Legend_of_Zelda.png" alt="capa11" />
              <Optimizador src="/img/capa/Minecraft_capa.png" alt="capa12" />
            </div>

            <div className="row row-down">
              <Optimizador src="/img/capa/Need-for-speed.jpg" alt="capa13" />
              <Optimizador src="/img/capa/Nfsc_capa_pt.jpg" alt="capa14" />
              <Optimizador src="/img/capa/pokemon.jpg" alt="capa15" />
              <Optimizador src="/img/capa/skate-3.jpg" alt="capa16" />
              <Optimizador src="/img/capa/SpiderMan.jpeg" alt="capa17" />
              <Optimizador src="/img/capa/The_Legend_of_Zelda-capa.png" alt="capa18"
              />

              <Optimizador src="/img/capa/Need-for-speed.jpg" alt="capa13" />
              <Optimizador src="/img/capa/Nfsc_capa_pt.jpg" alt="capa14" />
              <Optimizador src="/img/capa/pokemon.jpg" alt="capa15" />
              <Optimizador src="/img/capa/skate-3.jpg" alt="capa16" />
              <Optimizador src="/img/capa/SpiderMan.jpeg" alt="capa17" />
              <Optimizador src="/img/capa/The_Legend_of_Zelda-capa.png" alt="capa18"
              />
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
