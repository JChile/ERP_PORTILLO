import React from 'react'
import "./rolItem.css"
import EditIcon from "../../../../assets/edit-icon.svg"

const RolItem = (props) => {

    const { name } = props

    return (
        <div className='rol_item'>
            <h3>{name}</h3>
            <img src={EditIcon} alt="edit" />
        </div>
    )
}

export default RolItem