import React from 'react';
import { XSquareFill } from "react-bootstrap-icons";

export default function TableBody({ heads, body, setTableData }) {
    const handleChange = (label, id, e) => {
        let newBody = [...body];
        newBody.map(row => {
            if (row.id === id) {
                row[label] = e.target.textContent;
            }
            return row;
        });
        setTableData(newBody)
    }

    const handleRemove = (id) => {
        let newBody = body.filter(item => item.id !== id)
        setTableData(newBody)
    }
    return (
        <tbody>
            {body.map(row =>
                <tr key={row.id}>
                    {heads.map(head => {
                        if (row[head.label] === undefined) row[head.label] = '';
                        return head.checked &&
                            <td
                                contentEditable
                                onKeyDown={e => e.key === 'Enter' && e.target.blur()}
                                onBlur={(e) => handleChange(head.label, row.id, e)}
                                suppressContentEditableWarning
                                style={{ height: '40px' }}
                                key={head.id}>
                                {row[head.label]}
                            </td>
                    })}
                    <td><XSquareFill className="delete" color="red" size={20} onClick={() => handleRemove(row.id)} /></td>
                </tr>
            )
            }
        </tbody>
    )
}
