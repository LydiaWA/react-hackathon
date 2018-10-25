import React, { Component } from 'react';

class Booklist extends Component{
    constructor(props) {
        super(props)
    }

    render(){
        return (
            
        <div className = "card">
            <img className = "card-img-top" src = {this.props.cover} alt = "Card image cap"/>
            <div className = "card-body">
                <h5 className = "card-title">{`${this.props.rank} - ${this.props.title}`}</h5>
                <p className = "card-text font-weight-bold text-info">{`By ${this.props.author}`}</p>
                <p className = "card-text">{this.props.description}</p>
                <p className = "card-text font-italic text-info">{`goodreads rating: ${this.props.rating} `}</p>
            <div className = "card-footer">
                <a href = {this.props.amazon} >Open in Amazon</a>
                </div>
            </div>
        </div>

        )
    }
}

export default Booklist;