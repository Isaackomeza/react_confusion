import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import{Button, Modal, ModalHeader, ModalBody,
     Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state={
            isModalOpen: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
      handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render(){
        return(
            <div>
                <Button outline color="info" onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>Submit comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <div className="form-group">
                            <Label htmlFor="Rating"><strong>Rating</strong></Label>
                                <div md={{size: 3, offset: 1}}>
                                    <Control.select model=".Rating" name="Rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </div>
                            </div>
                            <div className="form-group">
                            <Label htmlFor="Name"><strong>Your Name</strong></Label>
                                <div md={10}>
                                    <Control.text model=".Name" id="Name" name="Name"
                                        placeholder="Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".Name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </div>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment" ><strong>Comment</strong></Label>
                                <div md={10}>
                                    <Control.textarea model=".Comment" id="Comment" name="Comment"
                                        rows="6"
                                        className="form-control"
                                         />
                                </div>
                            </div>
                            <div className="form-group">
                                <div md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </div>
                            </div>
                        </LocalForm>
                        </ModalBody>
                    </Modal>
            </div>
        );
    }
}
function RenderComments({comments, addComment, dishId}) {
    let options = { year: 'numeric', month: 'short', day: '2-digit' };
    const comm = comments.map((comment) => {
        if(comment!=null)
        return (
          <div>
              
            <ul className="list-unstyled" id={comment.id}>
                <li><p>{comment.comment}</p>
                <p>--{comment.author} , {new Date(comment.date).toLocaleDateString("en-US", options)}</p></li>
            </ul>
          </div>
        );
        else
            return(
                <div> </div>
            );
    });
    return(
        <div >
            <h4>Comments</h4>
            {comm}
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>
    );
}
function RenderDish({dish}){
    return(
        <div>
        <Card>    
            <CardImg width="100%"  src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
         </div>
    );
}
  const DishDetail=(props)=>{
    if(props.dish!=null)
    return (
        <div className="container">
        <div className="row">
            <Breadcrumb>

                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish}/>
            </div>
            <div className="col-12 col-md-5 m-1">
            <RenderComments 
                comments={props.comments}
                addComment={props.addComment}
                dishId={props.dish.id}
            />
            </div>
        </div>
        </div>
    );
      

}
export default DishDetail;