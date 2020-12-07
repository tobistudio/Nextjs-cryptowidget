import { Alert } from "../components/Alert";
import { Widget } from "../components/Widget";

export default function Home() {
    return (
        <div className="container mx-auto flex justify-between p-4">
            <div className="w-full max-w-2xl flex flex-col">
                <Widget name="LooksRare" symbol="$LOOKS" allocation={100} pinvest={0.75} price={4.15} address={{ addr: '0x069457902B6DfcE7bA3c450CdBabE1FEE3632D62', network: 'eth' }} targetDate={new Date().getTime() + 100000000} vesting={{ withdraw: 50000, unlock: 25000, lock: 25000 }} />
                <Widget name="Hedera" symbol="$HBAR" allocation={89.454} pinvest={0.75} price={1.84} address={{ addr: '0x069457902B6DfcE7bA3c450CdBabE1FEE3632D62', network: 'eth' }} targetDate={new Date().getTime() + 1000000000} vesting={{ withdraw: 0, unlock: 14528, lock: 74926 }} badge={true} />
            </div>
            <Alert />
        </div>
    )
}