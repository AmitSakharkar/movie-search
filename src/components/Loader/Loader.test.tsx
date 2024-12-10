import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader component', () => {
    it('should render without crashing', () => {
        const { container } = render(<Loader />);
        expect(container).toBeInTheDocument();
    });

    it('should have a div with the loader class', () => {
        const { container } = render(<Loader />);
        const loaderDiv = container.querySelector('div');
        expect(loaderDiv).toHaveClass('loader');
    });

    it('should contain a span element', () => {
        const { container } = render(<Loader />);
        const spanElement = container.querySelector('span');
        expect(spanElement).toBeInTheDocument();
    });
});