import React from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ListGroup } from "react-bootstrap";
import ListItem from "./ListItem";

export default function List({ list, checkList, removeField, handleOnDragEnd }) {
    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="fieldList">
                {provided => (
                    <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                        {list.map((listItem, index) => listItem.checked &&
                            <Draggable key={listItem.id} draggableId={listItem.id.toString()} index={index}>
                                {provided => (
                                    <ListItem
                                        item={listItem}
                                        checkList={checkList}
                                        removeField={removeField}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        innerRef={provided.innerRef}
                                    />
                                )}
                            </Draggable>)}

                        {list.map((listItem, index) => !listItem.checked &&
                            <Draggable key={listItem.id} draggableId={listItem.id.toString()} index={index}>
                                {provided => (
                                    <ListItem
                                        item={listItem}
                                        checkList={checkList}
                                        removeField={removeField}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        innerRef={provided.innerRef}
                                    />
                                )}
                            </Draggable>)}

                        {provided.placeholder}
                    </ListGroup>
                )}
            </Droppable>
        </DragDropContext>
    )
}
