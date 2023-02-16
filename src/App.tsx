import {Route, Routes} from 'react-router-dom';
import {Game} from './components/Game/Game';
import {Home} from './components/Home/Home';
import {useState} from 'react';

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/game' element={<Game />}></Route>
            </Routes>
        </>
    );
}
export default App;
