import React, { Component } from 'react'

import '../../Styles/Wallpaper.css'
import Mealtypes from './Mealtypes';



export default class QuickSearch extends Component {

    constructor(){
        super();
        this.state = {
            mealtypes : []
        }
    }

    componentDidMount(){
        fetch('https://sagar-zomato-clone.herokuapp.com/zomato/mealtype', {method : 'GET'})
        .then(response => response.json())
        .then(output => this.setState({mealtypes : output.data}))
    }

  render() {
    console.log(this.mealtypes)
    const mealtypesList =this.state.mealtypes.length && this.state.mealtypes.map(items => <Mealtypes key={items.name} items={items}></Mealtypes>) 


    return (
      <div className='total-quickSearch'>
        <div className="quick-searches mt-5 ms-4">
          Quick Searches
        </div>
            
        <div className="qs-subtitle mt-3 ms-4">
          Discover restaurants by type of meal
        </div>
        
        <div className="container-fluid">
          <div className="row">
            {mealtypesList}

          </div>
        </div>
      </div>
    )
  }
}

