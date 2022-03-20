import React from "react";
import './CustomTable.css';
import { Container, Table } from "react-bootstrap";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { v4 as uuid } from 'uuid';
import { PlusSquareFill } from 'react-bootstrap-icons';

export default function CustomTable({ heads, body, setTableData }) {
    const addNewRow = () => {
        let cells = heads.map(head => (head.label));
        cells.unshift('id')
        const newRow = cells.reduce((row, curr) => { row[curr] = ''; return row }, {});
        newRow.id = uuid();
        setTableData([...body, newRow])
    }
    return (
        <>
            <Container >
                <Table striped bordered hover style={{ marginBottom: '0' }}>
                    <TableHead heads={heads} />
                    <TableBody heads={heads} body={body} setTableData={setTableData} />
                </Table>

            </Container>
            <div className="plusIcon">
                <PlusSquareFill color="green" onClick={addNewRow} className="addRow" />
            </div>
        </>
    )
}