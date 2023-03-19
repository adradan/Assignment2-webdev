import { useState } from 'react';
import './App.css';
import { Card } from './shared/components/Card/Card.component';
import { ColorService } from './shared/services/ColorService';
import { MapService } from './shared/services/MapService';

type Color = {
    used: number;
    value: string;
};

function App() {
    const colorService = ColorService.Instance;
    const mapService = MapService.Instance;
    const [rows, setRows] = useState(3);
    const map = mapService.generateMap(rows);
    const totalCells = rows * 3;
    const totalColors = totalCells / 2;

    const colors: Color[] = [];

    for (let i = 0; i < totalColors; i++) {
        const currColor = colorService.generateColor();
        colors.push({
            used: 0,
            value: currColor,
        });
    }

    const cardClick = (event: React.MouseEvent<HTMLDivElement>) => {
        console.log(event);
    };

    const grabColor = (): string => {
        while (true) {
            const randIdx = Math.floor(Math.random() * colors.length);
            const color = colors[randIdx];
            if (color.used <= 2) {
                color.used++;
                return color.value;
            }
        }
    };

    return (
        <div className="App">
            {map.map((row, rowIdx) => {
                return (
                    <>
                        {row.map((status, idx) => {
                            const key = rowIdx + idx;
                            return (
                                <Card
                                    color={grabColor()}
                                    colorStatus={true}
                                    clickEvent={cardClick}
                                    key={key}
                                />
                            );
                        })}
                    </>
                );
            })}
            <Card
                color={colorService.generateColor()}
                colorStatus={false}
                clickEvent={cardClick}
            />
        </div>
    );
}

export default App;
