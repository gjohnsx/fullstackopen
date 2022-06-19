const Notification = ({ message, isErrorMsg }) => {
    console.log('message=', message.message);
    console.log('isErrorMsg=', message.isErrorMsg);
    if (message.message === null) {
        return null;
    }
    const errorStyle = {
        fontSize: '1.4rem',
        border: '2px solid #FF2121',
        borderRadius: 5,
        boxShadow: '1px 1px 15px 5px rgba(200,200,200,0.32)',
        width: '50%',
        padding: '.25rem',
        textAlign: 'center',
        background: '#DDDDDD',
        color: '#FF2121'
    }

    const successStyle = {
        fontSize: '1.4rem',
        borderRadius: 5,
        boxShadow: '1px 1px 15px 5px rgba(200,200,200,0.32)',
        width: '50%',
        padding: '.25rem',
        textAlign: 'center',
        // background: '#DDDDDD',
        background: 'linear-gradient(220.55deg, #4643DF 0%, #0B0A47 100%)',
        color: '#FFF'
    }

    return (
        <div className='error-message' style={message.isErrorMsg ? errorStyle : successStyle}>
            {message.message}
        </div>
    )
}

export default Notification;