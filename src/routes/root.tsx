export default function Root() {
    return (
      <>
        <div id="sidebar">
          <h1>Easy Task Main UI</h1>
          <nav>
            <ul>
              <li>
                <a href={`/running_work_flow`}>running_work_flow</a>
              </li>
              <li>
                <a href={`/list_work_flow`}>list_work_flow</a>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail"></div>
      </>
    );
  }