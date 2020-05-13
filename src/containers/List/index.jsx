import React, { Component } from 'react';
import mobiscroll from 'mobiscroll/mobiscroll.react.min';
import './style.css';

class ListItem extends React.Component {
    render() {
        return  <li data-role={this.props.item.header ? "list-divider" : ""}>{this.props.item.header ? '' : <img src={this.props.item.src} className="md-img" />} {this.props.item.text} {this.props.item.header ? '' : <span className="md-price">{this.props.item.price}</span>}</li>;
    }
}

class ListviewDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drinks: [{
                id: 0,
                header: true,
                text: "Non Alcoholic drinks"
            },{
                id: 1,
                src: "https://img.mobiscroll.com/demos/dCappuccino.jpg",
                text: "Cappuccino",
                price: "$3.00"
            }, {
                id: 2,
                src: "https://img.mobiscroll.com/demos/dCoffee.jpg",
                text: "Coffee",
                price: "$2.60"
            }, {
                id: 3,
                src: "https://img.mobiscroll.com/demos/dCola.jpg",
                text: "Coca Cola",
                price: "$3.50"
            }, {
                id: 4,
                src: "https://img.mobiscroll.com/demos/dMilk.jpg",
                text: "Milk",
                price: "$2.50"
            }, {
                id: 5,
                src: "https://img.mobiscroll.com/demos/dPepsi.jpg",
                text: "Pepsi",
                price: "$3.50"
            }, {
                id: 6,
                src: "https://img.mobiscroll.com/demos/dTea.jpg",
                text: "Tea",
                price: "$3.00"
            }, {
                id: 7,
                src: "https://img.mobiscroll.com/demos/dWater.jpg",
                text: "Water",
                price: "$2.00"
            },{
                id: 8,
                header: true,
                text: "Alcoholic drinks"
            }, {
                id: 9,
                src: "https://img.mobiscroll.com/demos/dBeer.jpg",
                text: "Beer",
                price: "$3.00"
            }, {
                id: 10,
                src: "https://img.mobiscroll.com/demos/dGin.jpg",
                text: "Gin",
                price: "$4.00"
            }, {
                id: 11,
                src: "https://img.mobiscroll.com/demos/dMartini.jpg",
                text: "Martini",
                price: "$4.50"
            }, {
                id: 12,
                src: "https://img.mobiscroll.com/demos/dRum.jpg",
                text: "Rum",
                price: "$5.00"
            }, {
                id: 13,
                src: "https://img.mobiscroll.com/demos/dWine.jpg",
                text: "Wine",
                price: "$4.50"
            }, {
                id: 14,
                src: "https://img.mobiscroll.com/demos/dWhiskey.jpg",
                text: "Whiskey",
                price: "$6.00"
            }]
        };
    }

    onItemTap = () => {
        this.props.history.push('/review');
    }

    render() {
        return (
            <div className="md-groupsort">
                <mobiscroll.Listview 
                    itemType={ListItem} 
                    data={this.state.drinks}
                    swipe={false}
                    enhance={true}
                    onItemTap={this.onItemTap}
                />
            </div>
        );
    }
}

export default ListviewDemo;