// método que retorna o tipo de usuário da SessioStorage
export function getUserGrop() {
    const userData = sessionStorage.getItem("user-data");

    if (!userData) { return null; }

    const userToJson = JSON.parse(userData);

    return userToJson.group;
}