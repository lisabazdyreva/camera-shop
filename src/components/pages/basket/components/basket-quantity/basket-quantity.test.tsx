import {render, screen} from '@testing-library/react';
import {BasketQuantity} from '../components';
import {getFakeCamera, mockStore} from '../../../../../utils/mocks';
import {Provider} from 'react-redux';


const fakeCamera = getFakeCamera();
const store = mockStore({});

describe('basket quantity component', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <BasketQuantity camera={fakeCamera} cameraAmount={99} onCameraAmountChange={jest.fn} />
      </Provider>
    );

    const input = (screen.queryByTestId('cameras-amount')) as HTMLInputElement;
    expect(input.value).toBe('99');
  });
});
