import NotFound from '../../assets/images/browser.png';

export const NotFoundPage = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '72vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img
        src={NotFound}
        alt="Not Found"
        style={{
          width: '100px',
          height: '100px',
          objectFit: 'contain',
          alignContent: 'center',
          margin: '10px',
        }}
      />
      <span
        style={{
          fontFamily: ' "Montserrat", sans-serif',
          textAlign: 'center',
          lineHeight: '20px',
        }}
      >
        No data found for your location.<br></br> Be the first to fill the form!
      </span>
    </div>
  );
};
