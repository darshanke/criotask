import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TaskTable from './components/TaskTable';
import { useState } from 'react';
import BasicModal from './components/ModalWindow';


const theme = createTheme({
  palette: {
    primary: {
      main: '#007FFF',
      dark: '#0066CC',
      text: '#FFFFFF', 
      edit: '#7399', 
      delete: '#8B0000', 
      success: '#228B22', 
      warning: '#ED6C02'
    },
    success: {
      main: "#228B22", 
    },
    warning: {
      main: "#ED6C02", 
    },
  },
});

function App() {
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <TaskTable />
        <Footer  setOpen={setOpen}/>
        <BasicModal open={open} setOpen={setOpen}/>
      </div>
    </ThemeProvider>
  );
}

export default App;
