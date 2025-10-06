import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Grid, GridItem } from '@/components/ui/grid';
import { Section } from '@/components/ui/section';
import { render, screen } from '@testing-library/react';

describe('Accessibility Landmarks', () => {
  it('Container provides proper landmark roles', () => {
    const { rerender } = render(<Container as="main">Main content</Container>);
    expect(screen.getByRole('main')).toBeInTheDocument();

    rerender(<Container as="section">Section content</Container>);
    expect(screen.getByRole('region')).toBeInTheDocument();

    rerender(<Container as="article">Article content</Container>);
    expect(screen.getByRole('article')).toBeInTheDocument();

    rerender(<Container as="header">Header content</Container>);
    expect(screen.getByRole('banner')).toBeInTheDocument();

    rerender(<Container as="footer">Footer content</Container>);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    rerender(<Container as="nav">Navigation content</Container>);
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    rerender(<Container as="aside">Aside content</Container>);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('Section provides proper landmark roles', () => {
    const { rerender } = render(<Section as="main">Main content</Section>);
    expect(screen.getByRole('main')).toBeInTheDocument();

    rerender(<Section as="article">Article content</Section>);
    expect(screen.getByRole('article')).toBeInTheDocument();

    rerender(<Section as="header">Header content</Section>);
    expect(screen.getByRole('banner')).toBeInTheDocument();

    rerender(<Section as="footer">Footer content</Section>);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    rerender(<Section as="nav">Navigation content</Section>);
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    rerender(<Section as="aside">Aside content</Section>);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('Grid provides proper landmark roles', () => {
    const { rerender } = render(<Grid as="main">Main content</Grid>);
    expect(screen.getByRole('main')).toBeInTheDocument();

    rerender(<Grid as="section">Section content</Grid>);
    expect(screen.getByRole('region')).toBeInTheDocument();

    rerender(<Grid as="article">Article content</Grid>);
    expect(screen.getByRole('article')).toBeInTheDocument();

    rerender(<Grid as="nav">Navigation content</Grid>);
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    rerender(<Grid as="aside">Aside content</Grid>);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('GridItem provides proper landmark roles', () => {
    const { rerender } = render(<GridItem as="article">Article content</GridItem>);
    expect(screen.getByRole('article')).toBeInTheDocument();

    rerender(<GridItem as="section">Section content</GridItem>);
    expect(screen.getByRole('region')).toBeInTheDocument();

    rerender(<GridItem as="aside">Aside content</GridItem>);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });
});

describe('ARIA Attributes', () => {
  it('Container supports ARIA attributes', () => {
    render(
      <Container 
        as="main" 
        aria-label="Main content area"
        aria-describedby="main-description"
      >
        Main content
      </Container>
    );
    
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('aria-label', 'Main content area');
    expect(main).toHaveAttribute('aria-describedby', 'main-description');
  });

  it('Section supports ARIA attributes', () => {
    render(
      <Section 
        aria-labelledby="section-title"
        aria-describedby="section-description"
      >
        Section content
      </Section>
    );
    
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('aria-labelledby', 'section-title');
    expect(section).toHaveAttribute('aria-describedby', 'section-description');
  });

  it('Grid supports ARIA attributes', () => {
    render(
      <Grid 
        as="main"
        aria-label="Product grid"
        aria-describedby="grid-description"
        role="grid"
      >
        Grid content
      </Grid>
    );
    
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('aria-label', 'Product grid');
    expect(main).toHaveAttribute('aria-describedby', 'grid-description');
  });

  it('GridItem supports ARIA attributes', () => {
    render(
      <GridItem 
        as="article"
        aria-labelledby="item-title"
        aria-describedby="item-description"
      >
        Item content
      </GridItem>
    );
    
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-labelledby', 'item-title');
    expect(article).toHaveAttribute('aria-describedby', 'item-description');
  });

  it('Eyebrow supports ARIA attributes', () => {
    render(
      <Eyebrow 
        as="label"
        htmlFor="input-field"
        aria-describedby="eyebrow-description"
      >
        Category label
      </Eyebrow>
    );
    
    const label = screen.getByText('Category label');
    expect(label).toHaveAttribute('for', 'input-field');
    expect(label).toHaveAttribute('aria-describedby', 'eyebrow-description');
  });
});

describe('Semantic HTML Structure', () => {
  it('creates proper document structure', () => {
    render(
      <Container as="main">
        <Section as="header">
          <Eyebrow>Featured</Eyebrow>
          <h1>Main Title</h1>
        </Section>
        <Section>
          <Grid as="section">
            <GridItem as="article">
              <h2>Item 1</h2>
            </GridItem>
            <GridItem as="article">
              <h2>Item 2</h2>
            </GridItem>
          </Grid>
        </Section>
        <Section as="footer">
          <p>Footer content</p>
        </Section>
      </Container>
    );

    // Check that proper landmark structure is created
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    
    // Check that articles are properly nested
    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(2);
  });

  it('maintains proper heading hierarchy', () => {
    render(
      <Section>
        <Eyebrow>Category</Eyebrow>
        <h1>Main Heading</h1>
        <Grid>
          <GridItem>
            <h2>Sub Heading 1</h2>
          </GridItem>
          <GridItem>
            <h2>Sub Heading 2</h2>
          </GridItem>
        </Grid>
      </Section>
    );

    const h1 = screen.getByRole('heading', { level: 1 });
    const h2s = screen.getAllByRole('heading', { level: 2 });
    
    expect(h1).toHaveTextContent('Main Heading');
    expect(h2s).toHaveLength(2);
    expect(h2s[0]).toHaveTextContent('Sub Heading 1');
    expect(h2s[1]).toHaveTextContent('Sub Heading 2');
  });
});

describe('Color Contrast and Visual Accessibility', () => {
  it('Eyebrow uses high contrast gold accent color', () => {
    render(<Eyebrow variant="accent">High contrast text</Eyebrow>);
    const eyebrow = screen.getByText('High contrast text');
    expect(eyebrow).toHaveClass('text-[#C59B2A]'); // Gold accent color
  });

  it('Section variants provide proper contrast', () => {
    const { rerender } = render(<Section background="primary">Primary background</Section>);
    expect(screen.getByRole('region')).toHaveClass('bg-primary', 'text-primary-foreground');

    rerender(<Section background="secondary">Secondary background</Section>);
    expect(screen.getByRole('region')).toHaveClass('bg-secondary', 'text-secondary-foreground');

    rerender(<Section background="accent">Accent background</Section>);
    expect(screen.getByRole('region')).toHaveClass('bg-accent', 'text-accent-foreground');
  });
});

describe('Keyboard Navigation', () => {
  it('components are focusable when appropriate', () => {
    render(
      <Container as="main" tabIndex={0}>
        <Section>
          <Grid>
            <GridItem tabIndex={0}>
              Focusable item
            </GridItem>
          </Grid>
        </Section>
      </Container>
    );

    const main = screen.getByRole('main');
    const item = screen.getByText('Focusable item');
    
    expect(main).toHaveAttribute('tabIndex', '0');
    expect(item).toHaveAttribute('tabIndex', '0');
  });
});
