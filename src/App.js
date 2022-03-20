import React, { useState, useMemo, useEffect } from "react";
import './App.css';
import AddField from "./components/AddField";
import List from "./components/List";
import CustomTable from "./components/CustomTable";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, FormControl, InputGroup, Row } from "react-bootstrap";

let data = [
  { id: 1, firstName: 'Reza', lastName: 'Hassani', address: 'Tehran', age: 24, education: '' },
  { id: 2, firstName: 'Bahar', lastName: 'Rezayee', address: 'Rasht', age: 21, education: '' },
]


let initialList = [
  { id: 1, text: 'First Name', checked: true, label: 'firstName' },
  { id: 2, text: 'Last Name', checked: true, label: 'lastName' },
  { id: 3, text: 'Address', checked: false, label: 'address' },
  { id: 4, text: 'Age', checked: false, label: 'age' },
  { id: 5, text: 'Education', checked: false, label: 'education' }
]

function App() {
  let localStorageList = JSON.parse(localStorage.getItem("ListItems"));
  let localStorageTableData = JSON.parse(localStorage.getItem("tableData"));

  const [ListItems, setListItems] = useState(localStorageList || initialList);
  const [tableData, setTableData] = useState(localStorageTableData || data);
  const [keyWord, setKeyWord] = useState('');

  let searchResult = useMemo(() => ListItems.filter(item => item.text.toLowerCase().includes(keyWord.toLowerCase())), [keyWord, ListItems])

  const handleChange = (e) => {
    setKeyWord(e.target.value);
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    if (ListItems[result.source.index].checked !== ListItems[result.destination.index].checked) return;

    const items = Array.from(ListItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setListItems(items);
  }

  const handleCheckList = (id) => {
    let result = ListItems.map(listItem => {
      if (listItem.id === id) {
        return {
          ...listItem,
          checked: !listItem.checked
        }
      }
      return listItem;
    });

    setListItems(result)
  }

  const addField = (newItem) => {
    setListItems([...ListItems, newItem]);
  }
  const removeField = (id) => {
    let newList = ListItems.filter(field => field.id !== id)
    setListItems(newList)
  }

  useEffect(() => {
    localStorage.setItem("ListItems", JSON.stringify(ListItems));
  }, [ListItems])

  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(tableData));
  }, [tableData])

  return (
    <Container style={{ margin: '30px auto' }}>
      <Row>
        <Col md={9}>
          <CustomTable heads={ListItems} body={tableData} setTableData={setTableData} />
        </Col>
        <Col md={{ span: 2, offset: 1 }}>
          <AddField list={ListItems} addField={addField} />
          <InputGroup size="sm" className="mb-3">
            <FormControl type="text" placeholder="Search" value={keyWord} onChange={handleChange} />
          </InputGroup>
          <List list={searchResult} checkList={handleCheckList} handleOnDragEnd={handleOnDragEnd} removeField={removeField} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
