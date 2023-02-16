import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';

type globalScore = {
    globalScore: {
        player_name: string;
        score_pc: string;
        score_player: string;
    }[];
};

export const GlobalScore: React.FunctionComponent<globalScore> = ({
    globalScore,
}) => {
    const [count, setCounter] = useState(0);
    const {t, i18n} = useTranslation();

    // Fetch data from API
    function FetchSqlData() {
        const {isLoading, error, data} = useQuery<
            string,
            Error,
            globalScore[],
            string[]
        >({
            queryKey: ['repoData'],
            queryFn: () =>
                fetch('http://localhost:3004/results').then((res) =>
                    res.json(),
                ),
        });

        if (isLoading) return <div>'Loading...'</div>;

        if (error) return <>'An error has occurred: ' + error.message;</>;

        return (
            <div>
                {/* <p>{JSON.stringify(data)}</p> */}
                <div className='globalScore'>
                    {data.length >= 2 && (
                        <h2 className='globalScore'>{t('globalScore')}</h2>
                    )}
                    <table className='resultsTable'>
                        <tbody>
                            {data.length > 0 && (
                                <tr>
                                    <th>{t('no')}</th>
                                    <th>{t('player')}</th>
                                    <th>{t('resultTable')}</th>
                                    <th>{t('playerScore')}</th>
                                    <th>{t('pcScore')}</th>
                                </tr>
                            )}
                            {data.map((score: any, index: any) => (
                                <tr key={index}>
                                    {score.player_name !== '' && (
                                        <>
                                            <td>{index + 1}</td>
                                            <td>{score.player_name}</td>
                                            <td>
                                                {Number(score.score_player) >
                                                Number(score.score_pc) ? (
                                                    <span>{t('won')}</span>
                                                ) : (
                                                    <span>{t('lost')}</span>
                                                )}
                                            </td>
                                            <td>{score.score_player}</td>
                                            <td>{score.score_pc}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    return (
        <>
            <FetchSqlData />
        </>
    );
};
