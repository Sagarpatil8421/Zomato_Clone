import React from 'react'
import { Link } from 'react-router-dom'

export default function Mealtypes(props) {
//   console.log(props.items)
  return (

    <Link className="col-sm-12 col-md-12 col-lg-4 " to={`/filter/${props.items.name}`}>
            <div className="tileContainer">
                <div className="tileComponent1">
                    <img src={require(`../../`+props.items.image)} height="160" width="140" />
                </div>

                <div className="tileComponent2">
                    <div className="card-title">
                        {props.items.name}
                    </div>
                    <div className="card-description">
                    {props.items.content}
                    </div>
                </div>
            </div>
      </Link>
  )
}



