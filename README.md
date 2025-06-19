# 🚀 Mini Insights

**Mini Insights** é uma plataforma fullstack moderna para registrar, organizar e visualizar ideias ou aprendizados do dia a dia.  
Conta com autenticação segura, filtros por tags e uma interface limpa, focada na boa experiência do usuário.

---

## 🧠 Visão Geral

Funcionalidades principais:

- ✅ Cadastro e login com autenticação JWT
- 📝 CRUD completo de insights (criar, ler, editar, excluir)
- 🏷️ Filtragem de insights por **tags**
- 🔍 Paginação de resultados
- 💬 Feedback visual com alertas
- 🎨 Interface moderna com Material UI

---

## 👨‍💻 Tecnologias Utilizadas

### 🔧 Backend
- **Node.js** – ambiente de execução
- **Express** – framework de API
- **SQLite3** – banco de dados local e leve
- **JWT (jsonwebtoken)** – autenticação via token
- **bcrypt** – criptografia de senhas
- **dotenv** – gerenciamento de variáveis ambiente
- **cors** – segurança CORS
- **nodemon** – reload automático para desenvolvimento

### 💻 Frontend
- **React.js** – biblioteca de construção de interface
- **Vite** – bundler moderno e rápido
- **Material UI (v7)** – design system com componentes acessíveis
- **axios** – cliente HTTP para API
- **react-hook-form** – gerenciamento de formulários e validações
- **zustand** – gerenciamento de estado global
- **react-router-dom (v7)** – sistema de rotas SPA
- **notistack** – sistema de alertas e feedbacks para o usuário

---

## 📁 Estrutura de Pastas

Mini-Insights/
│
├── backend/ # API RESTful com Express
│ ├── config/ # Configurações globais
│ ├── controllers/ # Lógica dos endpoints
│ ├── database/ # Inicialização e conexão com SQLite
│ ├── middleware/ # Middlewares como autenticação
│ ├── routes/ # Arquivos de rotas da API
│ ├── services/ # Camadas auxiliares
│ └── utils/ # Funções utilitárias
│
├── frontend/ # Aplicação React
│ ├── components/ # Componentes reutilizáveis
│ ├── context/ # Contexto global (ex: Auth)
│ ├── pages/ # Páginas principais
│ ├── router/ # Arquivos de rotas
│ └── services/ # Configuração do axios e chamadas HTTP

## ▶️ Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Guilherme48Dev/Mini-Insights.git
cd Mini-Insights
```

### 2. Inicie o Backend

```bash
cd backend
npm install
npm run dev
```
O servidor estará disponível em: http://localhost:3333

### 3. Inicie o Frontend

```bash
cd frontend
npm install
npm run dev
```
O frontend estará rodando em: http://localhost:5173

## 📬 Contato
Desenvolvido por **Guilherme Souza** 💻
Fique à vontade para enviar feedbacks ou contribuir com melhorias no projeto.