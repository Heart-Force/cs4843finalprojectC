import React, { Component } from "react";
import axios from "axios";
import { Container, Card, Button, Form, Alert, Badge, Modal } from "react-bootstrap";

import { VscDebugStart } from 'react-icons/vsc';
import {AiOutlineDelete, AiOutlineCheckSquare} from 'react-icons/ai';
import {FiEdit} from 'react-icons/fi';
import {RiPlayListAddFill} from 'react-icons/ri';
import {CgPlayListAdd} from 'react-icons/cg';

import {LIST_USER_TASKS_URL, UPDATE_USER_TASK_URL, DELETE_USER_TASK_URL, ADD_USER_TASK_URL} from '../constants/Constants.js';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTitle: '',
      taskDetails: '',
      tasks: [],
      showEditModal: false,
      validateMainForm: false,
      validateModalForm: false,
      modalTask: {}
    };
  }

  componentDidMount() {
    this.getAllTasks();
  }

  getAllTasks = () => {
    axios
      .get(`${LIST_USER_TASKS_URL}?id=${localStorage.getItem('userId')}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      })
      .then((response) => {
        this.setState({ tasks: response.data, taskTitle: '', taskDetails: '', modalTask: {}, showEditModal: false, validateMainForm: false, validateModalForm: false });
      });
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = () => {
    if(this.state.taskTitle === '' || this.state.taskDetails === ''){
      this.setState({validateMainForm: true})
    } else {
    axios.post(ADD_USER_TASK_URL, {taskTitle: this.state.taskTitle, taskDetails: this.state.taskDetails, taskStatus: 'NEW', user_id: localStorage.getItem('userId')},
    {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      })
    .then((response) => {
      if(response.status === 200){
        console.log('task created successfully!');
        this.getAllTasks();
      }
    })
  }
  }

  handleDelete = (id) => {
    axios.delete(`${DELETE_USER_TASK_URL}?id=${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      })
    .then((response) => {
      if(response.status === 200){
        console.log('task deleted successfully!');
        this.getAllTasks();
      }
    })
  }

  handleUpdateStatus = (id, status) => {
    axios.post(UPDATE_USER_TASK_URL, {id: id, taskStatus: status},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      })
    .then((response) => {
      if(response.status === 200){
        console.log('task updated successfully!');
        this.getAllTasks();
      }
    })
  }

  handleEdit = (id) => {
    axios
      .get(`${LIST_USER_TASKS_URL}?itemId=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      })
      .then((response) => {
        this.setState({ showEditModal: true, modalTask: {
          id: response.data.id, 
          taskDetails: response.data.taskDetails,
          taskTitle: response.data.taskTitle,
          taskStatus: response.data.taskStatus
        }});
      });
  }

  hideModal = () => {
    this.setState({showEditModal: false, modalTask: {}})
  }

  handleModalTaskChange = (e) => {
    if(e.target.name === 'taskDetails'){
      this.setState({modalTask: {id: this.state.modalTask.id, taskTitle: this.state.modalTask.taskTitle, taskDetails: e.target.value}})
    }

    if(e.target.name === 'taskTitle'){
      this.setState({modalTask: {id: this.state.modalTask.id, taskTitle: e.target.value, taskDetails: this.state.modalTask.taskDetails}})
    }
    
  }

  handleSaveEdittedItem = () => {
    if(this.state.modalTask.taskTitle === '' || this.state.modalTask.taskDetails === ''){
      this.setState({validateModalForm: true})
    } else {
    axios.post(UPDATE_USER_TASK_URL, this.state.modalTask, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    })
    .then((response) => {
      if(response.status === 200){
        console.log('task updated successfully!');
        this.getAllTasks();
      }
    })
  }
  }

  render() {
    return (
      <div>
        

        <Container className="mt-5">
          <Card className="mb-4 hoverEffect">
            <Card.Header style={{backgroundColor: "#003638", color: "#F1A182", fontSize: "20px"}}><RiPlayListAddFill  size={'1.5rem'}/>{' '}Add new task</Card.Header>
            <Card.Body style={{backgroundColor: "#F5F8F1"}}>
              <Form validated={this.state.validateMainForm}>
                <Form.Group className="mb-3" controlId="taskTitle">
                  <Form.Label>Task Title</Form.Label>
                  <Form.Control
                  required
                    type="text"
                    placeholder="Enter your task title"
                    name="taskTitle"
                    onChange={this.handleChange}
                    value={this.state.taskTitle}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="taskDetails">
                  <Form.Label className="form-label">Task Details</Form.Label>
                  <Form.Control required as="textarea" rows={3} name="taskDetails" onChange={this.handleChange} value={this.state.taskDetails}/>
                </Form.Group>

                <Button variant="outline-dark" onClick={this.handleSubmit} className="hoverEffect"><CgPlayListAdd  size={'1.5rem'}/>{' '}Create Task</Button>
              </Form>
            </Card.Body>
          </Card>


          {this.state.tasks.map((item) => {
            return <Alert variant="secondary" key={item.id} className="hoverEffect">
            <Alert.Heading  className="d-flex inline justify-content-between"><span>{item.taskStatus !== 'COMPLETED' ? item.taskTitle : <s>{item.taskTitle}</s>}</span> <span><Badge bg="success" className='hoverEffect'>{item.taskStatus}</Badge></span></Alert.Heading>
            <hr />
            <p className="mb-0">
            {item.taskStatus !== 'COMPLETED' ? item.taskDetails : <s>{item.taskDetails}</s>}
            </p>
            <div className="d-flex justify-content-end mt-3">
            
            {item.taskStatus !== 'COMPLETED' ? <Button variant="outline-dark" className="mx-1 hoverEffect" onClick={() => this.handleEdit(item.id)}><FiEdit size={'1.5rem'}/>{' '}Edit</Button> : null}
            
            <Button variant="outline-dark" className="mx-1 hoverEffect" onClick={() => this.handleDelete(item.id)}><span className="material-icons-outlined"><AiOutlineDelete size={'1.5rem'}/>{' '}Delete</span></Button>{'  '}
            
            {item.taskStatus === 'COMPLETED' || item.taskStatus === 'NEW' ? <Button variant="outline-dark" className="mx-1 hoverEffect" onClick={() => this.handleUpdateStatus(item.id, 'IN PROGRESS')}><VscDebugStart size={'1.5rem'} />{' '}Start</Button> : null}
            
            {item.taskStatus === 'IN PROGRESS' ? <Button variant="outline-dark" className="mx-1 hoverEffect" onClick={() => this.handleUpdateStatus(item.id, 'COMPLETED')}><AiOutlineCheckSquare size={'1.5rem'}/>{' '}Finished</Button> : null}
            
            </div>
          </Alert>
          })}    




          {
            this.state.showEditModal ? 
            <Modal size="lg" centered show={this.state.showEditModal}>
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Task
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form validated={this.state.validateModalForm}>
                <Form.Group className="mb-3" controlId="taskTitle">
                  <Form.Label>Task Title</Form.Label>
                  <Form.Control
                  required
                    type="text"
                    placeholder="Enter your task title"
                    name="taskTitle"
                    onChange={this.handleModalTaskChange}
                    value={this.state.modalTask.taskTitle}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="taskDetails">
                  <Form.Label className="form-label">Task Details</Form.Label>
                  <Form.Control required as="textarea" rows={3} name="taskDetails" onChange={this.handleModalTaskChange} value={this.state.modalTask.taskDetails}/>
                </Form.Group>

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-dark" onClick={this.hideModal} className="mx-1">Cancel</Button><Button variant="outline-dark" onClick={this.handleSaveEdittedItem} className="mx-1">Save and Close</Button>
            </Modal.Footer>
          </Modal>
            :
            null
          }


        </Container>
      </div>
    );
  }
}

export default Home;
