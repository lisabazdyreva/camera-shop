import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import {ReturnButton} from '../components';
import {ModalInfoName} from '../../../../../utils/const';

describe('return button component', () => {
  it('should render correctly', () => {
    render (
      <MemoryRouter>
        <ReturnButton modalInfoType={ModalInfoName.OrderPost} handleCloseSuccessModal={jest.fn}/>
      </MemoryRouter>
    );

    const button = screen.getByRole('button');
    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
