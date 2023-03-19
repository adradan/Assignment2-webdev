export class ColorService {
    private static instance: ColorService;

    generateColor() {
        const red = this.generateNumber();
        const green = this.generateNumber();
        const blue = this.generateNumber();

        return `rgb(${red} ${green} ${blue})`;
    }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    private generateNumber() {
        return Math.floor(Math.random() * 255);
    }
}
