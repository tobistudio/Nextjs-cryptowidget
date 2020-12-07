import PropTypes from 'prop-types';
import numeral from 'numeral';

import { Address } from "./Address"
import { Vesting } from './Vesting';
import { Counter } from './Counter';

import { alertService } from '../services';

export { Widget };


Widget.defaultProps = {
    badge: false
}

function Widget({ id, name, symbol, allocation, pinvest, price, address, vesting, targetDate, badge = false }) {

    const { withdraw, lock, unlock } = vesting;
    const { addr, network } = address;

    const handleAlert = () => {
        alertService.alert({ title: `Withdrew ${name}`, description: 'Withdrew LooksRare Requested!' });
    };

    return (
        <div className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-md p-0.5 my-1">
            <div className="flex flex-col p-1 px-6 rounded-md dark-bg">
                <div className="flex justify-between my-3">
                    <div className="flex-1 flex items-center">
                        <img src="https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022" className="widget-logo" />
                        <h1 className="ml-2 text-white text-3xl font-medium">{name}</h1>
                        <span className="ml-1 p-0.5 rounded-md bg-stone-500 border-stone-500 border-2 text-white text-xs">{symbol}</span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-sm text-neutral-400">Allocation</span>
                        <h3 className="text-white text-2xl font-medium">{numeral(allocation).format('0.000')}</h3>
                    </div>
                </div>

                <div className="flex justify-between my-2">
                    <div className="flex flex-col">
                        <span className="text-sm text-neutral-400">Price at investiment</span>
                        <h3 className="text-white text-xl">$0.75</h3>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-sm text-neutral-400">Current price</span>
                        <h3 className="text-white text-xl">$0.75</h3>
                    </div>
                </div>

                <div className="flex justify-between my-2">
                    <div className="flex flex-col">
                        <span className="text-sm text-neutral-400 mb-1">Contract</span>
                        <Address id="address" network="eth" address="0x069457902B6DfcE7bA3c450CdBabE1FEE3632D62" />
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-sm text-neutral-400 mb-1">Social</span>
                        <div className="flex">
                            <img className='cursor-pointer mx-0.5 social-icons' src="/icons/twitter.png" />
                            <img className='cursor-pointer mx-0.5 social-icons' src="/icons/discord.png" />
                            <img className='cursor-pointer mx-0.5 social-icons' src="/icons/telegram.png" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col my-2">
                    <span className="text-sm mb-2 text-neutral-400">Vesting Schedule</span>
                    <Vesting id="vesting" withdraw={withdraw} unlock={unlock} lock={lock} />
                    {!badge ? null : (
                        <div className="flex mt-2">
                            <div className="mr-2 flex flex-col">
                                <span className="text-xs text-white"><i>■</i> Started</span>
                                <span className="text-xs text-slate-400">Oct 12, 2021</span>
                            </div>
                            <div className="mx-4 flex flex-col">
                                <span className="text-xs text-white"><i>■</i> Clif ended</span>
                                <span className="text-xs text-slate-400">Oct 12, 2021</span>
                            </div>
                            <div className="mx-4 flex flex-col">
                                <span className="text-xs text-white"><i className='text-indigo-500'>■</i> Next unlock</span>
                                <span className="text-xs text-slate-400">Oct 12, 2021</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-between my-2 items-center">
                    <div className="flex flex-col">
                        <Counter target={targetDate} />
                    </div>
                    <div className="flex text-right">
                        <button className="text-sm mr-2 rounded-md border-slate-400 border text-slate-400 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2 focus:outline-none transition ease-in-out duration-300">Notify me</button>
                        <button onClick={handleAlert} className="text-sm bg-indigo-500 rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-white  px-4 py-2 focus:outline-none transition ease-in-out duration-300">Withdraw</button>
                    </div>
                </div>
            </div>
        </div>
    );

}
