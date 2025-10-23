import React, { useEffect, useState } from "react";
import "./pageAddress.scss";
import { useNavigate } from "react-router-dom";

const PageAddress = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchAddresses = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/addresses");
      if (!response.ok) throw new Error("Erro ao carregar endereços.");

      const data = await response.json();
      if (data.length === 0) setMessage("Nenhum endereço cadastrado.");
      else setAddresses(data);
    } catch (error) {
      setMessage("⚠️ Não foi possível carregar os endereços.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSelectDefault = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/addresses/padrao/${id}`, {
        method: "PUT",
      });
      if (response.ok) {
        await fetchAddresses();
      } else {
        alert("Erro ao definir endereço padrão.");
      }
    } catch {
      alert("Erro ao conectar com o servidor.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/register-address/${id}`);
  };

  return (
    <div className="pageAddress-container">
      <header className="pageAddress-header">
        <img src="../img/Logo.png" alt="Disco XP" className="pageAddress-logo" />
      </header>

      <main className="pageAddress-content">
        <aside className="pageAddress-sidebar">
          <div className="pageAddress-iconHome">
            <img src="../img/home-icon.png" alt="Home" />
          </div>

          <div className="pageAddress-user">
            <img src="../img/user-icon.png" alt="User" />
            <h2>
              Olá, <span>Alisson</span>
            </h2>
          </div>

          <button className="pageAddress-btn">
            <strong>Cadastro</strong>
            <span>Ver e alterar seus dados</span>
          </button>

          <button className="pageAddress-btn active">
            <strong>Endereços</strong>
            <span>Ver e alterar seus endereços</span>
          </button>

          <button className="pageAddress-btn logout">
            <strong>Sair</strong>
            <span>Deslogar da conta e encerrar sessão</span>
          </button>
        </aside>

        <section className="pageAddress-main">
          <div className="pageAddress-titleRow">
            <h3>Endereços</h3>
            <button
              className="pageAddress-add"
              onClick={() => navigate("/register-address")}
            >
              + Adicionar endereço
            </button>
          </div>

          <div className="pageAddress-addressList">
            {loading ? (
              <p>Carregando endereços...</p>
            ) : message ? (
              <p>{message}</p>
            ) : (
              addresses.map((addr) => (
                <div
  key={addr.id}
  className={`pageAddress-card ${addr.enderecoPadrao ? "default" : ""}`}
  onClick={() => handleSelectDefault(addr.id)}
>
  <p className="address-line">{addr.logradouro}</p>
  <p className="address-line">
    <span className="highlight">Nº {addr.numero}</span> {addr.bairro}
  </p>
  <p className="address-line">
    {addr.cidade} - {addr.estado} <span className="highlight">{addr.cep}</span>
  </p>
  {addr.complemento && (
    <p className="address-line">
      <span className="highlight">{addr.complemento}</span>
    </p>
  )}

  {addr.enderecoPadrao && (
    <span className="pageAddress-defaultBadge"></span>
  )}

  <button
    className="pageAddress-editBtn"
    onClick={(e) => {
      e.stopPropagation();
      handleEdit(addr.id);
    }}
  >
    ✏️ Editar
  </button>
</div>

              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PageAddress;
