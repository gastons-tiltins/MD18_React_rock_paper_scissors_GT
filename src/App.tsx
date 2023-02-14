import {useState, useEffect, useRef} from 'react';
import './App.css';
import rock from './assets/images/rock.png';
import paper from './assets/images/paper.png';
import scissors from './assets/images/scissors.png';
import {setTimeout} from 'timers/promises';

function App() {
    // Player name
    const [playerName, setPlayerName] = useState('Gastons');

    // Global data
    const [gameNumber, setGameNumber] = useState(0);
    const [globalScore, setGlobalScore] = useState([
        {
            name: '',
            game: '',
            score: '',
        },
    ]);

    // Choices
    const choices = ['rock', 'paper', 'scissors'];

    // Save choice state
    const [playerChoice, setPlayerChoice] = useState('');
    const [pcChoice, setPcChoice] = useState('');

    // Score
    const [playerScore, setPlayerScore] = useState(0);
    const [pcScore, setPcScore] = useState(0);

    // Results
    const [turnResult, setTurnResult] = useState('');
    const [finalScore, setFinalScore] = useState('');
    const [gameOver, setGameOver] = useState(false);

    // Moves count
    const [moves, setMoves] = useState(0);

    const playerRock = () => {
        setPlayerChoice('rock');
        setPcChoice(choices[Math.floor(Math.random() * choices.length)]);
        setMoves(moves + 1);
    };
    const playerPaper = () => {
        setPlayerChoice('paper');
        setPcChoice(choices[Math.floor(Math.random() * choices.length)]);
        setMoves(moves + 1);
    };
    const playerScissors = () => {
        setPlayerChoice('scissors');
        setPcChoice(choices[Math.floor(Math.random() * choices.length)]);
        setMoves(moves + 1);
    };

    const handleReset = () => {
        window.location.reload();
    };

    useEffect(() => {
        if (playerScore <= 4 && pcScore <= 4) {
            if (
                (playerChoice == 'paper' && pcChoice == 'rock') ||
                (playerChoice == 'rock' && pcChoice == 'scissors') ||
                (playerChoice == 'scissors' && pcChoice == 'paper')
            ) {
                // playerScore.current += 1
                const updatedPlayerScore = playerScore + 1;
                setPlayerScore(updatedPlayerScore);
                setTurnResult(
                    `${playerName} takes +1 point with ${playerChoice} over ${pcChoice}!`,
                );
                if (updatedPlayerScore === 5) {
                    setGlobalScore([
                        ...globalScore,
                        {
                            game: `${gameNumber + 1}`,
                            name: playerName,
                            score: ` WON (${playerScore + 1} to ${pcScore})`,
                        },
                    ]);
                    setGameOver(true);
                    setGameNumber(gameNumber + 1);
                }
            }

            if (
                (pcChoice == 'paper' && playerChoice == 'rock') ||
                (pcChoice == 'rock' && playerChoice == 'scissors') ||
                (pcChoice == 'scissors' && playerChoice == 'paper')
            ) {
                // pcScore.current += 1
                const updatePcScore = pcScore + 1;
                setPcScore(updatePcScore);
                setTurnResult(
                    `PC takes +1 point with ${pcChoice} over ${playerChoice}!`,
                );
                if (updatePcScore === 5) {
                    setFinalScore(`PC wins (${pcScore + 1} vs ${playerScore})`);
                    setGlobalScore([
                        ...globalScore,
                        {
                            game: `${gameNumber + 1}`,
                            name: playerName,
                            score: ` LOST (${playerScore} to ${pcScore + 1})`,
                        },
                    ]);
                    setGameOver(true);
                    setGameNumber(gameNumber + 1);
                }
            }

            if (
                (pcChoice == 'paper' && playerChoice == 'paper') ||
                (pcChoice == 'scissors' && playerChoice == 'scissors') ||
                (pcChoice == 'rock' && playerChoice == 'rock')
            ) {
                setTurnResult('Draw, no one gets a point!');
            }
        }
    }, [moves, pcChoice, playerChoice]);

    return (
        <div className='App'>
            <h1 className='heading'>Rock Paper Scissors (best of 5)</h1>
            {/* {moves > 0 && <h1>Move No: {moves}</h1>} */}
            {/* {gameOver != true && ( */}
            <>
                <div className='turnResult'>
                    {turnResult && (
                        <h1>
                            Turn {moves} result: {turnResult}
                        </h1>
                    )}
                </div>
                <div className='turnScores'>
                    <h1>Player: {playerScore}</h1>
                    <h1>PC: {pcScore}</h1>
                </div>
                <div className='finalResult'>
                    {finalScore && <h1>Game results: {finalScore}</h1>}
                </div>
                <div className='choices'>
                    <div className='playerChoice'>
                        {playerChoice === 'rock' && (
                            <img src={rock} alt='Player rock.' />
                        )}
                        {playerChoice === 'paper' && (
                            <img src={paper} alt='Player paper.' />
                        )}
                        {playerChoice === 'scissors' && (
                            <img src={scissors} alt='Player scissors.' />
                        )}
                    </div>
                    <div className='pcChoice'>
                        {pcChoice === 'rock' && (
                            <img src={rock} alt='Player rock.' />
                        )}
                        {pcChoice === 'paper' && (
                            <img src={paper} alt='Player paper.' />
                        )}
                        {pcChoice === 'scissors' && (
                            <img src={scissors} alt='Player scissors.' />
                        )}
                    </div>
                </div>
                {!gameOver && (
                    <div className='buttonContainer'>
                        <h1>Make your choice:</h1>
                        <button
                            className='button button1'
                            onClick={playerRock}
                            disabled={gameOver}
                        >
                            Rock
                        </button>
                        <button
                            className='button button1'
                            onClick={playerPaper}
                            disabled={gameOver}
                        >
                            Paper
                        </button>
                        <button
                            className='button button1'
                            onClick={playerScissors}
                            disabled={gameOver}
                        >
                            Scissors
                        </button>
                    </div>
                )}
            </>
            {/* )} */}
            <div className='buttonContainer'>
                {gameOver && (
                    <>
                        <h1>Play again?</h1>
                        <button
                            className='button button1'
                            onClick={handleReset}
                        >
                            Play again?
                        </button>
                    </>
                )}
            </div>
            <h3>Global score</h3>
            {globalScore.map((score, index) => (
                <div key={index}>
                    {score.game !== '' && (
                        <p>
                            Game {score.game}: {score.name} {score.score}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default App;
