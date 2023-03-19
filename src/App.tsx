import { useState } from 'react';
import './App.css';
import { Card } from './shared/components/Card/Card.component';
import { ColorService } from './shared/services/ColorService';
import { MapService } from './shared/services/MapService';
import { Color } from './shared/models/Color.model';

function App() {
    const colorService = ColorService.Instance;
    const mapService = MapService.Instance;
    const [rows, setRows] = useState(3);

    const totalCells = rows * 4;
    const totalColors = totalCells / 2;
    const colors: Color[] = [];

    for (let i = 0; i < totalColors; i++) {
        const currColor = colorService.generateColor();
        colors.push({
            used: 0,
            value: currColor,
            visible: false,
            displayNumber: i + 1,
        });
    }

    const [map, setMap] = useState(mapService.generateMap(rows, colors));

    const cardClick = (
        event: React.MouseEvent<HTMLDivElement>,
        coordinate: number[]
    ) => {
        const row = coordinate[0];
        const col = coordinate[1];
        const newMap = [...map];
        newMap[row][col].visible = !newMap[row][col].visible;
        setMap(newMap);
        console.log(event);
    };

    return (
        <div className="App">
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
    );
}

export default App;
