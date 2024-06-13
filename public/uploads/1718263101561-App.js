import logo from './logo.svg';
import './App.css';
import Snippet from './snippet/Snippet';
import Codemirror from './codemirror/Codemirror';
import Monaco from './monaco-editor/Monaco';
import Monaco2 from './monaco-editor/Monaco2';
import { CodeEditor } from './monaco-editor/React_monaco';
import ReactMonaco from './reactmonaco/ReactMonaco';
// Sample data representing folders and files

function App() {
  return (
    <div className="App">

      {/* <Snippet /> */}
      {/* <Codemirror /> */}
      {/* <Monaco /> */}
      {/* <Monaco2 /> */}
      {/* <h1>CodeEditor</h1> */}
      {/* <CodeEditor /> */}
      <ReactMonaco/>
    </div>
  );
}

export default App;
