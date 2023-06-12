import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'core/redux/slice';
import { RootState } from 'core/redux/reducer';

export const SiteLayout: React.FC = ({ children }) => {
    const { isOnline } = useSelector((state: RootState) => state.appReducer) || {};

    const dispatch = useDispatch();

    useEffect(() => {
        // Update network status
        const handleStatusChange = () => {
            dispatch(actions.onHandleNetworkChange(window?.navigator?.onLine));
        };

        // Listen to the online status
        window?.addEventListener('online', handleStatusChange);

        // Listen to the offline status
        window?.addEventListener('offline', handleStatusChange);

        // Specify how to clean up after this effect for performance improvment
        return () => {
            window?.removeEventListener('online', handleStatusChange);
            window?.removeEventListener('offline', handleStatusChange);
        };
    }, [isOnline]);

    return (
        <div>
            <div>{children}</div>

            <style jsx>
                {`
                    .siteWrapper {
                        height: 100%;
                        display: flex;
                        align-items: stretch;
                        overflow: hidden;

                        & :global(.navDrawer) {
                            flex: 0 0 auto;
                        }

                        #pageWrapper {
                            overflow-x: auto;
                            flex: 1 1 100%;
                        }

                        .pageWrapper.hasFooter {
                            height: calc(100vh - 64px);
                        }
                    }
                `}
            </style>
        </div>
    );
};
