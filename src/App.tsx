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
    const [turns, setTurns] = useState(0);
    const [currentTimeout, setCurrentTimeout] =
        useState<ReturnType<typeof setTimeout>>();
    // [row, col]
    const [lastSelection, setLastSelection] = useState([] as number[]);

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
        const currentSelection = newMap[row][col];
        if (currentSelection.visible) return;

        currentSelection.visible = !currentSelection.visible;
        setMap(newMap);

        if (!lastSelection.length) {
            setLastSelection([row, col]);
            return;
        }

        const lastRow = lastSelection[0];
        const lastCol = lastSelection[1];
        const lastInfo = newMap[lastRow][lastCol];

        setTurns(turns + 1);
        setLastSelection([]);
    };

    const rowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        const { value } = target;
        setRows(parseInt(value));
    };

    const newGame = () => {
        const TWO_SECONDS_MS = 2000;
        setMap(genNewMap());
        setTurns(0);
        setLastSelection([]);
        setStatus('New Game Created.');
        const timeout = setTimeout(() => {
            setStatus('');
        }, TWO_SECONDS_MS);
        setCurrentTimeout(timeout);
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
                <div className="app-row">
                    <div>Turns: {turns}</div>
                    <div>{status}</div>
                </div>
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
