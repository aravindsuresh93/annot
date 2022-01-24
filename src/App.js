import './App.css'
import Sidebar from './Components/Sidebar'
import { ReactComponent as AnnotIcon } from './annot-icon.svg';
import ShowCordinates from './Components/ShowCordinates';
import Canvaser from './Components/Canvaser';
import DrawBox from './Components/DrawBox';


function App() {
    return (
        <div className='App'> 
            <Sidebar/>
            <div className="heading">
                <h3 className="headingText">annot</h3>
                <AnnotIcon/>
                
            </div>
            <ShowCordinates/>
            <DrawBox/>
        </div>
        
    )
}

export default App
