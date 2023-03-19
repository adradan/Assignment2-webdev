import { useEffect, useState } from 'react';
import './App.css';
import { Card } from './shared/components/Card/Card.component';
import { ColorService } from './shared/services/ColorService';
import { MapService } from './shared/services/MapService';
import { RowSelect } from './shared/components/RowSelect/RowSelect.component';

function App() {
    const colorService = ColorService.Instance;
    const mapService = MapService.Instance;
    const [rows, setRows] = useState(3);
    const [status, setStatus] = useState('');

    const genNewMap = () => {
        return mapService.generateMap(rows, colorService.createNewColors(rows));
    };

    const [map, setMap] = useState(genNewMap());

    const cardClick = (
        event: React.MouseEvent<HTMLDivElement>,
        coordinate: number[]
    ) => {
        const row = coordinate[0];
        const col = coordinate[1];
        const newMap = [...map];
        newMap[row][col].visible = !newMap[row][col].visible;
        setMap(newMap);
    };

    const rowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        const { value } = target;
        setRows(parseInt(value));
    };

    const newGame = () => {
        const TWO_SECONDS_MS = 2000;
        setMap(genNewMap());
        setStatus('New Game Created.');
        setTimeout(() => {
            setStatus('');
        }, TWO_SECONDS_MS);
    };

    useEffect(() => {
        newGame();
    }, [rows]);

    return (
        <div className="app-component">
            <div className="app-container">
                <div className="app-row">
                    <div>
                        Rows: {rows}
                        <br />
                        Total Cards: {rows * 4}
                        <RowSelect rowChange={rowChange} rows={rows} />
                    </div>
                    <div className="new-game-container">
                        <button
                            type="button"
                            className="new-game-btn pointer no-select"
                            onClick={newGame}
                        >
                            New Game
                        </button>
                    </div>
                </div>
                <div className="app-row">{status}</div>
                <div className="app-row">
                    <div className="app-map">
                        {map.map((row, rowIdx) => {
                            return (
                                <>
                                    {row.map((status, idx) => {
                                        const key = `${rowIdx}${idx}`;
                                        return (
                                            <Card
                                                color={map[rowIdx][idx]}
                                                clickEvent={cardClick}
                                                key={key}
                                                coordinate={[rowIdx, idx]}
                                            />
                                        );
                                    })}
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
