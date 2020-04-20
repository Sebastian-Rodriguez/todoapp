import React, { Component } from "react";
import db from "../FirestoreConfig";
import { Table, Button, Row, Col, InputGroup, Input, Alert } from "reactstrap";

export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      InputValue: "",
      showMessage: false,
      messageType: "",
      message: "",
      edit: false,
      id: null
    };
  }

  componentDidMount() {
    db.collection("todos").onSnapshot(
      snapShots => {
        this.setState({
          items: snapShots.docs.map(doc => {
            return { id: doc.id, data: doc.data() };
          })
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  changeValue = e => {
    this.setState({
      InputValue: e.target.value
    });
  };

  saveItem = () => {
    const { InputValue } = this.state

    if (InputValue === "") {
      this.setMessage("Enter a new todo to save", "danger");
    } else {
      try {
        db.collection("todos").add({
          item: InputValue
        });
        this.setMessage("Added Succefully", "success");
      } catch (error) {
        this.setMessage("Error to try save", "danger");
        console.log(error);
      } finally {
        this.setState({ InputValue: "" });
      }
    }
  }

  getTodo = (id) => {
    const doc = db.collection('todos').doc(id)
    
    doc.get().then(doc => {
      if(doc.exists){
        this.setState({
          id: doc.id,
          InputValue: doc.data().item,
          edit: true
        })
      }
    }) 
  }

  editTodo = (id, value) => {
    try{
      db.collection('todos').doc(id).update({
      item: value
      })

      this.setMessage('Edited Succefully', 'success')
    }catch(error){
      this.setMessage('Error to try edit', 'danger')
      console.log(error)
    }finally{
      this.setState({
        id: null,
        edit: false,
        InputValue: ''
      })
    }
  }

  action = () => {
    const { edit, id, InputValue }= this.state

    if(edit){
      this.editTodo(id, InputValue)
    }else {
      this.saveItem()
    }
  };

  delete = id => {
    try {
      db.collection("todos")
        .doc(id)
        .delete();

      this.setMessage("Deleted Succefully", "success");
    } catch (error) {
      this.setMessage("Error to try delete", "danger");
      console.log(error)
    }
  };

  setMessage = (message, messageType) => {
    this.setState({
      message,
      messageType,
      showMessage: true
    });

    setTimeout(() => {
      this.setState({
        message: "",
        messageType: "",
        showMessage: false
      });
    }, "3000");
  };

  render() {
    const { items, InputValue, showMessage, message, messageType, edit } = this.state;
    return (
      <React.Fragment>
        {showMessage && (
          <Alert color={messageType} fade={true}>
            {message}
          </Alert>
        )}
        <Row>
          <Col xs="10">
            <InputGroup className="mb-4">
              <Input
                placeholder="Add a new todo"
                value={InputValue}
                onChange={this.changeValue}
              />
            </InputGroup>
          </Col>
          <Col xs="2">
            <Button color="info" onClick={this.action}>
              { edit ? 'Save' : 'Add'}
            </Button>
          </Col>
        </Row>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {items && items !== undefined
              ? items.map((item, key) => (
                  <tr key={key}>
                    <td>{item.data.item}</td>
                    <td>
                      <Button color="warning" onClick={ () => this.getTodo(item.id) }>Edit</Button>
                    </td>
                    <td>
                      <Button
                        color="danger"
                        onClick={() => this.delete(item.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}
