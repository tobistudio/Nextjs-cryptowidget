import axios from 'axios';
import { Subject } from 'rxjs';

import { apiUrl } from '../config';

export const alertService = {
    onAlert,
    alert
};

const alertSubject = new Subject();

// enable subscribing to alerts observable
function onAlert() {
    return alertSubject.asObservable().pipe();
}

// core alert method
function alert(alert) {
    axios.post(`${apiUrl}/alerts`, alert)
        .then(response => {
            alertSubject.next({
                ...alert,
                createdAt: Date.now()
            });
        })
}