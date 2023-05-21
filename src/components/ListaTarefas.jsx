import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
      <div className="">
        <Form onSubmit={this.handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Tarefa</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={novaTarefa}
                onChange={this.handleChange}
              />
            </Form.Group>
            <input
              type="text"
              value={novaTarefa}
              onChange={this.handleChange}
            />
            <Button type="submit">Adicionar</Button>
          </Row>
        </Form>
        <ul>
          {tarefas.map((tarefas, index) => (
            <li key={index}>
              {tarefas}
              <Button onClick={() => this.handleDelete}>Excluir</Button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
