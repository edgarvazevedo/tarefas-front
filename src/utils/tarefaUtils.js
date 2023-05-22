import axios from "axios";

export function handleDelete(_id, setState) {
  axios
    .delete(`http://localhost:5000/tarefas/${_id}`)
    .then(() => {
      setState((prevState) => ({
        ...prevState,
        tarefas: prevState.tarefas.filter((tarefa) => tarefa._id !== _id),
      }));
    })
    .catch((error) => {
      console.error("Erro ao excluir tarefa:", error);
    });
}

export function handleEdit(_id, novaTarefa, setState) {
  const data = {
    descricao: novaTarefa ? novaTarefa.descricao : "",
    prioridade: novaTarefa ? novaTarefa.prioridade : "",
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .put(`http://localhost:5000/tarefas/${_id}`, data, config)
    .then((response) => {
      console.log("Tarefa editada com sucesso:", response.data);

      setState((prevState) => ({
        ...prevState,
        tarefas: prevState.tarefas.map((t) =>
          t._id === response.data._id ? response.data : t
        ),
        novaTarefa: {
          descricao: "",
          prioridade: "",
        },
        tarefaEditando: null,
      }));
    })
    .catch((error) => {
      console.error("Erro ao editar tarefa:", error);
    });
}

export function handleSubmit(event, novaTarefa, setState) {
  event.preventDefault();

  // Verifica se os campos obrigatórios estão preenchidos
  if (
    novaTarefa.descricao.trim() === "" ||
    novaTarefa.prioridade.trim() === ""
  ) {
    return;
  }

  const data = {
    descricao: novaTarefa.descricao,
    prioridade: novaTarefa.prioridade,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("http://localhost:5000/tarefas", data, config)
    .then((response) => {
      console.log("Tarefa criada com sucesso:", response.data);

      setState((prevState) => ({
        ...prevState,
        tarefas: [...prevState.tarefas, response.data],
        novaTarefa: {
          descricao: "",
          prioridade: "",
        },
      }));
    })
    .catch((error) => {
      console.error("Erro ao criar tarefa:", error);
    });
}

export default {
  handleDelete,
  handleSubmit,
  handleEdit,
};
