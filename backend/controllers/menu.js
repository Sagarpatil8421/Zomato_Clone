const Menu = require('../models/menu')

exports.getAllMenu = (req,res) =>{
    let filter = {restaurantName:req.params.rName}
    Menu.find(filter)
    .then(
        result=>
            res.status(200).json({
                message: "Menu fetch succesfully",
                data: result
            })
    ).catch(error=>
        res.status(500).json({
            message: "Error in Data Base",
            error:error
        }))
}