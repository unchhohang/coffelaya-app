import React from 'react';
import Bill from '../page/Bill';
import Credit from '../page/Credit';
import Entries from '../page/Entries'
import CreditBoard from '../compo/credit/creditBoard'
import Stocks from '../page/Stocks';
import Report from '../page/Report';
import Nav from '../nav/DropDown';
import SideBordBill from '../compo/bill/sideBordBill'
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,

} from "react-router-dom";
import {
    Col, Container, Row
} from 'react-bootstrap';
import axios from 'axios'
import ReportBoard from './report/reportBoard';
import Menu from '../page/Menu';



class App extends React.Component {



    state = {
        billData: [],
        selectedBill: "",
        selectedDebtor: "",
        refresh: "off",
        chosenReport: "summary"
    }

    componentDidMount() {
        this.getBillData();
    }

    getBillData = () => {
        axios.get('/api/billingStatus'
        )
            .then(res => {
                if (res.data) {
                    this.setState({
                        billData: res.data
                    })

                }
                console.log(res);
            })
            .catch(err => console.log(err));
    }



    selectBill = (id) => {
        this.setState({
            selectedBill: id
        })

        console.log('selectBill block ran: ' + this.state.selectedBill);

    }

    refreshBills = () => {
        this.getBillData();
        this.selectBill();
    }

    //Credit page 
    onDebtorClicked = (debtorName) => {
        this.setState({
            selectedDebtor: debtorName
        })
    }

    refreshStateOn = () => {
        this.setState({
            refresh: "ON"
        })

        console.log('refresh ON');
    }

    refreshStateOff = () => {
        this.setState({
            refresh: "OFF"
        })

        console.log('refresh OFF');
    }

    refreshCredit = () => {
        this.refreshStateOn();
        console.log("refresh state on is exec");
    }

    //Report
    setChosenReport = (report) => {
        this.setState(
            {
                chosenReport: report
            }
        );

        console.log('chosen report is : ' + report);
    }

    render() {

        return (
            <Container fluid >
                <Row>
                    <Router>
                        <Col xs={2} className='navSide'>
                            <Nav />
                            <Switch>
                                <Route exact path='/'>
                                    <SideBordBill
                                        billData={this.state.billData}
                                        onDataChange={this.getBillData}
                                        selectBill={this.selectBill}
                                        refreshBills={this.refreshBills}
                                    />
                                </Route>
                                <Route path='/credit'>
                                    <CreditBoard
                                        onDebtorClicked={this.onDebtorClicked}
                                        refreshStateOff={this.refreshStateOff}
                                        refresh={this.state.refresh}

                                    />
                                </Route>
                                <Route path='/report'>
                                    <ReportBoard
                                        chosenReport={this.state.chosenReport}
                                        setChosenReport={this.setChosenReport}
                                    />
                                </Route>
                            </Switch>
                        </Col>
                        <Col xs={10} className='body'>
                            <Switch>
                                <Route exact path='/'>
                                    {
                                        this.state.selectedBill ?
                                            <Bill
                                                billId={this.state.selectedBill}
                                                refreshBills={this.refreshBills}
                                            />
                                            :
                                            <h1>Select table</h1>

                                    }

                                </Route>
                                <Route path='/credit'>
                                    <Credit
                                        debtorName={this.state.selectedDebtor}
                                        refreshCredit={this.refreshCredit}
                                    />
                                </Route>
                                <Route path='/entries'>
                                    <Entries />
                                </Route>
                                <Route path='/stocks'>
                                    <Stocks />
                                </Route>
                                <Route path='/report'>
                                    <Report
                                        chosenReport={this.state.chosenReport}
                                    />
                                </Route>
                                <Route path='/menu'>
                                     <Menu />
                                </Route>
                            </Switch>
                        </Col>
                    </Router>


                </Row>

            </Container>


        );
    }
}

export default App;