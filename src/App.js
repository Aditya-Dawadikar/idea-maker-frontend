import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Landing from './screens/Landing'
import ProjectExplorer from './screens/ProjectExplorer'
import Workspace from './screens/Workspace'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/home" element={<ProjectExplorer />}></Route>
          <Route path="/workspace" element={<Workspace />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
