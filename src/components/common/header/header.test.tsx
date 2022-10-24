import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import Header from './header';
import {getMockState, mockStore} from '../../../utils/mocks';


const mockState = getMockState();
const store = mockStore(mockState);

describe('header component', () => {
  it ('should render correctly', () => {
    render (
      <Provider store={store}>
        <MemoryRouter>
          <Header/>
        </MemoryRouter>
      </Provider>
    );
    const listClasses = screen.getByTestId('header-list').className;

    expect(listClasses === 'main-nav__list').toBe(true);
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });
});
