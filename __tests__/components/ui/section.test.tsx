import { Section } from '@/components/ui/section';
import { render, screen } from '@testing-library/react';

describe('Section', () => {
  it('renders with default props', () => {
    render(<Section>Test content</Section>);
    
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('w-full', 'py-12'); // default md size
  });

  it('renders with different semantic elements', () => {
    const { rerender } = render(<Section as="article">Article content</Section>);
    expect(screen.getByRole('article')).toBeInTheDocument();

    rerender(<Section as="main">Main content</Section>);
    expect(screen.getByRole('main')).toBeInTheDocument();

    rerender(<Section as="header">Header content</Section>);
    expect(screen.getByRole('banner')).toBeInTheDocument();

    rerender(<Section as="footer">Footer content</Section>);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    rerender(<Section as="nav">Nav content</Section>);
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    rerender(<Section as="aside">Aside content</Section>);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Section size="sm">Small</Section>);
    expect(screen.getByRole('region')).toHaveClass('py-8');

    rerender(<Section size="md">Medium</Section>);
    expect(screen.getByRole('region')).toHaveClass('py-12');

    rerender(<Section size="lg">Large</Section>);
    expect(screen.getByRole('region')).toHaveClass('py-16');

    rerender(<Section size="xl">Extra Large</Section>);
    expect(screen.getByRole('region')).toHaveClass('py-20');

    rerender(<Section size="full">Full</Section>);
    expect(screen.getByRole('region')).toHaveClass('py-24');
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Section variant="hero">Hero</Section>);
    expect(screen.getByRole('region')).toHaveClass('min-h-[60vh]', 'flex', 'items-center');

    rerender(<Section variant="feature">Feature</Section>);
    expect(screen.getByRole('region')).toHaveClass('py-16');

    rerender(<Section variant="testimonial">Testimonial</Section>);
    expect(screen.getByRole('region')).toHaveClass('py-16', 'bg-muted/30');

    rerender(<Section variant="cta">CTA</Section>);
    expect(screen.getByRole('region')).toHaveClass('py-16', 'bg-primary', 'text-primary-foreground');

    rerender(<Section variant="footer">Footer</Section>);
    expect(screen.getByRole('region')).toHaveClass('py-8', 'border-t');
  });

  it('applies background classes', () => {
    const { rerender } = render(<Section background="muted">Muted</Section>);
    expect(screen.getByRole('region')).toHaveClass('bg-muted');

    rerender(<Section background="primary">Primary</Section>);
    expect(screen.getByRole('region')).toHaveClass('bg-primary', 'text-primary-foreground');

    rerender(<Section background="secondary">Secondary</Section>);
    expect(screen.getByRole('region')).toHaveClass('bg-secondary', 'text-secondary-foreground');

    rerender(<Section background="accent">Accent</Section>);
    expect(screen.getByRole('region')).toHaveClass('bg-accent', 'text-accent-foreground');

    rerender(<Section background="gradient">Gradient</Section>);
    expect(screen.getByRole('region')).toHaveClass('bg-gradient-to-br');
  });

  it('applies divider classes correctly', () => {
    const { rerender } = render(<Section showDivider dividerPosition="top">Top</Section>);
    expect(screen.getByRole('region')).toHaveClass('border-t', 'border-border');

    rerender(<Section showDivider dividerPosition="bottom">Bottom</Section>);
    expect(screen.getByRole('region')).toHaveClass('border-b', 'border-border');

    rerender(<Section showDivider dividerPosition="both">Both</Section>);
    expect(screen.getByRole('region')).toHaveClass('border-t', 'border-b', 'border-border');

    rerender(<Section showDivider={false}>No Divider</Section>);
    expect(screen.getByRole('region')).not.toHaveClass('border-t', 'border-b');
  });

  it('applies custom className', () => {
    render(<Section className="custom-class">Test</Section>);
    expect(screen.getByRole('region')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Section ref={ref}>Test</Section>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('has proper accessibility attributes', () => {
    render(<Section aria-labelledby="section-title">Test</Section>);
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('aria-labelledby', 'section-title');
  });
});
