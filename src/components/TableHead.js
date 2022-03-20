import React from 'react';

export default function TableHead({ heads }) {
    return (
        <thead>
            <tr>
                {heads.map(head => head.checked && <th key={head.id}>{head.text}</th>)}
                <th style={{ width: "0" }}></th>
            </tr>
        </thead>
    )
}
