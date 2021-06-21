import TooltipMembersContent from './TooltipMembersContent';

const TopScore = ({
    title,
    members,
    keyName,
    children
}) => {

    return (
        <div className=" col-md-4 col-sm-12 mb-xl-0 mb-4">
            <div className="card">
                <div className="card-body p-3">
                <div className="row">
                    <div className="col-8">
                    <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">{title}</p>
                        <h5 className="font-weight-bolder mb-0">
                        {children}
                        </h5>
                    </div>
                    </div>
                    <div className="col-4 text-end">
                        <TooltipMembersContent members={members} keyName={keyName} />                    
                    </div>                    
                </div>
                </div>
            </div>
        </div>
    )
};
export default TopScore;