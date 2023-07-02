import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <App />
  </Router>
);
