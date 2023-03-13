import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  materialRenderers,
  materialCells
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';

function App(props: { form_schema_validation: any, form_ui_schema: any, form_data: any }) {

  useEffect(() => {
    setData(props.form_data)
    setSchema(props.form_schema_validation)
    setUiSchema(props.form_ui_schema)
  });

  // const [data, setData] = useState(initialData);
  const [data, setData] = useState();
  const [schema, setSchema] = useState({});
  const [uiSchema, setUiSchema] = useState({

    "type": "Label",
    "text": "loading"

  });
  return (
    <div >
      <table>
        <thead>
          <tr>
            <td style={{ width: '300px' }}>Task</td>
            <td>Detail Task</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: '100px' }}></td>
            <td>
              <JsonForms
                schema={schema}
                uischema={uiSchema}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data, errors }) => setData(data)}
              />
              <button onClick={() => {
                console.log("data submit ")
                console.log(data)
              }} >Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
      </div>
    </div>
  );
}
export default App;
