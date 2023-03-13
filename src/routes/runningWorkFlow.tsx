import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import {
  materialRenderers,
  materialCells
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import axios from 'axios'
import { useSearchParams } from 'react-router-dom';

// const schema = require('./form/request-form/schema.json')
// const uischema = require('./form/request-form/uischema.json')
// const initialData = {};
function App() {

  const getWorkFlowData = async (work_flow_id: string | null) => {
    const response = await axios.get(`http://localhost:3001/api/v3/work_flow/${work_flow_id}`)
    console.log(response.data)
    // setSchema(response.data.task[0].form_schema_validation)
    // setUiSchema(response.data.task[0].form_ui_schema)
    setWorkFlow(response.data)
  }


  const submitFormTask = async (taskId: string) => {
    const response = await axios.post(`http://localhost:3001/api/v3/task_action/submit?logged_user_id=${loggedUserId}&&work_flow_id=${workFlowId}&&task_id=${taskId}`, {
      form: data
    }, { headers: { 'Content-Type': 'multipart/form-data' } })

    if (response.data.isSuccess!=false) {
      setTimeout(() => {
        // getWorkFlowData(workFlowId)
        window.location.reload();
      }, 1000);
    } else {
      window.alert(response.data.message);
      window.location.reload();
    }


  }

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const work_flow_id = searchParams.get("work_flow_id")
    console.log("searchParams " + work_flow_id)
    getWorkFlowData(work_flow_id)
    if (work_flow_id) {
      setWorkFlowId(work_flow_id)
    }
  }, []);

  const [workFlowId, setWorkFlowId] = useState("")
  const [loggedUserId, setLoggedUserId] = useState("");
  const [data, setData] = useState();
  const [schema, setSchema] = useState({});
  const [uiSchema, setUiSchema] = useState({
    "type": "Label",
    "text": "loading"
  });


  const [workFlow, setWorkFlow] = useState<any>({})
  return (
    <div >
      <table border={0}>
        <thead>
          <tr style={{ backgroundColor: 'lightblue' }}>
            <td style={{ width: '300px' }}>Task</td>
            <td>Detail Task</td>
          </tr>
        </thead>
        <tbody>

          {workFlow.task ? workFlow.task.map((item: any, index: any) => (
            <tr key={index} style={{ borderBottom: 1, borderBottomColor: 'red' }}>
              <td style={{
                backgroundColor: item.status != 'SHOW' ? 'lightgray' : 'white',
                verticalAlign: 'top',
                borderBottom: 2,
                borderBottomColor: 'red',
                borderBottomStyle: 'solid'
              }}>
                <span style={{ backgroundColor: 'lightgreen' }}>{item.name}</span>
              </td>
              <td style={{
                backgroundColor: item.status != 'SHOW' ? 'lightgray' : 'white',
                borderBottom: 2,
                borderBottomColor: 'red',
                borderBottomStyle: 'solid',
                paddingBottom: 20,
                paddingTop: 20
              }}>
                <JsonForms
                  schema={item.form_schema_validation}
                  uischema={item.form_ui_schema}
                  data={item.form_data}
                  renderers={materialRenderers}
                  cells={materialCells}
                  onChange={({ data, errors }) => setData(data)}
                  readonly={item.status != 'SHOW'}
                />
                <label>assignee_user_id :  {item.assignee_user_id}</label><br />
                <label>assignee_team_id :  {item.assignee_team_id}</label><br />
                <label>last action_by_user_id : {item.action_by_user_id}</label><br />
                <label>status :  {item.status}</label><br />
                <label style={{ backgroundColor: 'lightpink' }}>Notes :  {item.notes}</label><br />

                <br /><br />
                <span></span>
                <label>Logged User Id</label><br />
                <input type="text" value={loggedUserId} onChange={(e) => {
                  setLoggedUserId(e.target.value);
                }} />
                <button onClick={() => {
                  workFlow.task = null
                  submitFormTask(item.id)
                  console.log("data submit ")
                  console.log(data)

                }} >Submit</button>
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
