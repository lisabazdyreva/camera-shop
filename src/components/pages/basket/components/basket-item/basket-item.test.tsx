import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';

import {BasketItem} from '../components';
import {getFakeCamera, getFakeCameras, mockStore} from '../../../../../utils/mocks';
import {NameSpace} from '../../../../../utils/const';

const fakeCamera = getFakeCamera();

const store = mockStore({
  [NameSpace.Order]: {
    basket: getFakeCameras(),
  },
});

describe('basket item component', () => {
  it('should render correctly', () => {
    render (
      <Provider store={store}>
        <BasketItem onCameraRemoveModalOpen={jest.fn()} camera={fakeCamera}/>
      </Provider>
    );

    expect(screen.getByText(/Общая цена:/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
  });
});
