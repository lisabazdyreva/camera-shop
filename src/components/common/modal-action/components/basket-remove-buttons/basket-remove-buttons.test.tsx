import {render, screen} from '@testing-library/react';
import {BasketRemoveButtons} from '../components';
import {Provider} from 'react-redux';
import {mockStore} from '../../../../../utils/mocks';

const store = mockStore({});

describe('basket remove buttons component', () => {
  it('should render correctly', () => {
    render (
      <Provider store={store}>
        <BasketRemoveButtons id={1} handleCloseModal={jest.fn}/>
      </Provider>
    );

    expect(screen.getByText(/Удалить/i)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
  });
});
