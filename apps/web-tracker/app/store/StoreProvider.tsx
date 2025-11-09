'use client';

import { FC, PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { makeStore } from './index';

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null);

  // eslint-disable-next-line react-hooks/refs
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    // eslint-disable-next-line react-hooks/refs
    <Provider store={storeRef.current.store}>
      {/* eslint-disable-next-line react-hooks/refs */}
      <PersistGate loading={null} persistor={storeRef.current.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
