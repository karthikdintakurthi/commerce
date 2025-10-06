import { Container } from '@/components/ui/container';
import { render, screen } from '@testing-library/react';

describe('Container', () => {
  it('renders with default props', () => {
    render(<Container>Test content</Container>);
    
    const container = screen.getByText('Test content');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('mx-auto', 'w-full', 'px-4', 'sm:px-6', 'lg:px-8');
    expect(container).toHaveClass('max-w-[1200px]'); // default lg size
  });

  it('renders with different semantic elements', () => {
    const { rerender } = render(<Container as="section">Section content</Container>);
    expect(screen.getByRole('region')).toBeInTheDocument();

    rerender(<Container as="main">Main content</Container>);
    expect(screen.getByRole('main')).toBeInTheDocument();

    rerender(<Container as="article">Article content</Container>);
    expect(screen.getByRole('article')).toBeInTheDocument();

    rerender(<Container as="header">Header content</Container>);
    expect(screen.getByRole('banner')).toBeInTheDocument();

    rerender(<Container as="footer">Footer content</Container>);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    rerender(<Container as="nav">Nav content</Container>);
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    rerender(<Container as="aside">Aside content</Container>);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Container size="sm">Small</Container>);
    expect(screen.getByText('Small')).toHaveClass('max-w-2xl');

    rerender(<Container size="md">Medium</Container>);
    expect(screen.getByText('Medium')).toHaveClass('max-w-4xl');

    rerender(<Container size="lg">Large</Container>);
    expect(screen.getByText('Large')).toHaveClass('max-w-[1200px]');

    rerender(<Container size="xl">Extra Large</Container>);
    expect(screen.getByText('Extra Large')).toHaveClass('max-w-7xl');

    rerender(<Container size="full">Full</Container>);
    expect(screen.getByText('Full')).toHaveClass('max-w-none');
  });

  it('applies custom className', () => {
    render(<Container className="custom-class">Test</Container>);
    expect(screen.getByText('Test')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Container ref={ref}>Test</Container>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has proper accessibility attributes', () => {
    render(<Container as="main" aria-label="Main content">Test</Container>);
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('aria-label', 'Main content');
  });
});
