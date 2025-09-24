import 'bootstrap/dist/css/bootstrap.min.css';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="text-center">
                <h1 className="display-1 fw-bold notfound-404">404</h1>
                <p className="fs-3">
                    <span className="text-danger">Oops!</span> Página não encontrada.
                </p>
                <p className="lead">
                    Desculpe, a página que você procura não existe.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="btn notfound-btn">
                    Voltar para Home
                </button>
            </div>
        </div>
    );
}
