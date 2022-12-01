const Restaurants= require('../models/restaurant')


exports.getAllRestaurants=(req,res)=>{
   Restaurants.find().then(
       result=>{
           res.status(200).json({ message:"data fetched successfully" , data:result })
       }
   ).catch(error=>{
           res.status(500).json({ message:"Error in database" , error:error })
   })

}


exports.getAllRestaurantsByCityID=(req,res)=>{
    const filter={city:req.params.cID}


    Restaurants.find(filter)
    .then(
        result=>{
            res.status(200).json(
                { 
                    message:"data fetched successfully" , 
                    data:result 
            })
        }
    ).catch(error=>{
            res.status(500).json({ message:"Error in database" , error:error })
    })
 
 }

 exports.getAllRestaurantsByCityName=(req,res)=>{
    const filter={name:req.params.rName}


    Restaurants.find(filter)
    .then(
        result=>{
            res.status(200).json(
                { 
                    message:"data fetched successfully" , 
                    data:result 
            })
        }
    ).catch(error=>{
            res.status(500).json({ message:"Error in database" , error:error })
    })
 
 }


 exports.getAllRestaurantDetails=(req,res)=>{
    const filter={name:req.params.name}


    Restaurants.findOne(filter).then(
        result=>{
            res.status(200).json({ message:"data fetched successfully" , data:result })
        }
    ).catch(error=>{
            res.status(500).json({ message:"Error in database" , error:error })
    })
 
 }


 exports.getAllRestaurantsByFilter=(req,res)=>{
    const filter={}

     if(req.body.city_id){
         filter.city= req.body.city_id
     }

     if(req.body.type){
        filter['type.name'] =  req.body.type    //type.props.items.name
     }

     if(req.body.cuisine && req.body.cuisine.length >0 ){
        filter['Cuisine.name']={ $in : req.body.cuisine }
     }
     
     if(req.body.lcost && req.body.hcost){
         if(req.body.lcost==0){
             filter.cost ={
                 $lte :req.body.hcost
             }
         } 
         else{
            filter.cost= {
                $lt: req.body.hcost,
                $gt: req.body.lcost
            } 
         }
     }

     let sort=1;
     if(req.body.sort){
         sort = req.body.sort
     }
    //  console.log(sort)
    //logic of pagination achieved through limit and skip 
    Restaurants.find(filter).limit(2).skip(2*(req.params.pageNo-1)).sort({"cost":sort})
        .then(
            result=>{
                Restaurants.find(filter).count((err,count)=>{
                    if(err)
                        console.log(err)
                    else
                        res.status(200).json({ 
                            message:"data fetched successfully" , 
                            data : result ,
                            totalRecords:count
                        })
                    
                })
                
            }
        ).catch(error=>{
            res.status(500).json({ 
                message:"Error in database" , 
                error:error })
        })
 
 }
