import { ChangeEventHandler } from 'react';

interface Props {
    rowChange: ChangeEventHandler<HTMLInputElement>;
    rows: number;
}

export function RowSelect({ rowChange, rows }: Props) {
    return (
        <>
            <div>
                <input
                    type="range"
                    min="3"
                    max="7"
                    onChange={rowChange}
                    value={rows}
                />
            </div>
        </>
    );
}
