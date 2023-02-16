import {Route, Routes} from 'react-router-dom';
import {Game} from './components/Game/Game';
import {Home} from './components/Home/Home';
import {useState} from 'react';

function App() {
    const [langCh, setLangCh] = useState('en');

    return (
        <>
            <Routes>
                <Route
                    path='/'
                    element={<Home langCh={langCh} setLangCh={setLangCh} />}
                ></Route>
                <Route
                    path='/game'
                    element={<Game langCh={langCh} setLangCh={setLangCh} />}
                ></Route>
            </Routes>
        </>
    );
}
export default App;
