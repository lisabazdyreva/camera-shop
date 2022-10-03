const Loader = () => {
  const text = 'Идёт загрузка...';
  return (
    <div className='loader-wrapper'>
      <div className='loader'></div>
      <h3>{text}</h3>
    </div>
  );
};

export default Loader;
