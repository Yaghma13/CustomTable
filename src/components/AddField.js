import React, { useState } from 'react';
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { v4 as uuid } from 'uuid';

export default function AddField({ list, addField }) {
    const [input, setInput] = useState('');
    const handleChange = (e) => {
        setInput(e.target.value);
    }
    const handleClick = (e) => {
        e.preventDefault();
        let text = '';
        for (let word of input.toLowerCase().split(' ')) {
            text = text.concat(' ', word.charAt(0).toUpperCase() + word.substring(1))
        }
        let newItem = input.trim() && {
            id: uuid(),
            text: text,
            checked: false,
            label: input.replaceAll(' ', '')
        };
        newItem && addField(newItem)
        setInput('');
    }
    return (
        <Form onSubmit={handleClick}>
            <InputGroup size="sm" className="mb-3">
                <FormControl placeholder="New Field" value={input} onChange={handleChange} />
                <Button type="submit" variant="success" size="lg">Add</Button>
            </InputGroup>
        </Form>
    )
}
