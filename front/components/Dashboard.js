import TopScore from './TopScore';
import DuplicatedBarGraph from './DuplicatedBarGraph';
import MembersTable from './MembersTable';

const Dashboard = ({
    duplicatedFirstnames,
    duplicatedLastnames,
    grouppedFirstnames,
    grouppedLastnames,
    newMembers

}) => {

    const year = new Date().getFullYear();

    return (
        <div className="container-fluid py-4">
            <div className="row">
                
                <TopScore title="Top Firstname" members={grouppedFirstnames[0].members} keyName="lastname">
                    {grouppedFirstnames[0].firstname}
                </TopScore>
                <TopScore title="Top Lastname" members={grouppedLastnames[0].members} keyName="firstname">
                    {grouppedLastnames[0].lastname}
                </TopScore>
                <TopScore title="Last Incomes" members={newMembers} keyName="firstname">
                    <span className="text-sm font-weight-bolder text-success">in 30 days</span>
                </TopScore>
            </div>
            
            <div className="row mt-4">
                <DuplicatedBarGraph title="Duplicated first names" data={duplicatedFirstnames} />
                <DuplicatedBarGraph title="Duplicated last names" data={duplicatedLastnames} />
                
            </div>
            <div className="row my-4">
                <MembersTable 
                    title="All first names" 
                    columnName="Firstname"
                    columnKey="firstname"
                    memberKey="lastname" 
                    grouppedData={grouppedFirstnames}
                />
                <MembersTable 
                    title="All last names" 
                    columnName="Lastname"
                    columnKey="lastname"
                    memberKey="firstname" 
                    grouppedData={grouppedLastnames}
                />
            
            </div>
            <footer className="footer pt-3">
                <div className="container-fluid">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-6 mb-lg-0 mb-4">
                    <div className="copyright text-center text-sm text-muted text-lg-left">
                        {year},
                        made with <i className="fa fa-heart"></i> by
                        <a href="https://github.com/lalogrosz/ranking-names" className="font-weight-bold" target="_blank"> Alan Grosz</a>
                    </div>
                    </div>
                   
                </div>
                </div>
            </footer>
            </div>
    );
};

export default Dashboard;
