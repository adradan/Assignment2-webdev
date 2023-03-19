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

    const [map, setMap] = useState(
        mapService.generateMap(rows, colorService.createNewColors(rows))
    );

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

    useEffect(() => {
        setMap(
            mapService.generateMap(rows, colorService.createNewColors(rows))
        );
    }, [rows]);

    return (
        <div className="App">
            <div>
                Rows: {rows}
                <br />
                Total Cards: {rows * 4}
                <RowSelect rowChange={rowChange} rows={rows} />
            </div>
            <div>
                {map.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
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
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
