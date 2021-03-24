import { Accordion, Button, Card } from "react-bootstrap"
import axios from 'axios'
import CreditDetails from "./creditDetails";
const DebtorComp = (props) => {
    let debtorName = props.debtorName;
    let eventNo = props.eventKey + 1
    console.log(eventNo);
    console.log(debtorName);
    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={eventNo}>
                    {debtorName}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={eventNo}>
                <Card.Body>
                    <CreditDetails 
                        debtorName={debtorName}
                    />
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

export default DebtorComp;