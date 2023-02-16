import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import rock from '../../assets/images/rock.png';
import paper from '../../assets/images/paper.png';
import scissors from '../../assets/images/scissors.png';
import rockSmall from '../../assets/images/rockSmall.png';
import paperSmall from '../../assets/images/paperSmall.png';
import scissorsSmall from '../../assets/images/scissorsSmall.png';
import {useTranslation} from 'react-i18next';
import {GlobalScore} from '../GlobalScore/GlobalScore';
import axios from 'axios';
import {useMutation, useQueryClient} from '@tanstack/react-query';

// Localization languages
const lngs: {} = {
    en: {nativeName: 'English'},
    lv: {nativeName: 'Latvian'},
    ar: {nativeName: 'العربية'},
};

export const Game = () => {
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
    const [turnResult, setTurnResult] = useState({
        player: '',
        pc: '',
        draw: '',
        winner: '',
    });
    const [finalScore, setFinalScore] = useState({
        player: '',
        pc: '',
    });
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
        setTurnResult({
            player: '',
            pc: '',
            draw: '',
            winner: '',
        });
        setFinalScore({
            player: '',
            pc: '',
        });
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
                setTurnResult({
                    player: playerChoice,
                    pc: pcChoice,
                    draw: '',
                    winner: playerName,
                });
                if (updatedPlayerScore === 5) {
                    setFinalScore({
                        player: String(playerScore + 1),
                        pc: String(pcScore),
                    });
                    setGlobalScore([
                        ...globalScore,
                        {
                            player_name: playerName,
                            score_pc: String(pcScore),
                            score_player: String(playerScore + 1),
                        },
                    ]);
                    setGameOver(true);
                    setGameNumber(gameNumber + 1);
                    let pushData: any = {
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
                setTurnResult({
                    player: playerChoice,
                    pc: pcChoice,
                    draw: '',
                    winner: 'PC',
                });
                if (updatePcScore === 5) {
                    setFinalScore({
                        player: String(playerScore),
                        pc: String(pcScore + 1),
                    });
                    setGlobalScore([
                        ...globalScore,
                        {
                            player_name: playerName,
                            score_pc: String(pcScore + 1),
                            score_player: String(playerScore),
                        },
                    ]);
                    setGameOver(true);
                    setGameNumber(gameNumber + 1);

                    let pushData: any = {
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
                setTurnResult({
                    player: '',
                    pc: '',
                    draw: 'draw',
                    winner: '',
                });
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
                    <div className='saveName'>
                        <form onSubmit={handleNameForm}>
                            <div className='setYourName'>
                                <label className='formLabel ' htmlFor='name'>
                                    {t('setYourName')}
                                </label>
                            </div>
                            <div>
                                <input
                                    className='formInput'
                                    maxLength={18}
                                    type='text'
                                    id='name'
                                    name='player'
                                    required
                                />
                            </div>
                            <div>
                                <button className='button button1'>
                                    {t('saveName')}
                                </button>
                            </div>
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

    const ResetDatbase = () => {
        return (
            <button className='button button2' onClick={handleResetDatabase}>
                {t('resetDatabase')}
            </button>
        );
    };

    const ChangeYourName = () => {
        return (
            <>
                <button className='button button2' onClick={handleChangeName}>
                    {t('changeYourName')}
                </button>
            </>
        );
    };

    return (
        <div className='App'>
            <div className='navBar'>
                <div>
                    <img className='smallImage' src={rockSmall} alt='Rock' />
                    <img
                        className='smallImage'
                        src={scissorsSmall}
                        alt='Rock'
                    />
                    <img className='smallImage' src={paperSmall} alt='Rock' />
                </div>
                <div>
                    <Link className='linkText' to='/'>
                        {t('homeLink')}
                    </Link>
                </div>
                <div>
                    <Link className='linkText' to='/game'>
                        {t('gameLink')}
                    </Link>
                </div>
                <div>
                    {nameIsSet && (
                        <h2>
                            {t('yourName')} {playerName}
                        </h2>
                    )}
                </div>
                <div>{gameOver && <ChangeYourName />}</div>
                <div>{gameOver && <ResetDatbase />}</div>
                <div className='translateContainer'>
                    <label className='formLabel' htmlFor='langChange'>
                        {t('selectLanguage')}{' '}
                    </label>
                    <select
                        className='selectForm'
                        onChange={langChange}
                        name='cars'
                        id='langChange'
                    >
                        <option value='en'>English</option>
                        <option value='lv'>Latviešu</option>
                        <option value='ar'>العربية</option>
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
                                            {t('turn')} {moves} {t('result')}{' '}
                                            {turnResult.draw === 'draw' && (
                                                <span>{t('draw')}</span>
                                            )}
                                            {turnResult.winner ===
                                                playerName && (
                                                <span>
                                                    {playerName} <span>+1</span>{' '}
                                                    {t('with')}{' '}
                                                    {turnResult.player}{' '}
                                                    {t('over')} {turnResult.pc}
                                                </span>
                                            )}
                                            {turnResult.winner === 'PC' && (
                                                <span>
                                                    {' '}
                                                    {t('pcPlusOne')}
                                                    <span>+1</span>{' '}
                                                    {turnResult.pc} {t('over')}{' '}
                                                    {turnResult.player}
                                                </span>
                                            )}
                                        </h1>
                                    )}
                                </div>
                                <div className='turnScores'>
                                    <h2>
                                        {playerName}: {playerScore}
                                    </h2>
                                    <h2>
                                        {t('thePc')} {pcScore}
                                    </h2>
                                </div>
                                <div className='finalResult'>
                                    {gameOver && (
                                        <h1>
                                            {t('gameOver')} {playerName}{' '}
                                            {finalScore.player} {t('pc')}
                                            {finalScore.pc}
                                        </h1>
                                    )}
                                </div>
                                <div className='choices'>
                                    <div className='playerChoice'>
                                        {playerChoice === 'rock' && (
                                            <img
                                                draggable='false'
                                                src={rock}
                                                alt='Player rock.'
                                            />
                                        )}
                                        {playerChoice === 'paper' && (
                                            <img
                                                draggable='false'
                                                src={paper}
                                                alt='Player paper.'
                                            />
                                        )}
                                        {playerChoice === 'scissors' && (
                                            <img
                                                draggable='false'
                                                src={scissors}
                                                alt='Player scissors.'
                                            />
                                        )}
                                    </div>
                                    <div className='pcChoice'>
                                        {pcChoice === 'rock' && (
                                            <img
                                                draggable='false'
                                                src={rock}
                                                alt='Player rock.'
                                            />
                                        )}
                                        {pcChoice === 'paper' && (
                                            <img
                                                draggable='false'
                                                src={paper}
                                                alt='Player paper.'
                                            />
                                        )}
                                        {pcChoice === 'scissors' && (
                                            <img
                                                draggable='false'
                                                src={scissors}
                                                alt='Player scissors.'
                                            />
                                        )}
                                    </div>
                                </div>
                                {!gameOver && (
                                    <div className='buttonContainer'>
                                        <h2>{t('choice')}</h2>
                                        <button
                                            className='button button1'
                                            onClick={playerRock}
                                            disabled={gameOver}
                                        >
                                            {t('rock')}
                                        </button>
                                        <button
                                            className='button button1'
                                            onClick={playerScissors}
                                            disabled={gameOver}
                                        >
                                            {t('scissors')}
                                        </button>
                                        <button
                                            className='button button1'
                                            onClick={playerPaper}
                                            disabled={gameOver}
                                        >
                                            {t('paper')}
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
                                <h1>{t('playAgain')}</h1>
                                <button
                                    className='button button1'
                                    onClick={handleReset}
                                >
                                    {t('play')}
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <GlobalScore globalScore={globalScore} />
            </div>
        </div>
    );
};
