import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Wallpaper.css';
import '../Common/Header';

import HomeLogin from './HomeLogin';

export default class Wallpaper extends Component{

    constructor(){
        super()
        this.state = {
            locations :[],
            restaurants : []

        }
    }

    fetchRestaurants = (event)=>{
        fetch(`https://sagar-zomato-clone-app.onrender.com/zomato/restaurants/${event.target.value}`,{method:'GET'})
        .then(response => response.json())
        .then(data => this.setState({restaurants : data.data}))
    }

    componentDidMount(){       
        fetch('https://sagar-zomato-clone-app.onrender.com/zomato/locations',{method:'GET'})
        .then(response => response.json())
        .then(data => this.setState({locations : data.data}))
    }
    

    render(){
        // console.log(this.state.locations)

        const locationList = this.state.locations.length && this.state.locations.map(item => <option key={item.name} value={item.city_id}> {item.name}</option>)
        const restaurantList = this.state.restaurants.length && <ul>
                                                                    {
                                                                        this.state.restaurants.map(item =>
                                                                            <li key={item.name}>
                                                                                <Link to={`/details/${item.name}`}>
                                                                                    {item.name}
                                                                                </Link>
                                                                            </li>)
                                                                    }                                                           
                                                                </ul>
        console.log(this.state.restaurantList)
        return (
            
        <div className="container-fluid back-img">
            <div className="row text-end pt-4 login-signup-row">
                    {/* <div className="col-2 col-md-6 col-lg-7"></div>
                    <div className="col-2 col-lg-2 pe-4 text-end">
                        <a className="login" href="#">Login</a>
                    </div>
                    <div className="col-8 col-md-4 col-lg-3 text-start">
                        <a className="createacc px-2 py-2" href="#">Create an account</a>
                    </div> */}
                <HomeLogin/>
            </div>
            <div className="row pt-4 mx-auto text-center logo-row">                
                <div className="col-12">
                    <p className="px-4 py-3 px-md-4 py-md-2 logo">e!</p>
                </div>  
            </div>
            <div className="row pt-4 mx-auto text-center restaurant-title-row">
                <div className="col-12">
                    <p className="restaurant-title" >Find the best restaurants, cafés, and bars</p>
                </div>
            </div>
                
            <div className="row pt-4 mx-auto text-center search-bar-row">
                <div className="col-12 col-sm-12 col-md-1 col-lg-2 col-xl-3"></div>
                <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-4 mx-4">
                    <div className="locationSelector">
                        <select className="locationDropdown px-4 py-3" onChange={this.fetchRestaurants}>
                            <option value="0" selected disabled>Please type a location</option>
                            {locationList}
                        </select>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                    <div className="restaurantSelector">
                        <input className="restaurantsinput px-5 ps-5 py-3" type="text" placeholder="Search for restaurants" />
                            {restaurantList}
                        {/* <div className="search-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search "
                                viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </div> */}
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-1 col-lg-2 col-xl-2"></div>
            </div>
        </div>
        
        )
    }
}
 