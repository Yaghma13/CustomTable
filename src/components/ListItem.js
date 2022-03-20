import React from 'react';
import './ListItem.css';
import { FormCheck, ListGroupItem } from "react-bootstrap";
import { XSquareFill } from "react-bootstrap-icons";

export default function ListItem({ item, checkList, removeField, innerRef, ...rest }) {
    const handleChange = (e) => {
        // e.stopPropagation();
        checkList(item.id)
    }

    const handleClick = (e) => {
        // e.stopPropagation();
        removeField(item.id)
    }

    return (
        <ListGroupItem variant="secondary" ref={innerRef} {...rest}>
            <FormCheck>
                <div className="listItem">
                    <FormCheck.Input type={"checkbox"} checked={item.checked} onChange={handleChange}></FormCheck.Input>
                    <FormCheck.Label>{item.text} </FormCheck.Label>
                    <XSquareFill className="deleteField" color="red" onClick={handleClick} />
                </div>
            </FormCheck>
        </ListGroupItem>
    )
}
