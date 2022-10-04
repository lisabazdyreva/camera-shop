import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Banner} from '../components';
import {LoadingStatus} from '../../../../../utils/const';
import {makeFakePromo} from '../../../../../mocks';

const mockPromos = [makeFakePromo()];

describe('banner tests', () => {
  it('should render banner correctly when promo downloaded', () => {
    render (
      <MemoryRouter>
        <Banner
          promos={mockPromos}
          level={'Профессиональный'}
          fetchStatus={LoadingStatus.Success}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/известного производителя/i)).toBeInTheDocument();
    expect(screen.getByText(/Новинка!/i)).toBeInTheDocument();
  });

  it('should render error information when it is error in downloading', () => {
    render (
      <MemoryRouter>
        <Banner
          promos={[]}
          level={''}
          fetchStatus={LoadingStatus.Error}
        />
      </MemoryRouter>
    );

    const img = screen.queryByAltText('баннер');
    expect(screen.getByText(/Произошла ошибка при загрузке/i)).toBeInTheDocument();
    expect(img).not.toBeInTheDocument();
  });
});
