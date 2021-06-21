import { renderToString } from 'react-dom/server';
import { OverlayTrigger, Tooltip } from 'react-bootstrap-v5';
import React from 'react';
import Image from 'next/image';

const TooltipMembersContent = ({members, keyName}) => {


    const titleHtml = members.map((m, index) => renderToString(
        
        <p key={index}>
            <a href="" className="avatar avatar-xs rounded-circle">
                <img
                    src={m.picture}
                    
                />
            </a>
            <span>{m[keyName]}</span>
        </p>
    )).join("");

    return (
        <React.Fragment>

        <OverlayTrigger  placement="bottom"
            overlay={
            <Tooltip className="tooltip-members">
                {members.map((m, index) => (
        
                    <p key={index}>
                        <a href="" className="avatar avatar-xs rounded-circle">
                            <Image
                                src={m.picture}    
                                width="25"
                                height="25"                           
                            />
                        </a>
                        <span>{m[keyName]}</span>
                    </p>
                ))} 
            </Tooltip>}
        >
            <div className="icon icon-shape bg-gradient-primary btn-outline-white shadow text-center border-radius-md"
          
                >
                <div className=" font-weight-bold" style={{fontSize: "30px"}}>{members.length}</div>
            </div>
        </OverlayTrigger>
        

        
        </React.Fragment>
    ); 
    
};

export default TooltipMembersContent;
