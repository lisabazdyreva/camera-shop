import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Pagination} from '../components';
import {Provider} from 'react-redux';
import {getMockState, mockStore} from '../../../../../utils/mocks';

const mockState = getMockState();
const store = mockStore(mockState);

describe('pagination component', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination
            currentPageNumber={2}
            setCurrentPageNumber={jest.fn()}
            pagesAmount={3}
          />
        </MemoryRouter>
      </Provider>
    );

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });

  it('should render correctly when it is first page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination
            currentPageNumber={1}
            setCurrentPageNumber={jest.fn()}
            pagesAmount={3}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText(/Назад/i)).not.toBeInTheDocument();
  });

  it('should render correctly when it is last page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination
            currentPageNumber={3}
            setCurrentPageNumber={jest.fn()}
            pagesAmount={3}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText(/Далее/i)).not.toBeInTheDocument();
  });
});
