import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons';

export { Address };

Address.propTypes = {
    id: PropTypes.string,
    network: PropTypes.string,
    address: PropTypes.string
};

function Address({ id, network, address }) {

    const logos = {
        eth: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022',
        btc: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=022',
        bnb: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=022',
    }

    function processAddress(addr) {
        return addr.substr(0, 6) + '...' + addr.substr(addr.length - 10, 10);
    }

    function copyAddress() {
        navigator.clipboard.writeText(address);
    }

    return (
        <div className="flex text-white items-center lowercase cursor-pointer" onClick={copyAddress}>
            <img className="h-6" src={logos[network]} />
            <span className="ml-2 text-lg">{processAddress(address)}</span>
            <FontAwesomeIcon className="ml-2" icon={faCopy} />
        </div>
    );

}
