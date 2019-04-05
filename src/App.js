import React, { Component } from 'react';
import {
  Container,
  Form,
  Table,
  Header,
  Segment,
  Message,
} from 'semantic-ui-react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryField: '',
      error: '',
    };
  }

  submitQuery = async query => {
    const { data } = await axios({
      method: 'POST',
      url: process.env.REACT_APP_HOST,
      data: {
        query,
      }
    });

    const { error, headers, rows } = data;

    this.setState({
      rows,
      headers,
      error,
    });
  }

  generateTable = (headers, rows) => (
    <Container className="result-table">
      <Table striped>
        <Table.Header>
          <Table.Row>
            {headers.map(value => <Table.HeaderCell key={value}>{value}</Table.HeaderCell>)}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row, index) => (
            <Table.Row key={index}>
              {
                row.map(value => <Table.Cell key={value}>{value}</Table.Cell>)
              }
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );

  render() {
    const {
      queryField,
      headers,
      rows,
      error,
    } = this.state;

    return (
      <Container className="main-container">
        <Segment clearing>
          <Header textAlign="center" size="huge">{process.env.REACT_APP_TITLE}</Header>
          <Form error={error}>
            <Form.TextArea
              name="queryField"
              placeholder="Enter SQL query here"
              value={queryField}
              onChange={this.handleChange}
            />
            <Message
              error
              header='Syntax Error'
              content={error}
            />
            <Form.Button
              floated="right"
              positive
              onClick={this.handleClick}
            >
              Submit
            </Form.Button>
          </Form>
        </Segment>

        { !error && headers && this.generateTable(headers, rows) }
      </Container>
    );
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleClick = () => {
    const { queryField } = this.state;
    this.submitQuery(queryField);
  }
}

export default App;
