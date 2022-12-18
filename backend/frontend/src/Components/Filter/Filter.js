import { useState ,useEffect} from "react";
import React from 'react';
import Header from "../Common/Header";
import '../../Styles/Filter.css'
import { useParams } from "react-router-dom";


export default function Filter() {
    const [locationName , setLocationName] = useState('')

    const[location , setLocation] = useState([])

    const[pageCount, setPageCount] = useState(0)
    const[currentPage, setCurrentPage] = useState(1)
    
    const[restaurant, setRestaurant] = useState({})

    // reading mealtype from url 
    let {mealType} = useParams()

    const [filter,setFilter] =useState({
        city_id:'',
        cuisine:[],
        lcost:'',
        hcost:'',
        location:[],
        sort: 1,
        type: [`${mealType.toLocaleLowerCase()}`]
    })

    useEffect(()=>{
        fetch(`https://sagar-zomato-clone-app.onrender.com/zomato/restaurants/filter/${currentPage}`,{
            method:'POST',
            headers:{'Content-type': 'application/json'},
            body:JSON.stringify(filter)
        })
        .then(response=> response.json() )
        .then(data=>{setRestaurant(data.data) ; setPageCount(data.totalRecords/2)})

    },[filter,currentPage])
    // console.log(restaurant.length) 

    useEffect(()=>{
        fetch(`https://sagar-zomato-clone-app.onrender.com/zomato/locations`,{
            method: 'GET',
            headers:{'Content-type':'application/json' },
            // body :JSON.stringify(location) 
        })
        .then(response => response.json())
        .then(data=>{setLocation(data.data); setCurrentPage(1)})
    },[])

    const displayLocation = (e)=>{
        if(e === 1)
            setLocationName( `in Delhi`)
        else if (e === 2)
            setLocationName( `in Pune`)
        else if (e === 3)
            setLocationName( `in Banglore`)
        else if (e === 4)
            setLocationName( `in Chennai`)
        else if (e === 5)
            setLocationName( `in Mumbai`)
        else
            setLocationName('')

    }

    const locationList =
        location.length >0 && location.map(item=><option key={item.name} value={item.city_id} >{item.name}</option>) 
    
    const handleLocation =(id)=>{
        filter.city_id = id; 
        setFilter({...filter})
    }

    const handleCuisine = (e)=>{
        if(e.target.checked)
            filter.cuisine.push(e.target.name)
        else{
            let index = filter.cuisine.indexOf(e.target.name)
            if(index > -1)
                filter.cuisine.splice(index,1)
        }
        setFilter({...filter})
    }   

    const handleCost = (lcost, hcost)=>{
        filter.lcost = lcost;
        filter.hcost = hcost;
        setFilter({...filter})
    }

    const handleSort=(price)=>{
        filter.sort = price 
        setFilter({...filter})
    }

    const paginationItem = [];
    for(let i=1; i<=pageCount;i++)
        paginationItem[i] = <a href="#" key={i} onClick={()=>setCurrentPage(i)}>{i}</a>

  return (
    <div>
        <div className="header">
            <Header/>
        </div>

        <div className="main">
            
            <div className="heading"> {mealType} Places {locationName} </div>
            
             {/* Filter Block  */}
            <div className="filter-block" style={{display: 'inline-block'}}>
                <h2 style={{marginTop: '2vh', marginBottom: '1vh'}}>Filters</h2>
                <h5 style={{marginTop:'1.5vh' , marginBottom: '1.2vh'}}>Select Location</h5>
                {/* location selector  */}
                <select name="Location" id="location" onChange={(e)=>{handleLocation(e.target.value);setCurrentPage(1);displayLocation(e.target.value)}}>
                    <option value=""  >All Locations  </option>
                    {locationList}
                </select>

            
                <h5 style={{ marginBottom: '1.7vh'}}>Cuisine</h5>
                <label htmlFor="cuisine" >
                    <input type="checkbox" name="North Indian" onChange={(e)=>{handleCuisine(e);setCurrentPage(1)}}/> North Indian <br/>
                    <input type="checkbox" name="South Indian" onChange={(e)=>{handleCuisine(e);setCurrentPage(1)}}/> South Indian <br/>
                    <input type="checkbox" name="Chinese" onChange={(e)=>{handleCuisine(e);setCurrentPage(1)}}/> Chinese <br/>
                    <input type="checkbox" name="Fast Food" onChange={(e)=>{handleCuisine(e);setCurrentPage(1)}}/> Fast Food <br/>
                    <input type="checkbox" name="Street Food" onChange={(e)=>{handleCuisine(e);setCurrentPage(1)}}/> Street Food <br/>
                </label>

             {/* cost  */}
            <h5 style={{marginBottom: '1.7vh', marginTop: '3.3vh'}}>Cost For Two</h5>
            <label htmlFor="Cost For Two">
                <input type="radio" name="cost" onChange={()=>handleCost(0,500)}/> less than ` 500 <br/>
                <input type="radio" name="cost" onChange={()=>handleCost(500,1000)}/> `500 to `1000 <br/>
                <input type="radio" name="cost" onChange={()=>handleCost(1000,1500)}/> `1000 to `1500 <br/>
                <input type="radio" name="cost" onChange={()=>handleCost(1500,2000)}/> `1500 to `2000 <br/>
                <input type="radio" name="cost" onChange={()=>handleCost(2000,10000)}/> `2000+ <br/>
            </label>

             {/* sort  */}
            <h3 style={{marginBottom: '2vh',marginTop:'3.5vh'}}>Sort</h3>
            <label htmlFor="sort">
                <input type="radio" name="sort" checked={filter.sort==1} onChange={()=> {handleSort(1);setCurrentPage(1)}} /> price low to high <br/>
                <input type="radio" name="sort" checked={filter.sort==-1} onChange={()=> {handleSort(-1);setCurrentPage(1)}} /> price high to low 
            </label>
            </div>
           

            <div style={{display: 'inline-block', verticalAlign: 'top'}}>
                {

                    restaurant.length >0 ? restaurant.map((item,index) =>
                        <div className="item" key={index}>
                            <div style={{display: 'inline-block'}}>
                                <img className="image1" src={item.thumb}/>
                            </div>
                            <div style={{display: 'inline-block', verticalAlign: 'top'}}>
                                <div className="t1" >{item.name}</div>
                                <div className="t2"><b>{item.locality}</b></div>
                                <div className="t3">{item.address}</div>
                                
                            </div>
                            <hr />
                            <div>
                                <table>
                                <tbody>
                                        <tr  style={{textAlign: 'left'}}>
                                            <th >CUISINES</th>
                                            <td>{item.Cuisine.length && <ul style={{listStyle:'none',padding:'0'}}> {item.Cuisine.map(item=> <li key={item.name}>{item.name}</li>)}</ul>}</td>
                                        </tr>
                                        <tr>
                                            <th >COST FOR TWO</th>
                                            <td>&#8377;{item.cost}</td>
                                        </tr>
                                </tbody>
                                
                                </table>
                            </div>
                        </div>
                    ):<div className="noData"> No Data found</div>
                }
                
                

                <div id="page" style={{marginBottom:'5vh'}}>
                    <a href="#"> &laquo; </a>
                    {paginationItem}
                    <a href="#">&raquo;</a>
                </div>


            </div>
            </div>
        </div>
  )
}
