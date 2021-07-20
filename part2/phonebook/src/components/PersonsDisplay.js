import React from "react";

const PersonsDisplay = (props) => {
    const { personsToShow } = props

    return (
        <div>
            {personsToShow}
        </div>
    )
};

export default PersonsDisplay;