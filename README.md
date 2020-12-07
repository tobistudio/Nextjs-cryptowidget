### What you can find useful in this project: 

- [x] Responsive design
- [x] State management across the pages by rxjs without using redux
- [x] Project build based on TypeScript using Nextjs, TailwindCss

-------

### Also below some more interesting things i have learned

- Example of using rxjs [services/alert.service.js](services/alert.service.js)

```tsx
  const alertSubject = new Subject();

// enable subscribing to alerts observable
function onAlert() {
    return alertSubject.asObservable().pipe();
}
```

- Subscribe new alert notifications [components/Alert.jsx](components/Alert.jsx)

```tsx
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
```

--------