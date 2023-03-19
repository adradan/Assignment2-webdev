import './Card.style.css';
import { Color } from '../../models/Color.model';

type Props = {
    color: Color;
    clickEvent: (
        event: React.MouseEvent<HTMLDivElement>,
        coordinate: number[]
    ) => void;
    coordinate: number[];
};

export function Card({ color, clickEvent, coordinate }: Props) {
    return (
        <div
            className="card-container"
            onClick={(event) => clickEvent(event, coordinate)}
        >
            <div
                className="card-back"
                style={{
                    display: color.visible ? 'none' : '',
                }}
            ></div>
            <div
                className="card-front"
                style={{
                    backgroundColor: color.value || 'red',
                    display: color.visible ? '' : 'none',
                }}
            >
                Card, {color.displayNumber}
            </div>
        </div>
    );
}
