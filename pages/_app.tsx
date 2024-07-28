import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import store from '../redux/store';
import RouteControl from '@/routes/routeControl';

const persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
    }, []);

    if (!showChild) {
        return null;
    }
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <RouteControl>
                        <Component {...pageProps} />
                    </RouteControl>
                </PersistGate>
            </Provider>
        </>
    );
}
