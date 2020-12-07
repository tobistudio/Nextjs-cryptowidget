import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons';

import { apiUrl } from '../config';
import { alertService } from '../services';

export const Alert = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        axios.get(`${apiUrl}/alerts`)
            .then((response) => {
                const received = response.data.data;
                received.map(alert => alert.read = true)
                setAlerts(received)
            })

        // subscribe to new alert notifications
        const subscription = alertService.onAlert()
            .subscribe(alert => {
                setAlerts(alerts => [...alerts, alert]);
            });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const recent = alerts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).filter(alert => !alert.read)
    const past = alerts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).filter(alert => alert.read)

    const [recentLimit, setRecentLimit] = useState(1);
    const [pastLimit, setPastLimit] = useState(1);

    const getDateString = (date) => {
        //3.14.22 at 13:49
        const d = new Date(date);
        return `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`;
    }

    const createAlert = () => {
        const result = window.prompt('Input Alert');
        alertService.alert({
            title: result,
            description: result
        });
    };

    return (
        <div className="ml-3 text-white border-l border-gray-500 w-full" style={{ maxWidth: '280px' }}>
            <div className="m-3 flex flex-col">
                <div className="w-full flex justify-between items-center px-2 mb-2">
                    <h3 className="text-white text-lg">Alerts</h3>
                    <FontAwesomeIcon icon={faClose} />
                </div>
                {recent.slice(0, recentLimit).map((alert, key) => (
                    <div key={key} className="flex text-white items-center border border-gray-500 rounded-md m-1 p-1 px-2 cursor-pointer" style={{ backgroundColor: "#212121" }}>
                        <img src="https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022" style={{ height: '20px' }} />

                        <div className="ml-2 flex-1 w-full flex flex-col">
                            <span className='text-sm'>{alert.title}</span>
                            <span className='text-xs'>Sending to {getDateString(alert.createdAt)} </span>
                        </div>
                    </div>
                ))}
                {recent.length <= 1 || recentLimit >= recent.length ? null : (
                    <div className="text-center text-sm p-1 my-2 text-gray-500 font-medium cursor-pointer" onClick={() => setRecentLimit(recentLimit + 1)}>
                        See more
                    </div>
                )}

                <div className="p-1 my-2 text-md text-gray-500 font-medium cursor-pointer">
                    Past events
                </div>

                {past.slice(0, pastLimit).map((alert, key) => (
                    <div key={key} className="flex text-white items-center border border-gray-500 rounded-md m-1 p-1 px-2 cursor-pointer" style={{ backgroundColor: "#212121" }}>
                        <img src="https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022" style={{ height: '20px' }} />

                        <div className="ml-2 flex-1 w-full flex flex-col">
                            <span className='text-sm'>{alert.title}</span>
                            <span className='text-xs'>Sending to {getDateString(alert.createdAt)} </span>
                        </div>
                    </div>
                ))}

                {past.length <= 1 || pastLimit >= past.length ? null : (
                    <div className="text-center text-sm p-1 my-2 text-gray-500 font-medium cursor-pointer" onClick={() => setPastLimit(pastLimit + 1)}>
                        See more
                    </div>
                )}

                <button className="text-sm mt-4 rounded-md border-gray-400 border text-gray-400 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2 focus:outline-none transition ease-in-out duration-300" onClick={createAlert}>Set new alert</button>
            </div>
        </div>
    );
}
