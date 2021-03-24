const ReportBoard = (props) => {
    return (
        <ul>
            <li
                className={(props.chosenReport == 'summary' ? 'selected' : 'unselected')}
                onClick={() => { props.setChosenReport('summary') }}
            >
                Summary
            </li>
            <li
                className={(props.chosenReport == 'credit' ? 'selected' : 'unselected')}
                onClick={() => { props.setChosenReport('credit') }}
            >
                Credit
                </li>
        </ul>
    );
}

export default ReportBoard;