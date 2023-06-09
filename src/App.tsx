/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Tooltip } from './core/component/tooltip';

function App() {
    return (
        <>
            <div className="wrapper">
                <div className="text">Have a nice day</div>

                <Tooltip content="1233" placement="right">
                    <div className="text">Have a nice day</div>
                </Tooltip>
                <style>
                    {`
                        .wrapper {
                            width: 200px;
                            :global(.tooltipAnchor) {
                                width: 200px;
                            }
                            .text {
                                color: red;
                                width: 200px;
                            }
                        }
                    `}
                </style>
            </div>
        </>
    );
}

export default App;
