import { Button } from 'component/button';
import { Tooltip } from 'component/tooltip';
import React, { useState } from 'react';

export const DemoPageComponent: React.FC = () => {
    return (
        <div className="container">
            <div className="item">
                <Tooltip content="This is a Tooltip!" placement="top">
                    {/* When component cannot take 'ref', wrap it around a div */}
                    <div>
                        <Button.Fill size="s">Tooltip top</Button.Fill>
                    </div>
                </Tooltip>
                <Tooltip content="This is a Tooltip!" placement="left">
                    {/* When component cannot take 'ref', wrap it around a div */}
                    <div>
                        <Button.Fill size="s">Tooltip left</Button.Fill>
                    </div>
                </Tooltip>

                <Tooltip content="This is a Tooltip!" placement="right">
                    {/* When component cannot take 'ref', wrap it around a div */}
                    <div>
                        <Button.Fill size="s">Tooltip right</Button.Fill>
                    </div>
                </Tooltip>
                <Tooltip content="This is a Tooltip!" placement="bottom">
                    {/* When component cannot take 'ref', wrap it around a div */}
                    <div>
                        <Button.Fill size="s">Tooltip bottom</Button.Fill>
                    </div>
                </Tooltip>
            </div>
        </div>
    );
};
