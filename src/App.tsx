import {useState, useEffect} from 'react';
import './App.css';
import rock from './assets/images/rock.png';
import paper from './assets/images/paper.png';
import scissors from './assets/images/scissors.png';

function App() {
    const [playerChoice, setPlayerChoice] = useState('rock');
    const [pcChoice, setPcChoice] = useState('rock');
    const [userScore, setUserScore] = useState(0);
    const [pcScore, setPcScore] = useState(0);
    const [turnResult, setTurnResult] = useState(null);
    const [finalScore, setFinalScore] = useState("Let's see who wins!");
    const [gameOver, setGameOver] = useState(false);

    const choices = ['rock', 'paper', 'scissors'];

    return (
        <div className='App'>
            <h1>test</h1>
            {playerChoice === 'rock' ? (
                <img src={rock} alt='Player rock.' />
            ) : null}
            {playerChoice === 'paper' ? (
                <img src={paper} alt='Player paper.' />
            ) : null}
            {playerChoice === 'scissors' ? (
                <img src={scissors} alt='Player scissors.' />
            ) : null}

            {/* <h1 className='heading'>Rock Paper Scissors</h1>
            <div className='score'>
                <h1>User Points: {userScore}</h1>
                <h1>PC Points: {pcScore}</h1>
            </div>
            <div className='choices'>
                <div className='choiceUser'>
                    <img
                        // src={require(`./assets/images/${userChoice}.png`)}
                        // src={require(`./assets/images/${userChoice}.png`)}
                        src={require(`./assets/images/rock.png`)}
                        alt='React Logo'
                        // src={`./assets/images/rock.png`}
                        // src='./assets/images/rock.webp'
                        // src='./assets/images/rock.jpeg'
                        // alt={userChoice}
                        // className='userHand'
                    />
                </div>
                <div className='choiceComputer'>
                    <img src={`./assets/images/${pcChoice}.png`} alt='' />
                </div>
            </div> */}
        </div>
    );
}

export default App;
