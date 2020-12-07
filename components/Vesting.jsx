import PropTypes from 'prop-types';
import numeral from 'numeral';

export { Vesting };

Vesting.propTypes = {
    id: PropTypes.string,
    withdraw: PropTypes.number,
    lock: PropTypes.number,
    unlock: PropTypes.number
};

function Vesting({ id, withdraw, lock, unlock }) {

    const total = withdraw + lock + unlock;

    return (
        <div className="w-full flex text-white text-xs rounded-md border-slate-500 border">
            {withdraw ? (
                <span className="flex justify-center items-center rounded-sm " style={{ backgroundColor: '#515151', height: '30px', width: `${withdraw / total * 100}%` }}>
                    {numeral(withdraw).format('0,0')}
                </span>
            ) : null}
            {unlock ? (
                <span className="flex justify-center items-center rounded-sm" style={{ backgroundColor: '#6865FD', height: '30px', width: `${unlock / total * 100}%` }}>
                    {numeral(unlock).format('0,0')}
                </span>
            ) : null}
            {lock ? (
                <span className="flex justify-center items-center rounded-sm" style={{ backgroundColor: '#161616', height: '30px', width: `${lock / total * 100}%` }}>
                    {numeral(lock).format('0,0')}
                </span>
            ) : null}
        </div>
    );

}
