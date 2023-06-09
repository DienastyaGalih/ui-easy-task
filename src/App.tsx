import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
// import './App.css';
import {
  materialRenderers,
  materialCells
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import axios from 'axios'
import Task from './Task'

// const schema = require('./form/request-form/schema.json')
// const uischema = require('./form/request-form/uischema.json')
// const initialData = {};
function App() {

  const getWorkFlowData = async () => {
    const response = await axios.get('http://localhost:3001/api/v3/work_flow/1')
    console.log(response.data)
    // setSchema(response.data.task[0].form_schema_validation)
    // setUiSchema(response.data.task[0].form_ui_schema)
    setWorkFlow(response.data)
  }

  useEffect(() => {
    getWorkFlowData()
  }, []);

  // const [data, setData] = useState(initialData);
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
                backgroundColor: item.status != 'show' ? 'lightgray' : 'white',
                verticalAlign: 'top',
                borderBottom: 2,
                borderBottomColor: 'red',
                borderBottomStyle: 'solid'
              }}>
                <span style={{ backgroundColor: 'lightgreen' }}>{item.name}</span>
              </td>
              <td style={{
                backgroundColor: item.status != 'show' ? 'lightgray' : 'white',
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
                  readonly={item.status != 'show'}
                />
                <button onClick={() => {
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
