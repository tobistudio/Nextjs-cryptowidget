import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { dateTime } from '../helpers';

export { Counter };

Counter.propTypes = {
    id: PropTypes.string,
    target: PropTypes.number
};

const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    return dateTime.getValues(countDown);
};

function Counter({ id, target }) {

    const [days, hours, minutes, seconds] = useCountdown(target);

    return (
        <div className="text-sm text-slate-400 tracking-wide">
            Next unlock in
            {days ? <> <i className="not-italic font-medium text-lg text-white">{numeral(days).format('00')}</i>days</> : null}
            {hours ? <> <i className="not-italic font-medium text-lg text-white">{numeral(hours).format('00')}</i>hrs</> : null}
            {minutes ? <> <i className="not-italic font-medium text-lg text-white">{numeral(minutes).format('00')}</i>mins</> : null}
            {<> <i className="not-italic font-medium text-lg text-white">{numeral(seconds).format('00')}</i>secs</>}
        </div>
    );

}
