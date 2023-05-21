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
      novaTarefa: {
        descricao: "",
        prioridade: "",
      },
    };
  }

  handleChange = (event) => {
    this.setState({
      novaTarefa: {
        ...this.state.novaTarefa,
        descricao: event.target.value,
      },
    });
  };

  handleChangePrioridade = (event) => {
    this.setState({
      novaTarefa: {
        ...this.state.novaTarefa,
        prioridade: event.target.value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { tarefas, novaTarefa } = this.state;
    if (
      novaTarefa.descricao.trim() === "" ||
      novaTarefa.prioridade.trim() === ""
    )
      return;

    const updatedTarefas = [...tarefas, novaTarefa];
    this.setState({
      tarefas: updatedTarefas,
      novaTarefa: {
        descricao: "",
        prioridade: "",
      },
    });
  };

  handleDelete = (index) => {
    const { tarefas } = this.state;
    const updatedTarefas = tarefas.filter((_, i) => i !== index);
    this.setState({ tarefas: updatedTarefas });
  };

  render() {
    const { tarefas, novaTarefa } = this.state;
    return (
      <div className="container">
        <Form onSubmit={this.handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="textarea">
              <Form.Label>Tarefa</Form.Label>
              <Form.Select
                defaultValue="Prioridade"
                value={novaTarefa.prioridade}
                onChange={this.handleChangePrioridade}
              >
                <option>Baixa</option>
                <option>Média</option>
                <option>Alta</option>
              </Form.Select>
              <Form.Control
                type="text"
                placeholder="Tarefa"
                value={novaTarefa.descricao}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button type="submit">Adicionar</Button>
          </Row>
        </Form>
        <Row className="mb-3">
          <Col>
            <h5>Tarefa</h5>
            <ul>
              {tarefas.map((tarefa, index) => (
                <li key={index}>
                  {tarefa.descricao} - {tarefa.prioridade}
                  <Button
                    variant="danger"
                    onClick={() => this.handleDelete(index)}
                  >
                    Excluir
                  </Button>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </div>
    );
  }
}
