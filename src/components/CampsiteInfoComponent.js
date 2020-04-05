import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';


const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
class ComponentForm extends Component {
    constructor(props) {
    super(props);
    this.state = {
        firstName: '',
        lastName: '',
        isModalOpen: false,
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    toggleModal(values){
      this.setState({isModalOpen:!this.state.isModalOpen});
    }

    handleSubmit(values) {
        console.log("Current state is: ", values);
        alert("Current state is: " + JSON.stringify(values));
    }

    render() {
        return(
            <>
            <Button onClick={this.toggleModal} color="secondary" outline><i className="fa fa-pencil"></i> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen}>
                <ModalHeader>Submit Comment</ModalHeader>
                <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <Row className="form-group">
                      <Label htmlFor="rating" md={4}>Rating</Label>
                      <Col md={10}>
                      <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                     </Col>
                            </Row>
                            <Row className="form-group">
                      <Label htmlFor="author" md={4}>Your Name</Label>
                      <Col md={10}>
                                    <Control.text model=".author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}>
                                    </Control.text>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                    </Col>
                            </Row>
                            <Row className="form-group">
                      <Label htmlFor="text" md={4}>Comment</Label>
                      <Col md={10}>
                                    <Control.textarea model=".text" name=".text"
                                        rows="12"
                                        className="form-control">
                                        </Control.textarea>
                                        </Col>
                            </Row>
                            <Button type="submit" color="primary">Submit</Button>
                  </LocalForm>
                </ModalBody>
            </Modal>
            </>
        );
    }
}

function RenderCampsite({campsite}) {
        return(
            <div className = "col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
                </Card>
            </div>
        )
    }

    function RenderComments({comments}) {
        if (comments) {
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comments => <div key={comments.id}>{comments.text}<br />
                       -- {comments.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}
                        </div> )}
                        <ComponentForm />
               </div>
            );
        }
    }
    function CampsiteInfo(props) {
        if (props.campsite) {
                 return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
        }
            
            else {
                return (
                    <div>
                        </div>
                );
            }
        }
        export default CampsiteInfo;