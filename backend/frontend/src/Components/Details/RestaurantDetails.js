import React, { useState , useEffect} from 'react'
import Header from '../Common/Header'
import { useParams} from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../../Styles/RestaurantDetails.css';
import Modal from 'react-modal';


export default function RestaurantDetails() {
  //Hooks
  const [restaurant, setRestaurant] =useState({})

  const [isMenuModalOpen,setIsMenuModal] = useState(false)

  const [menu, setMenu] = useState([])

  const [totalPrice, setTotalPrice] = useState(0)
 
  let {rName} = useParams()
  //lifeCycle Hooks 
  useEffect( ()=>{
    fetch(`https://sagar-zomato-clone.herokuapp.com/zomato/restaurants/details/${rName}`,{method:'GET'})
    .then(response => response.json())
    .then(data => setRestaurant(data.data[0]))
  }, [] );

  const fetchMenu= ()=>{
    fetch(`https://sagar-zomato-clone.herokuapp.com/zomato/${rName}`,{method:'GET'})
    .then(response=>response.json())
    .then(data =>setMenu(data.data))
  }

  const calculateTotalPrice= (item)=>{
    let price = totalPrice + item.itemPrice;
    setTotalPrice(price)
  }

  // Razorpay Script 
  const loadScript = (rpScript)=>{
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = rpScript;
      script.onload = ()=>{
        openRazorPay();
        resolve(true)
      }

      script.onerror= ()=>{
        resolve(false)
      }

      document.body.appendChild(script)
    })

  }

  // open Razorpay method
  const openRazorPay= async()=> {
    try{

      // API generate order in backend
      let orderData;
      orderData = await fetch('https://sagar-zomato-clone.herokuapp.com/payment', {
            method:'POST',
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify({amount : totalPrice})
      }).then(res => res.json())  

      console.log(orderData)

      const options={
        key:"rzp_test_uhOWpcxjK2EFQr",
        amount: orderData.amount,
        order_id: orderData.id,
        currency: orderData.currency,
        name: 'Zomato Food Delivery App',

        prefill:{
          email :'sagarpatil@developer.com',
          contact: '202-555-0183'
        },

        handler:function(response){
          console.log(response)
          fetch('https://sagar-zomato-clone.herokuapp.com/payment/save', {
            method:'POST',
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify({
              razorpay_orderid : response.razorpay_order_id,
              razorpay_paymentid : response.razorpay_payment_id,
              razorpay_signature : response.razorpay_signature,
              razorpay_amount : orderData.amount
            })
          }).then(res => console.log(res))
        }
      }
      
      const paymentWindow = new window.Razorpay(options);
      paymentWindow.open()

    }catch(error){
      console.log(error)
    }
  }

  const{name, thumb, cost, address, Cuisine} = restaurant
  const cuisineList =! (Cuisine==undefined) && Cuisine.length && <ul>{Cuisine.map(item=> <li key={item.name}>{item.name}</li>)}</ul>
  
  return (
    <div>
        <Header/> 
        <div className='image' >
            <img src={thumb} height='400px' width='100%' />
        </div>

        <div className='Rname'>
            <h1>{name}
              <button className='btn btn-danger' style={{float:'right'}} onClick={()=>{fetchMenu();setIsMenuModal(true)}}>Place online order</button>
            </h1>
        </div>

        <div className='tabs'>
          <Tabs>
            
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Contact</Tab>
            </TabList>
            

            <TabPanel>
              <div className='about'>About the place</div>
              <div className='head'>Cuisine</div>
              {cuisineList}
              <div className='head'>Average cost</div>
              <div className='value'>&#8377; {cost}</div>
            </TabPanel>
            
            <TabPanel>
              <div className="head">Phone Number</div>
              <div>+91-12345678</div>
              <div className="head">{name}</div>
              <div className="value">{address}</div>
            </TabPanel>
          </Tabs>
          </div>

          <div>
            <Modal
              isOpen={isMenuModalOpen}
            >
              <div>
                <h1>Menu
                <button className='btn btn-danger' onClick={()=>setIsMenuModal(false)} style={{float:'right'}} >X</button>
                </h1>
              </div>

              <div>
                <ul>
                    {
                      menu.length &&
                        menu.map((item,index) => <li key={index}>
                          {/* <div>
                            <img src={item.thumb} height='100px' width='80px' />
                          </div> */}
                          <div>
                              {item.isVeg ? <span className='text-success'>{item.itemName}</span> : <span className='text-danger'>{item.itemName}</span>}
                          </div>
                          <div>
                              {item.itemDescription}
                          </div>
                          <div>
                              {item.itemPrice}
                          </div>
                          <div>
                              <button className='btn btn-success' onClick={()=>calculateTotalPrice(item)}>Add</button> <br /><br />
                          </div>
                        </li> )
                    }
                </ul>

                <hr />
                <h3>
                    Total Price : {totalPrice}
                    {/* two steps to get executed : 1.  to attach a js to the current web page  2. call a method from that attached js to see payment window*/}
                    <button className='btn btn-danger' style={{float:'right'}} onClick={()=>{setIsMenuModal(false);loadScript('https://checkout.razorpay.com/v1/checkout.js')}} >Pay Now</button>
                
                </h3>
              </div>

            </Modal>
          </div>
    </div>
  )
}
