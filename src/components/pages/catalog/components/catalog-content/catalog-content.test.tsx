import {makeFakeCamera} from '../../../../../utils/mocks';
import {LoadingStatus} from '../../../../../utils/const';
import {render, screen} from '@testing-library/react';
import {CatalogContent} from '../components';
import {MemoryRouter} from 'react-router-dom';


const mockCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];

describe('Render Catalog correctly', () => {
  it('should render catalog with data', () => {
    render (
        <MemoryRouter>
            <CatalogContent
              // fetchStatus={LoadingStatus.Success}
              // cards={mockCameras}
              handleAddModal={jest.fn()}
              // pages={[1, 2, 3]}
              currentPageNumber={1}
              setCurrentPageNumber={jest.fn()}
            />
        </MemoryRouter>
    );

    expect(screen.getByTestId('catalog-content')).toBeInTheDocument();
  });

  it ('should render error-info message when it is error-info in data', () => {
    render (
      <MemoryRouter>
        <CatalogContent
          // fetchStatus={LoadingStatus.Error}
          // cards={[]}
          handleAddModal={jest.fn()}
          // pages={[]}
          currentPageNumber={1}
          setCurrentPageNumber={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/Произошла ошибка при загрузке/i)).toBeInTheDocument();
  });

  it ('should render loader when it is loading data', () => {
    render (
      <MemoryRouter>
        <CatalogContent
          // fetchStatus={LoadingStatus.Loading}
          // cards={[]}
          handleAddModal={jest.fn()}
          // pages={[]}
          currentPageNumber={1}
          setCurrentPageNumber={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/Идёт загрузка/i)).toBeInTheDocument();
  });
});
