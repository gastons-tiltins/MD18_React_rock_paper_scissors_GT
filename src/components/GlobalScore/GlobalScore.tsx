import axios from 'axios';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

type globalScore = {
    globalScore: {
        player_name: string;
        game_no: string;
        score_pc: string;
        score_player: string;
    }[];
};

export const GlobalScore: React.FunctionComponent<globalScore> = ({
    globalScore,
}) => {
    const fetchPosts = async () => {
        const res = await axios
            .get('http://localhost:3004/results')
            .then((res) => {
                console.log('123');
                console.log(res.data);
            });
        // return res.data;
    };

    function FetchSqlData() {
        const {isLoading, error, data} = useQuery({
            queryKey: ['repoData'],
            queryFn: () =>
                fetch('http://localhost:3004/results').then((res) =>
                    res.json(),
                ),
        });

        if (isLoading) return <div>'Loading...'</div>;

        // if (error) return 'An error has occurred: ' + error.message;
        if (error) return <div>'An error has occurred.'</div>;

        return (
            <div>
                {/* <p>{JSON.stringify(data)}</p> */}
                <p>{data[0].player_name}</p>
                {/* <p>{data}</p> */}
                {/* <h1>{data.name}</h1>
                <p>{data.description}</p>
                <strong>👀 {data.subscribers_count}</strong>{' '}
                <strong>✨ {data.stargazers_count}</strong>{' '}
                <strong>🍴 {data.forks_count}</strong> */}
            </div>
        );
    }
    return (
        <>
            <FetchSqlData />
            {/* <div className='globalScore'>
                {globalScore.length >= 2 && <h2>Global score</h2>}
                {globalScore.map((score, index) => (
                    <div key={index}>
                        {score.game_no !== '' && (
                            <h4>
                                Game {score.game_no}: {score.player_name}{' '}
                                {Number(score.score_player) >
                                Number(score.score_pc)
                                    ? `WON`
                                    : `LOST`}{' '}
                                ({score.score_player} vs {score.score_pc})
                            </h4>
                        )}
                    </div>
                ))}
            </div> */}
        </>
    );
};

// TODO:
// Nolasīt datus no DB. (DONE)
// cik bieži?  un kad ir gameOver
// kurā brīdī?  kad ir gameOver
// ko darīt ar šiem datiem? parādīt globalResutls tabulā
// kad vajag refetchot?   uz gameOver?
// Ierakstīt spēles rezultātus DB
// cik bieži? uz gameOver
//
