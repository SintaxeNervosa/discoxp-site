import React, { useState, useEffect } from "react";
import "./registerAddress.scss";
import { useNavigate, useParams } from "react-router-dom";

const RegisterAddress = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEndereco = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/addresses`);
        const data = await response.json();
        const selected = data.find((item) => item.id === Number(id));
        if (selected) {
          setCep(selected.cep.replace("-", ""));
          setNumero(selected.numero);
          setComplemento(selected.complemento || "");
          setEndereco(
            `${selected.logradouro}, ${selected.bairro}, ${selected.cidade} - ${selected.estado}`
          );
        }
      } catch (err) {
        setMessage("⚠️ Erro ao carregar o endereço.");
      } finally {
        setLoading(false);
      }
    };

    fetchEndereco();
  }, [id]);

  const handleCepChange = async (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCep(value);

    if (value.length === 8) {
      try {
        setLoading(true);
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await response.json();

        if (data.erro) {
          setMessage("❌ CEP não encontrado.");
          setEndereco("");
        } else {
          setEndereco(
            `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`
          );
          setMessage("");
        }
      } catch (error) {
        setMessage("⚠️ Erro ao buscar o CEP.");
      } finally {
        setLoading(false);
      }
    } else {
      setEndereco("");
      setMessage("");
    }
  };

  const handleSubmit = async () => {
    if (cep.length !== 8) {
      setMessage("❌ CEP inválido.");
      return;
    }
    if (!numero.trim()) {
      setMessage("❌ O número é obrigatório.");
      return;
    }

    try {
      setLoading(true);

      const url = id
        ? `http://localhost:8080/api/addresses/${id}`
        : "http://localhost:8080/api/addresses";

      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cep, numero, complemento }),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar o endereço.");
      }

      setMessage(
        id
          ? "✅ Endereço atualizado com sucesso!"
          : "✅ Endereço cadastrado com sucesso!"
      );

      setTimeout(() => navigate("/my-address"), 1500);
    } catch (error) {
      setMessage("⚠️ Erro ao salvar o endereço.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addAddress-container">
      <header className="addAddress-header">
        <img src="../img/Logo.png" alt="Disco XP" className="addAddress-logo" />
      </header>

      <main className="addAddress-content">
        <aside className="addAddress-sidebar">
          <div className="addAddress-iconHome">
            <img src="../img/home-icon.png" alt="Home" />
          </div>

          <div className="addAddress-user">
            <img src="../img/user-icon.png" alt="User" />
            <h2>
              Olá, <span>Alisson</span>
            </h2>
          </div>

          <button className="addAddress-btn">
            <strong>Cadastro</strong>
            <span>Ver e alterar seus dados</span>
          </button>

          <button className="addAddress-btn active">
            <strong>Endereços</strong>
            <span>Ver e alterar seus endereços</span>
          </button>

          <button className="addAddress-btn logout">
            <strong>Sair</strong>
            <span>Deslogar da conta e encerrar sessão</span>
          </button>
        </aside>

        <section className="addAddress-main">
          <h3>{id ? "Editar endereço" : "Adicionar endereço"}</h3>

          <div className="addAddress-card">
            <div className="addAddress-row">
              <div className="addAddress-field">
                <label>CEP</label>
                <input
                  type="text"
                  placeholder="00000-000"
                  maxLength="9"
                  value={cep.replace(/^(\d{5})(\d{3})$/, "$1-$2")}
                  onChange={handleCepChange}
                />
              </div>

              <div className="addAddress-field">
                <label>Endereço</label>
                <textarea
                  rows="3"
                  value={endereco}
                  readOnly
                  placeholder="Digite um CEP válido para preencher automaticamente"
                ></textarea>
              </div>
            </div>

            <div className="addAddress-row">
              <div className="addAddress-field small">
                <label>Número</label>
                <input
                  type="text"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  placeholder="Obrigatório"
                />
              </div>

              <div className="addAddress-field small">
                <label>Complemento</label>
                <input
                  type="text"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  placeholder="Opcional"
                />
              </div>
            </div>

            <button
              className="addAddress-submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? "Salvando..."
                : id
                ? "Salvar alterações"
                : "Adicionar endereço"}
            </button>

            {message && <p className="addAddress-message">{message}</p>}
          </div>
        </section>
      </main>
    </div>
  );
};

export default RegisterAddress;
