import './Card.style.css';
import { MouseEventHandler } from 'react';

type Props = {
    color?: string;
    colorStatus: boolean;
    clickEvent: MouseEventHandler<HTMLDivElement>;
};

export function Card({ color, colorStatus, clickEvent }: Props) {
    return (
        <div className="card-container" onClick={clickEvent}>
            <div
                className="card-back"
                style={{
                    display: colorStatus ? 'none' : '',
                }}
            ></div>
            <div
                className="card-front"
                style={{
                    backgroundColor: color || 'red',
                    display: colorStatus ? '' : 'none',
                }}
            >
                Card
            </div>
        </div>
    );
}
