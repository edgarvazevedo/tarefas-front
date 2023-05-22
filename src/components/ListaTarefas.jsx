import React from "react";
import { Button } from "@mantine/core";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { IconTrash, IconPencil } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";

import { api } from "../api/config";
import tarefaUtils from "../utils/tarefaUtils"; // Importe as funções de manipulação do arquivo utils/tarefaUtils.js

export default class ListaTarefas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tarefas: [],
      novaTarefa: {
        descricao: "",
        prioridade: "",
      },
      tarefaEditada: null,
    };
  }

  componentDidMount() {
    // Faz a chamada GET para buscar as tarefas da API
    api
      .get("/")
      .then((response) => {
        const tarefas = response.data;
        this.setState({ tarefas });
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar tarefas:", error);
      });
  }

  handleChange = (event) => {
    this.setState({
      novaTarefa: {
        ...this.state.novaTarefa,
        descricao: event.target.value,
      },
    });
  };

  handleEditClick = (tarefa) => {
    tarefaUtils.handleEdit(tarefa._id, this.setState.bind(this));
  };

  handleChangePrioridade = (event) => {
    this.setState({
      novaTarefa: {
        ...this.state.novaTarefa,
        prioridade: event.target.value,
      },
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
        <Row className="mb-3">
          <h1>Minhas Tarefas</h1>
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <ActionIcon
                        variant="filled"
                        onClick={() =>
                          tarefaUtils.handleEdit(
                            tarefa._id,
                            novaTarefa,
                            this.setState.bind(this)
                          )
                        }
                      >
                        <IconPencil size="1rem" />
                      </ActionIcon>
                      <ActionIcon
                        variant="filled"
                        onClick={() =>
                          tarefaUtils.handleDelete(
                            tarefa._id,
                            this.setState.bind(this)
                          )
                        }
                      >
                        <IconTrash size="1rem" />
                      </ActionIcon>
                    </div>
                  </td>
                </tr>
              ))}
              {this.state.tarefaEditada && (
                <tr>
                  <td colSpan={3}>
                    <Form onSubmit={this.handleEditSubmit}>
                      <Form.Group as={Col} md={6} controlId="textarea">
                        <Form.Label>Prioridade</Form.Label>
                        <Form.Select
                          value={this.state.tarefaEditada.prioridade}
                          onChange={this.handleEditChangePrioridade}
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
                          value={this.state.tarefaEditada.descricao}
                          onChange={this.handleEditChange}
                        />
                      </Form.Group>
                      <Button type="submit">Salvar</Button>
                      <Button variant="secondary" onClick={this.cancelEdit}>
                        Cancelar
                      </Button>
                    </Form>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <div>
            <Form
              onSubmit={(event) =>
                tarefaUtils.handleSubmit(
                  event,
                  novaTarefa,
                  this.setState.bind(this)
                )
              }
            >
              <Row className="mb-3">
                <Col md={6} className="justify-content-center">
                  <h1>Adicionar Tarefa</h1>
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tarefa"
                    value={novaTarefa.descricao}
                    onChange={this.handleChange}
                  />
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
                  <Button type="submit" className="mb-3">
                    Adicionar
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Row>
      </div>
    );
  }
}
