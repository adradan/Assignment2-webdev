import { Color } from '../models/Color.model';

export class MapService {
    private static instance: MapService;

    generateMap(rows: number, colors: Color[]) {
        if (rows >= 10) rows = 10;
        if (rows < 3) rows = 3;
        const map: Color[][] = [];
        for (let i = 0; i < rows; i++) {
            const defaultValues: Color[] = [];
            for (let j = 0; j < 4; j++) {
                const color = this.grabColor(colors);
                const newColor: Color = {
                    used: 0,
                    visible: false,
                    value: color.value,
                    displayNumber: color.displayNumber,
                };
                defaultValues.push(newColor);
            }
            map.push(defaultValues);
        }
        console.log(map);
        return map;
    }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    private grabColor(colors: Color[]): Color {
        while (true) {
            const randIdx = Math.floor(Math.random() * colors.length);
            const color = colors[randIdx];
            if (color.used < 2) {
                color.used++;
                return color;
            }
        }
    }
}
