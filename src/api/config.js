import axios from "axios";

const url = {
  development: "http://localhost:5000/tarefas",
};

// Pré-configurando a URL padrão do nosso backend em uma instância do Axios
export const api = axios.create({
  baseURL: url[process.env.NODE_ENV],
});

export const postTarefa = (novaTarefa) => {
  return api.post("/", novaTarefa);
};

