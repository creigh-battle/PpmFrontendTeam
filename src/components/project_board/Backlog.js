import React, { useState } from "react";
import ProjectTask from "./project_tasks/ProjectTask";
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import { useDrop } from "react-dnd";

export default function Backlog(props) {
  const { project_tasks } = props;
  const tasks = project_tasks.map((el) => (
    <ProjectTask key={el.id} project_task={el} />
  ));

  let todoItems = [];
  let inProgressItems = [];
  let doneItems = [];

  tasks.forEach((el) => {
    if (el.props.project_task.status == "TO_DO") {
      todoItems.push(el);
    } else if (el.props.project_task.status == "IN_PROGRESS") {
      inProgressItems.push(el);
    } else {
      doneItems.push(el);
    }
  });

  //const [board, setBoard] = useState([]);

  const [{isOver}, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addTaskToList(item.taskId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const addTaskToList = (taskId) => {
console.log(taskId);
  }

  return (
<DndProvider backend={HTML5Backend}>
    <div className="container">
      <div className="row">
        <div className="col-md-4" ref={drop} >
          <div className="card text-center mb-2">
            <div className="card-header bg-secondary text-white">
              <h3>TO DO</h3>
            </div>
          </div>
          {todoItems}
        </div>
        <div className="col-md-4">
          <div className="card text-center mb-2">
            <div className="card-header bg-primary text-white">
              <h3>In Progress</h3>
            </div>
          </div>
          {inProgressItems}
        </div>
        <div className="col-md-4">
          <div className="card text-center mb-2">
            <div className="card-header bg-success text-white">
              <h3>Done</h3>
            </div>
          </div>
          {doneItems}
        </div>
      </div>
    </div>
    </DndProvider>
  );
}
