import { useEffect, useState } from "react";
import "./listUser.scss";
import apiService from "../../connection/apiService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import iconUser from "../../assets/images/SVGRepo_iconCarrier.png";
import { ToastContainer, toast } from 'react-toastify';

function ListUser() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await apiService.user.getUsers();
        setUser(usersData);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  const changeUserStatus = async (id) => {
    const response = await apiService.user.changeStatus(id);
    if (response.status == 201) {
      location.reload();
      toast.success("Usuário criado com sucesso!");
      return;
    }
    toast.error("Não foi possível alterar o status");
  };

  function isEmpty() {
    user.length === 0;
  }

  return (
    <main className="main-list-user">
      <ToastContainer />
      <section className="container-list-user">
        <div className="header-list-user">
          <h1>Lista Usuário</h1>
        </div>

        <div className="search-user">
          <input type="text" placeholder="Pesquisar Usuário" />
          <button onClick={() => navigate("/admin/register")}>
            <img
              src={iconUser}
              alt="Icone de pesquisa"
              className="image-icon"
            />
          </button>
        </div>

        <div className="table-user">
          {!isEmpty() ?
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Editar</th>
                  <th>Grupo</th>
                  <th>Status</th>
                  <th>HAB / DES</th>
                </tr>
              </thead>
              <tbody>
                {user.map((user, key) => (
                  <tr key={key}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        disabled={localStorage.getItem("token") == user.id}
                        onClick={() => redirectUpdate(user.id)}>Editar</button>
                    </td>
                    <td>{user.groupEnum}</td>
                    <td>{user.status ? "Ativo" : "Inativo"}</td>
                    <td>
                      <button
                        onClick={() =>  navigate(`/admin/edit/${user.id}`)}>{user.status ? "Desabilitar" : "Habilitar"}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            : <h1>Não há usuários</h1>

          }

        </div>
      </section>
    </main>
  );
}

export default ListUser;
