const Notification = ({ notification }) => {
  const styleColor = notification.type === 'error' ? 'red' : 'green';

  const style = {
    color: styleColor,
    border: `2px solid ${styleColor}`,
    borderRadius: 10,
    background: '#CCCCCC',
    padding: '0 1rem',
    margin: '1rem 0'
  };

  return (
    <div className='notification' style={style}>
      <h1>{notification.text}</h1>
    </div>
  );
};

export default Notification;