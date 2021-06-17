import Image from 'next/image';

const MembersTable = ({
    title,
    columnName,
    grouppedData,
    columnKey,
    memberKey
}) => {

    return (
        <div className="col-md-6 mb-md-0 mb-4">
            <div className="card">
                <div className="card-header pb-0">
                <div className="row">
                    <div className="col-lg-6 col-7">
                    <h6>{title}</h6>
                    </div>               
                </div>
                </div>
                <div className="card-body px-0 pb-2">
                <div className="table-responsive">
                    <table className="table align-items-center mb-0">
                    <thead>
                        <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{columnName}</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Members</th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {grouppedData.map((oneGroup, index1) => (
                        <tr key={index1}>
                            <td>
                                <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">{oneGroup[columnKey]}</h6>
                                </div>
                                </div>
                            </td>
                            <td>
                                <div className="avatar-group mt-2">
                                {oneGroup.members.map((oneMember, index2) => (
                                    <a key={index2} href="" className="avatar avatar-lg rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title={oneMember[memberKey]}>
                                      <Image src={oneMember.picture} layout='fill'  />
                                    </a>   
                                ))}
                                                     
                                </div>
                            </td>
                            <td className="align-middle text-center">
                                <span className="text-xs font-weight-bold"> {oneGroup.members.length} </span>
                            </td>                     
                        </tr>
                    ))}

                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    );
};
export default MembersTable;