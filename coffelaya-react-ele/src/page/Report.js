import React from 'react';
import CreditView from '../compo/report/creditView';
import SummaryView from '../compo/report/summaryView';

const Report = (props) => {
    let chosenReport = props.chosenReport;

    switch (chosenReport) {
        case 'summary':
            return (<SummaryView />);
            break;
        case 'credit':
            return(<CreditView />);
    }

}

export default Report;