import React from "react";

const PersonsDisplay = (props) => {
    const { personsToShow, button } = props

    return (
        <div>
            {personsToShow} {button}
        </div>
    )
};

export default PersonsDisplay;