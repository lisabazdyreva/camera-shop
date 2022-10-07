import {LOADER_NOTIFICATION} from '../../../utils/const';

const Loader = ():JSX.Element => (
  <div className='loader-wrapper'>
    <div className='loader'></div>
    <h3>{LOADER_NOTIFICATION}</h3>
  </div>
);


export default Loader;
