// @flow
import React from 'react';
import moment from 'moment';

type Props = {
    date: number,
    format: string
}

export default function Moment(props: Props) {
    const { date, format } = props;
    return (
        <span>
            {
                moment(date).format(format || 'llll')}
        </span>
    );
}
