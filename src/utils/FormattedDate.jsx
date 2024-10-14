import React from 'react'

const FormattedDate = ({ dateString }) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
    return <span>{formattedDate}</span>;

}

export default FormattedDate