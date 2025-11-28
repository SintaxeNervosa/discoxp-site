import { useEffect, useState } from "react";
import "./listUser.scss";
import { Link, useNavigate } from "react-router-dom";
import iconUser from "../../assets/images/SVGRepo_iconCarrier.png";
import { ToastContainer, toast } from 'react-toastify';
import { changeUserStatus, getUsers } from "../../connection/userPaths";

function ListUser() {

  const [usersList, setUsersList] = useState([]);
  const [listIsEmpty, setListIsEmpty] = useState(true);

  const navigate = useNavigate();

  async function fetchUsers() {
    try {
      await getUsers().then(setUsersList);
    } catch (err) {
      toast.error("Ocorreu um erro ao buscar usuários");
    };
  }

  const changeStatus = async (id) => {
    const data = await changeUserStatus(id);

    if (data.status != 201) {
      toast.error("Ocorreu um erro ao alterar o status");
      return;
    }

    fetchUsers();
    toast.success("Status alterado com sucesso.");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setListIsEmpty(usersList.length === 0);
  }, [usersList]);

  function navigateToEdit(id) {
    try {
      navigate(`/admin/edit/${id}`);
    } catch (err) {
      toast.error(err.message);
    }
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
          {!listIsEmpty ?
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
                {usersList.map((user, key) => (
                  <tr key={key}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        disabled={localStorage.getItem("token") == user.id}
                        onClick={() => navigateToEdit(user.id)}>Editar</button>
                    </td>
                    <td>{user.groupEnum}</td>
                    <td>{user.status ? "Ativo" : "Inativo"}</td>
                    <td>
                      <button onClick={() => changeStatus(user.id)}>{user.status ? "Desabilitar" : "Habilitar"}</button>
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
