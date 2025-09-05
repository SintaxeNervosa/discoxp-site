import React, { useEffect, useState } from "react";
import "./listUser.css";
import { getUsers } from "../../services/user";
import { Link } from "react-router-dom";
import iconUser from "../../assets/images/SVGRepo_iconCarrier.png";

function ListUser() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUser(usersData);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <main className="main-list-user">
      <section className="container-list-user">
        <div className="header-list-user">
          <h1>Lista Usuário</h1>
        </div>

        <div className="search-user">
          <input type="text" placeholder="Pesquisar Usuário" />
          <button>
            <img
              src={iconUser}
              alt="Icone de pesquisa"
              className="image-icon"
            />
          </button>
        </div>

        <div className="table-user">
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
              {user.map((user) => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link to="/edit/1">Editar</Link>
                  </td>
                  <td>{user.groupEnum}</td>
                  <td>{user.status}</td>
                  <td>
                    <input type="checkbox" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default ListUser;
