import {useState, useEffect, useRef} from 'react';
import './App.css';
import rock from './assets/images/rock.png';
import paper from './assets/images/paper.png';
import scissors from './assets/images/scissors.png';
import {useTranslation, Trans} from 'react-i18next';
import {GlobalScore} from './components/GlobalScore/GlobalScore';
import axios from 'axios';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

// Localization languages
const lngs: {} = {
    en: {nativeName: 'English'},
    lv: {nativeName: 'Latvian'},
};

function App() {
    // Translation
    const [count, setCounter] = useState(0);
    const {t, i18n} = useTranslation();

    // Player name
    const [playerName, setPlayerName] = useState('');
    const [nameIsSet, setNameIsSet] = useState(false);

    // Global data
    const [gameNumber, setGameNumber] = useState(0);
    const [globalScore, setGlobalScore] = useState([
        {
            player_name: '',
            game_no: '',
            score_pc: '',
            score_player: '',
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
        setPlayerChoice('');
        setPcChoice('');
        setPlayerScore(0);
        setPcScore(0);
        setTurnResult('');
        setFinalScore('');
        setGameOver(false);
        setMoves(0);
    };

    // Access the client
    const queryClient = useQueryClient();

    // Send data to API
    const sendDataToApi = useMutation({
        mutationFn: (matchData) => {
            return axios.post(`http://localhost:3004/post`, matchData);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({queryKey: ['repoData']});
        },
    });

    // Wipe database data
    const deletePost = useMutation({
        mutationFn: () => {
            return axios.delete(`http://localhost:3004/delete`);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({queryKey: ['repoData']});
        },
    });

    useEffect(() => {
        if (playerScore <= 4 && pcScore <= 4) {
            if (
                (playerChoice == 'paper' && pcChoice == 'rock') ||
                (playerChoice == 'rock' && pcChoice == 'scissors') ||
                (playerChoice == 'scissors' && pcChoice == 'paper')
            ) {
                const updatedPlayerScore = playerScore + 1;
                setPlayerScore(updatedPlayerScore);
                setTurnResult(
                    `${playerName} takes +1 point with ${playerChoice} over ${pcChoice}!`,
                );
                if (updatedPlayerScore === 5) {
                    setFinalScore(
                        `Player wins (${playerScore + 1} vs ${pcScore})`,
                    );
                    setGlobalScore([
                        ...globalScore,
                        {
                            game_no: String(gameNumber + 1),
                            player_name: playerName,
                            score_pc: String(pcScore),
                            score_player: String(playerScore + 1),
                        },
                    ]);
                    setGameOver(true);
                    setGameNumber(gameNumber + 1);
                    let pushData: any = {
                        game_no: String(gameNumber + 1),
                        player_name: playerName,
                        score_pc: String(pcScore),
                        score_player: String(playerScore + 1),
                    };
                    sendDataToApi.mutate(pushData);
                }
            }

            if (
                (pcChoice == 'paper' && playerChoice == 'rock') ||
                (pcChoice == 'rock' && playerChoice == 'scissors') ||
                (pcChoice == 'scissors' && playerChoice == 'paper')
            ) {
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
                            game_no: String(gameNumber + 1),
                            player_name: playerName,
                            score_pc: String(pcScore + 1),
                            score_player: String(playerScore),
                        },
                    ]);
                    setGameOver(true);
                    setGameNumber(gameNumber + 1);

                    type pushData = {
                        game_no: string;
                        player_name: string;
                        score_pc: string;
                        score_player: string;
                    };

                    let pushData: any = {
                        game_no: String(gameNumber + 1),
                        player_name: playerName,
                        score_pc: String(pcScore + 1),
                        score_player: String(playerScore),
                    };
                    sendDataToApi.mutate(pushData);
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

    const handleNameForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPlayerName(e.target.player.value);
        setNameIsSet(true);
    };

    const handleChangeName = (e: React.SyntheticEvent) => {
        // setNameIsSet(false);
        setNameIsSet((prevCheck) => !prevCheck);
    };

    const Name = () => {
        return (
            <>
                {!nameIsSet && (
                    <div className=''>
                        <br />
                        <form onSubmit={handleNameForm}>
                            <label className='formLabel' htmlFor='name'>
                                Set your name:{' '}
                            </label>
                            <input
                                className='formInput'
                                type='text'
                                id='name'
                                name='player'
                                required
                            />
                            <button className='button button1'>
                                Save name
                            </button>
                        </form>
                    </div>
                )}
            </>
        );
    };

    const langChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(e.target.value);
        setCounter(count + 1);
    };

    const handleResetDatabase = () => {
        deletePost.mutate();
    };

    return (
        <div className='App'>
            <div className='navBar'>
                <div>
                    <h1>
                        <div>
                            <h1>{t('gameTitle')}</h1>
                        </div>
                    </h1>
                </div>
                <div>{nameIsSet && <h2>Your name is: {playerName}</h2>}</div>
                <div>
                    {gameOver && nameIsSet && (
                        <button
                            className='button button2'
                            onClick={handleChangeName}
                        >
                            Change name?
                        </button>
                    )}
                </div>
                <div>
                    {gameOver ||
                        (!nameIsSet && (
                            <button
                                className='button button2'
                                onClick={handleResetDatabase}
                            >
                                Reset database
                            </button>
                        ))}
                </div>
                <div>
                    <label className='formLabel' htmlFor='langChange'>
                        Select language:{' '}
                    </label>
                    <select
                        className='formInput'
                        onChange={langChange}
                        name='cars'
                        id='langChange'
                    >
                        <option value='en'>English</option>
                        <option value='lv'>Latvian</option>
                    </select>
                </div>

                {/* <h1>Game No: {gameNumber}</h1> */}
            </div>
            <div className='mainContainer'>
                <div>
                    <Name />
                    {/* <button className='button button1'>Change name</button> */}

                    {nameIsSet && (
                        <>
                            {/* {moves > 0 && <h1>Move No: {moves}</h1>} */}
                            {/* {gameOver != true && ( */}

                            <>
                                <div className='turnResult'>
                                    {turnResult && (
                                        <h1 className='turnStyling'>
                                            Turn {moves} result: {turnResult}
                                        </h1>
                                    )}
                                </div>
                                <div className='turnScores'>
                                    <h2>
                                        {playerName}: {playerScore}
                                    </h2>
                                    <h2>PC: {pcScore}</h2>
                                </div>
                                <div className='finalResult'>
                                    {finalScore && (
                                        <h1>Game over! {finalScore}</h1>
                                    )}
                                </div>
                                <div className='choices'>
                                    <div className='playerChoice'>
                                        {playerChoice === 'rock' && (
                                            <img
                                                src={rock}
                                                alt='Player rock.'
                                            />
                                        )}
                                        {playerChoice === 'paper' && (
                                            <img
                                                src={paper}
                                                alt='Player paper.'
                                            />
                                        )}
                                        {playerChoice === 'scissors' && (
                                            <img
                                                src={scissors}
                                                alt='Player scissors.'
                                            />
                                        )}
                                    </div>
                                    <div className='pcChoice'>
                                        {pcChoice === 'rock' && (
                                            <img
                                                src={rock}
                                                alt='Player rock.'
                                            />
                                        )}
                                        {pcChoice === 'paper' && (
                                            <img
                                                src={paper}
                                                alt='Player paper.'
                                            />
                                        )}
                                        {pcChoice === 'scissors' && (
                                            <img
                                                src={scissors}
                                                alt='Player scissors.'
                                            />
                                        )}
                                    </div>
                                </div>
                                {!gameOver && (
                                    <div className='buttonContainer'>
                                        <h2>Make your choice:</h2>
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
                        </>
                    )}

                    {/* )} */}
                    <div className='buttonContainer'>
                        {gameOver && nameIsSet && (
                            <>
                                <h1>Play again?</h1>
                                <button
                                    className='button button1'
                                    onClick={handleReset}
                                >
                                    Play
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <GlobalScore globalScore={globalScore} />
            </div>
        </div>
    );
}

export default App;
