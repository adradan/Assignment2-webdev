import { Color } from '../models/Color.model';

export class ColorService {
    private static instance: ColorService;

    generateColor() {
        const red = this.generateNumber();
        const green = this.generateNumber();
        const blue = this.generateNumber();

        return `rgb(${red} ${green} ${blue})`;
    }

    createNewColors(rows: number) {
        const totalCells = rows * 4;
        const totalColors = totalCells / 2;
        const colors: Color[] = [];

        for (let i = 0; i < totalColors; i++) {
            const currColor = this.generateColor();
            colors.push({
                used: 0,
                value: currColor,
                visible: false,
                displayNumber: i + 1,
            });
        }
        return colors;
    }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    private generateNumber() {
        return Math.floor(Math.random() * 255);
    }
}
