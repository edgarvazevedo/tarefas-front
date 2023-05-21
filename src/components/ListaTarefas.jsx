import React from "react";

export default class ListaTarefas extends React.Component {
  constructor(props) {
    super(props);
    // Inicializa o estado do componente com uma lista de tarefas vazia e uma nova tarefa vazia
    this.state = {
      tarefas: [],
      novaTarefa: "",
    };
  }

  handleChange = (event) => {
    // Atualiza o estado com o valor digitado no campo de texto da nova tarefa
    this.setState({ novaTarefa: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { tarefas, novaTarefa } = this.state;
    // Verifica se a nova tarefa não está vazia antes de adicioná-la à lista de tarefas
    if (novaTarefa.trim() === "") return;

    // Cria uma cópia da lista de tarefas atual e adiciona a nova tarefa à cópia
    const updateTarefa = [...tarefas, novaTarefa];
    // Atualiza o estado com a lista de tarefas atualizada e limpa o campo da nova tarefa
    this.setState({ tarefas: updateTarefa, novaTarefa: "" });
  };

  handleDelete = (index) => {
    const { tarefas } = this.state;
    // Remove a tarefa da lista com base no índice fornecido
    const updateTarefa = tarefas.filter((tarefas, i) => i !== index);
    // Atualiza o estado com a lista de tarefas atualizada (sem a tarefa removida)
    this.setState({ tarefas: updateTarefa });
  };

  render() {
    const { tarefas, novaTarefa } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={novaTarefa} onChange={this.handleChange} />
          <button type="submit">Adicionar</button>
        </form>
        <ul>
          {tarefas.map((tarefas, index) => (
            <li key={index}>
              {tarefas}
              <button onClick={() => this.handleDelete}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
