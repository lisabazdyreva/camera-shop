import {render, screen} from '@testing-library/react';

import {ErrorInfo} from '../common';
import {makeFakeErrorText} from '../../../utils/mocks';

const fakeText = makeFakeErrorText();

describe('error info test', () => {
  it('renders correctly', () => {
    render (
      <ErrorInfo text={fakeText} />
    );
    const container = document.querySelector('.error-text');

    expect(screen.getByText(/Произошла ошибка при загрузк/i)).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  });
});
