export class MapService {
    private static instance: MapService;

    generateMap(rows: number) {
        if (rows >= 10) rows = 10;
        if (rows < 3) rows = 3;
        const map = [];
        for (let i = 0; i < rows; i++) {
            const defaultValues = [false, false, false, false];
            map.push(defaultValues);
        }
        return map;
    }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }
}
