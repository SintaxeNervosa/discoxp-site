# 🎮 DiscoXP Site – Frontend do E‑commerce de Games

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/louiemoreira76/discoxp-site?style=for-the-badge)](https://github.com/louiemoreira76/discoxp-site/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/louiemoreira76/discoxp-site?style=for-the-badge)](https://github.com/louiemoreira76/discoxp-site/network)
[![GitHub license](https://img.shields.io/github/license/louiemoreira76/discoxp-site?style=for-the-badge)](LICENSE)

**Interface web completa para clientes, estoquistas e administradores da loja virtual de jogos.**

</div>

## 📖 Sobre o projeto

O `discoxp-site` é o frontend da plataforma **DiscoXP**, um e‑commerce focado na venda de jogos.  
Desenvolvido com **React** e **Vite**, oferece:

- Catálogo dinâmico de produtos (com imagens, avaliações e efeitos 3D)
- Carrinho de compras persistente (IndexedDB)
- Área de cliente: perfil, endereços, histórico de pedidos
- Painel backoffice para estoquistas e administradores
- Login diferenciado por perfil (cliente, estoquista, admin)

A aplicação se comunica diretamente com a `discoxp-api` via requisições REST autenticadas.

## ✨ Funcionalidades

### Para visitantes / clientes
- Navegar por produtos com filtros e seções (PlayStation, Xbox, Nintendo)
- Visualizar detalhes do produto (descrição, avaliação, imagens)
- Adicionar/remover itens do carrinho (salvo localmente)
- Realizar login ou cadastro
- Finalizar compra (selecionar endereço, forma de pagamento)
- Gerenciar perfil e endereços
- Acompanhar pedidos

### Para estoquistas (acesso restrito)
- Visualizar lista de produtos
- Atualizar quantidades em estoque

### Para administradores (acesso restrito)
- CRUD completo de produtos (incluindo upload de imagens em binário para banco)
- Gerenciar usuários (criar, editar, remover)
- Ver todos os pedidos da loja

## 🛠️ Tecnologias

| Categoria       | Tecnologia                                                         |
|-----------------|--------------------------------------------------------------------|
| Framework       | React 18                                                           |
| Build tool      | Vite                                                               |
| Roteamento      | React Router DOM                                                   |
| Estilização     | Styled Components + SCSS (global)                                 |
| Gerenciamento de estado | Context API (carrinho, autenticação) + Dexie (IndexedDB)    |
| Requisições HTTP| Axios                                                              |
| Validação de formulários | (implementada manualmente)                                   |
| Efeitos 3D / animações | Three.js (@react-three/fiber), Framer Motion, Swiper           |
| Ícones          | React Icons, Boxicons, Bootstrap Icons                            |                               |

## 🚀 Como rodar localmente

### Pré‑requisitos
- Node.js 18+
- npm (ou yarn)

## 📁 Project Structure

```
discoxp-site/
├── public/                # Ícones, fontes, imagens estáticas
├── src/
│   ├── assets/            # Imagens internas do frontend
│   ├── components/        # Componentes reutilizáveis (carrinho, perfil, backoffice...)
│   ├── config/            # Configuração do Axios e Dexie
│   ├── connection/        # Módulos que definem as rotas da API
│   ├── context/           # Contextos (CartContext, ProtectRoutes)
│   ├── pages/             # Páginas da aplicação (client, backoffice, web)
│   │   ├── client/        # Home, Login, Register, Produto, Carrinho, Finalização, Perfil
│   │   ├── backoffice/    # Login, Home, Listas de produtos/pedidos, Formulários (admin/stockist)
│   │   └── web/           # Página 404
│   ├── SCSS/              # Estilos globais e mixins
│   ├── Routes.jsx         # Definição de todas as rotas
│   └── main.jsx           # Ponto de entrada
├── index.html             # HTML principal
├── vite.config.js         # Configuração do Vite
└── package.json           # Scripts e dependências
```
