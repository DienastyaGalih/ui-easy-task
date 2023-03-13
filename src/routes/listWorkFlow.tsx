import React, { useEffect, useState } from 'react';
import {
  materialRenderers,
  materialCells
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import axios from 'axios'

function App() {

  const runWorkFlow = async () => {
    // hard code run workflow
    const response = await axios.post(`http://localhost:3001/api/v3/run_work_flow/1?logged_user_id=${loggedUserId}`)
  }


  const getWorkFlowData = async () => {
    const response = await axios.get('http://localhost:3001/api/v3/work_flow/')
    console.log(response.data)
    setWorkFlow(response.data)
  }

  useEffect(() => {
    setTimeout(() => {
      getWorkFlowData()
    }, 100);
  }, []);
  const [loggedUserId, setLoggedUserId] = useState("");
  const [schema, setSchema] = useState({});
  const [uiSchema, setUiSchema] = useState({
    "type": "Label",
    "text": "loading"
  });


  const [workFlow, setWorkFlow] = useState<any>({})
  return (
    <div >
      <div style={{ marginTop: 50 }}>
        <label>logged user id</label> <br />
        <input type="text" value={loggedUserId} onChange={(e) => {
          setLoggedUserId(e.target.value);
        }} />
        <button style={{ marginLeft: 10 }} onClick={() => {
          runWorkFlow()
          window.alert("Workflow Cash Advance run go to work flow list")
        }}>
          Run Work Flow
        </button>
        <select name="cars" id="cars" style={{ marginLeft: 10 }}>
          <option value="volvo">Cash Advance Request</option>
        </select>
      </div>
      <br />
      <h3>List Running workflows</h3>
      <table border={0}>
        <thead>
          <tr style={{ backgroundColor: 'lightblue' }}>
            <td style={{ width: '300px' }}>Workflow Name</td>
            <td>Stage</td>
            <td>Assign To User Id</td>
            <td>Assign To Team Id</td>
            <td>Detail</td>
          </tr>
        </thead>
        <tbody>

          {workFlow.length > 0 ? workFlow.map((item: any, index: any) => (
            <tr key={index} style={{ borderBottom: 1, borderBottomColor: 'red' }}>
              <td style={{
                backgroundColor: 'white',
                verticalAlign: 'top',
                borderBottom: 2,
                borderBottomColor: 'red',
                borderBottomStyle: 'solid'
              }}>
                <span style={{ backgroundColor: 'lightgreen' }}>{item.workflow_name}</span>
              </td>
              <td style={{
                backgroundColor: item.status != 'show' ? 'lightgray' : 'white',
                borderBottom: 2,
                borderBottomColor: 'red',
                borderBottomStyle: 'solid',
                paddingBottom: 20,
                paddingTop: 20
              }}>
                {item.last_task_name}
              </td>
              <td>{item.assignee_user_id}</td>
              <td>{item.assignee_team_id}</td>
              <td>
                <a href={"/running_work_flow?work_flow_id=" + item.workflow_id}>Detail</a>
              </td>
            </tr>
          )) : null}
        </tbody>
      </table>
      <div>
      </div>
    </div>
  );
}
export default App;
