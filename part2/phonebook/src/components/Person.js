import React from 'react'

const Person = (props) => {
    const { name, number } = props
    return (
        <div>
            <h6>
                {name} {number}
            </h6>
        </div>
    )
}

export default Person