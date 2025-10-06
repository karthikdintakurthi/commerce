import { Eyebrow } from '@/components/ui/eyebrow';
import { render, screen } from '@testing-library/react';

describe('Eyebrow', () => {
  it('renders with default props', () => {
    render(<Eyebrow>Test content</Eyebrow>);
    
    const eyebrow = screen.getByText('Test content');
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow).toHaveClass('block', 'font-medium', 'tracking-wide', 'uppercase');
    expect(eyebrow).toHaveClass('text-sm'); // default md size
    expect(eyebrow).toHaveClass('text-[#C59B2A]'); // default accent variant
  });

  it('renders with different semantic elements', () => {
    const { rerender } = render(<Eyebrow as="div">Div content</Eyebrow>);
    expect(screen.getByText('Div content')).toBeInTheDocument();

    rerender(<Eyebrow as="p">Paragraph content</Eyebrow>);
    expect(screen.getByText('Paragraph content')).toBeInTheDocument();

    rerender(<Eyebrow as="label">Label content</Eyebrow>);
    expect(screen.getByText('Label content')).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Eyebrow size="sm">Small</Eyebrow>);
    expect(screen.getByText('Small')).toHaveClass('text-xs');

    rerender(<Eyebrow size="md">Medium</Eyebrow>);
    expect(screen.getByText('Medium')).toHaveClass('text-sm');

    rerender(<Eyebrow size="lg">Large</Eyebrow>);
    expect(screen.getByText('Large')).toHaveClass('text-base');
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Eyebrow variant="default">Default</Eyebrow>);
    expect(screen.getByText('Default')).toHaveClass('text-foreground');

    rerender(<Eyebrow variant="accent">Accent</Eyebrow>);
    expect(screen.getByText('Accent')).toHaveClass('text-[#C59B2A]', 'font-medium', 'tracking-wide', 'uppercase');

    rerender(<Eyebrow variant="muted">Muted</Eyebrow>);
    expect(screen.getByText('Muted')).toHaveClass('text-muted-foreground');

    rerender(<Eyebrow variant="destructive">Destructive</Eyebrow>);
    expect(screen.getByText('Destructive')).toHaveClass('text-destructive');
  });

  it('applies custom className', () => {
    render(<Eyebrow className="custom-class">Test</Eyebrow>);
    expect(screen.getByText('Test')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Eyebrow ref={ref}>Test</Eyebrow>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('has proper accessibility attributes', () => {
    render(<Eyebrow as="label" htmlFor="input-id">Label text</Eyebrow>);
    const label = screen.getByText('Label text');
    expect(label).toHaveAttribute('for', 'input-id');
  });

  it('maintains semantic meaning for screen readers', () => {
    render(<Eyebrow>Category Label</Eyebrow>);
    const eyebrow = screen.getByText('Category Label');
    expect(eyebrow).toBeInTheDocument();
    // The text should be accessible to screen readers
    expect(eyebrow).toHaveTextContent('Category Label');
  });
});
