import {render, screen} from '@testing-library/react';

import {ErrorInfo} from '../common';
import {getFakeErrorText} from '../../../utils/mocks';

const fakeText = getFakeErrorText();

describe('error info component', () => {
  it('should render correctly', () => {
    render (
      <ErrorInfo text={fakeText} />
    );
    const paragraph = screen.getByText(/Произошла ошибка при загрузк/i);

    expect(paragraph).toBeInTheDocument();
    expect(paragraph.className === 'error-text').toBe(true);
  });
});
