import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

import { api, postTarefa } from "../api/config";
import axios from "axios";

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

  handleDelete = (_id) => {
    const { tarefas } = this.state;

    // Faz a chamada DELETE para excluir a tarefa
    axios
      .delete(`http://localhost:5000/tarefas/${_id}`)
      .then(() => {
        // Remove a tarefa do estado
        const updatedTarefas = tarefas.filter((tarefa) => tarefa._id !== _id);
        this.setState({ tarefas: updatedTarefas });
      })
      .catch((error) => {
        console.error("Erro ao excluir tarefa:", error);
      });
  };

  componentDidMount() {
    // Faz a chamada GET para buscar as tarefas da API
    api
      .get("/")
      .then((response) => {
        const tarefas = response.data; // Obtém as tarefas da resposta da API
        this.setState({ tarefas }); // Atualiza o estado com as tarefas recebidas
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar tarefas:", error);
      });
  }

  buscarTarefaPorId = (id) => {
    api
      .get(`/tarefas/${id}`)
      .then((response) => {
        const tarefa = response.data; // Obtém a tarefa da resposta da API
        // Atualiza o estado ou faça qualquer outra ação com a tarefa obtida
      })
      .catch((error) => {
        console.error("Erro ao buscar tarefa por ID:", error);
      });
  };

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
    const { novaTarefa } = this.state;

    // Verifica se os campos obrigatórios estão preenchidos
    if (
      novaTarefa.descricao.trim() === "" ||
      novaTarefa.prioridade.trim() === ""
    ) {
      return;
    }

    // Cria um objeto com os dados a serem enviados
    const data = {
      descricao: novaTarefa.descricao,
      prioridade: novaTarefa.prioridade,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Faz a chamada POST para enviar os dados para o backend
    axios
      .post("http://localhost:5000/tarefas", data, config)
      .then((response) => {
        // Lida com a resposta do backend, se necessário
        console.log("Tarefa criada com sucesso:", response.data);

        // Atualiza o estado ou realiza outras ações necessárias
        const { tarefas } = this.state;
        const updatedTarefas = [...tarefas, response.data];
        this.setState({
          tarefas: updatedTarefas,
          novaTarefa: {
            descricao: "",
            prioridade: "",
          },
        });
      })
      .catch((error) => {
        console.error("Erro ao criar tarefa:", error);
      });
  };

  render() {
    const { tarefas, novaTarefa } = this.state;

    // Verifica se tarefas não é um array
    if (!Array.isArray(tarefas)) {
      return <p>Erro ao carregar as tarefas.</p>;
    }
    return (
      <div className="container">
        <Form onSubmit={this.handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="textarea">
              <Form.Label>Prioridade</Form.Label>
              <Form.Select
                value={novaTarefa.prioridade}
                onChange={this.handleChangePrioridade}
              >
                <option disabled hidden value="">
                  Escolha sua prioridade
                </option>
                <option>Baixa</option>
                <option>Média</option>
                <option>Alta</option>
              </Form.Select>
              <Form.Label>Descrição</Form.Label>
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Prioridade</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {tarefas.map((tarefa) => (
                <tr key={tarefa._id}>
                  <td>{tarefa.descricao}</td>
                  <td>{tarefa.prioridade}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => this.handleDelete(tarefa._id)}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </div>
    );
  }
}
