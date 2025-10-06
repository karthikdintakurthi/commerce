import { Grid, GridItem } from '@/components/ui/grid';
import { render, screen } from '@testing-library/react';

describe('Grid', () => {
  it('renders with default props', () => {
    render(<Grid>Test content</Grid>);
    
    const grid = screen.getByText('Test content');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid', 'w-full', 'gap-4'); // default md gap
  });

  it('renders with different semantic elements', () => {
    const { rerender } = render(<Grid as="section">Section content</Grid>);
    expect(screen.getByRole('region')).toBeInTheDocument();

    rerender(<Grid as="main">Main content</Grid>);
    expect(screen.getByRole('main')).toBeInTheDocument();

    rerender(<Grid as="article">Article content</Grid>);
    expect(screen.getByRole('article')).toBeInTheDocument();

    rerender(<Grid as="nav">Nav content</Grid>);
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    rerender(<Grid as="aside">Aside content</Grid>);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('applies correct gap classes', () => {
    const { rerender } = render(<Grid gap="sm">Small gap</Grid>);
    expect(screen.getByText('Small gap')).toHaveClass('gap-2');

    rerender(<Grid gap="md">Medium gap</Grid>);
    expect(screen.getByText('Medium gap')).toHaveClass('gap-4');

    rerender(<Grid gap="lg">Large gap</Grid>);
    expect(screen.getByText('Large gap')).toHaveClass('gap-6');

    rerender(<Grid gap="xl">Extra Large gap</Grid>);
    expect(screen.getByText('Extra Large gap')).toHaveClass('gap-8');
  });

  it('applies correct grid template columns for numeric columns', () => {
    const { rerender } = render(<Grid columns={2}>Two columns</Grid>);
    expect(screen.getByText('Two columns')).toHaveStyle('grid-template-columns: repeat(2, 1fr)');

    rerender(<Grid columns={3}>Three columns</Grid>);
    expect(screen.getByText('Three columns')).toHaveStyle('grid-template-columns: repeat(3, 1fr)');

    rerender(<Grid columns={4}>Four columns</Grid>);
    expect(screen.getByText('Four columns')).toHaveStyle('grid-template-columns: repeat(4, 1fr)');
  });

  it('applies correct grid template columns for auto-fit', () => {
    render(<Grid columns="auto-fit" minItemWidth="300px">Auto fit</Grid>);
    expect(screen.getByText('Auto fit')).toHaveStyle('grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))');
  });

  it('applies correct grid template columns for auto-fill', () => {
    render(<Grid columns="auto-fill" minItemWidth="250px">Auto fill</Grid>);
    expect(screen.getByText('Auto fill')).toHaveStyle('grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))');
  });

  it('applies custom className', () => {
    render(<Grid className="custom-class">Test</Grid>);
    expect(screen.getByText('Test')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Grid ref={ref}>Test</Grid>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has proper accessibility attributes', () => {
    render(<Grid as="main" aria-label="Product grid">Test</Grid>);
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('aria-label', 'Product grid');
  });
});

describe('GridItem', () => {
  it('renders with default props', () => {
    render(<GridItem>Test content</GridItem>);
    
    const item = screen.getByText('Test content');
    expect(item).toBeInTheDocument();
    expect(item).toHaveClass('w-full');
  });

  it('renders with different semantic elements', () => {
    const { rerender } = render(<GridItem as="article">Article content</GridItem>);
    expect(screen.getByRole('article')).toBeInTheDocument();

    rerender(<GridItem as="section">Section content</GridItem>);
    expect(screen.getByRole('region')).toBeInTheDocument();

    rerender(<GridItem as="aside">Aside content</GridItem>);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('applies grid span correctly', () => {
    render(<GridItem span={2}>Spans 2 columns</GridItem>);
    expect(screen.getByText('Spans 2 columns')).toHaveStyle('grid-column: span 2');
  });

  it('applies grid start and end correctly', () => {
    render(<GridItem start={2} end={4}>From 2 to 4</GridItem>);
    const item = screen.getByText('From 2 to 4');
    expect(item).toHaveStyle('grid-column-start: 2');
    expect(item).toHaveStyle('grid-column-end: 4');
  });

  it('applies custom className', () => {
    render(<GridItem className="custom-class">Test</GridItem>);
    expect(screen.getByText('Test')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<GridItem ref={ref}>Test</GridItem>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has proper accessibility attributes', () => {
    render(<GridItem as="article" aria-labelledby="item-title">Test</GridItem>);
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-labelledby', 'item-title');
  });
});
