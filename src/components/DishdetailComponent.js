import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { DISHES } from '../shared/dishes';


class DishDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  renderDish(dish) {
    // dish always defined
    return(
      <Card>
        <CardImg top src={this.state.dishes.image} alt={this.state.dishes.name} />
        <CardBody>
          <CardTitle>{this.state.dishes.name}</CardTitle>
          <CardText>{this.state.dishes.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  renderComments(comments) {
    if (comments != null) {
      const dateOpts = {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      };

      const comment = this.state.dishes.comments.map((objCom) => {
        const comDate = new Date(objCom.date);

        return(
          <li key={objCom.id}>
            <p>{objCom.comment}</p>
            <p>-- <span>{objCom.author}</span>, <span>{comDate.toLocaleDateString("en-US", dateOpts)}</span></p>
          </li>
        );
      });

      return (
        <ul className="list-unstyled">
          {comment}
        </ul>
      );
    }
    else
      return(
        <div></div>
      );
  }

  render() {
    if (this.props.dish !== null) {
      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(this.state.dishes)}
          </div>

          <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            {this.renderComments(this.state.dishes.comments)}
          </div>
        </div>
      );
    }
    else {
      return(
        <div></div>
      );
    }
  }
}

export default DishDetail;