import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'core/redux/slice';
import { RootState } from 'core/redux/reducer';

export const SiteLayout: React.FC = ({ children }) => {
    const dispatch = useDispatch();

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
