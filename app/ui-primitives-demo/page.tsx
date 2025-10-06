'use client';

import { Container, Eyebrow, Grid, GridItem, Section } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UIPrimitivesDemo() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Section variant="hero" background="gradient" className="text-center">
        <Container>
          <Eyebrow variant="accent" size="lg" className="mb-4">
            UI Primitives Demo
          </Eyebrow>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Layout Components
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Semantic HTML components with accessibility landmarks and motion-safe animations.
          </p>
        </Container>
      </Section>

      {/* Container Demo */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <Eyebrow variant="accent" className="mb-4">
              Container
            </Eyebrow>
            <h2 className="text-3xl font-bold mb-4">Responsive Containers</h2>
            <p className="text-muted-foreground">
              Max-width containers with responsive side padding
            </p>
          </div>

          <Grid columns={3} gap="lg">
            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Small Container</CardTitle>
                  <CardDescription>max-w-2xl</CardDescription>
                </CardHeader>
                <CardContent>
                  <Container size="sm" className="bg-muted p-4 rounded">
                    <p className="text-sm">Small container content</p>
                  </Container>
                </CardContent>
              </Card>
            </GridItem>

            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Medium Container</CardTitle>
                  <CardDescription>max-w-4xl</CardDescription>
                </CardHeader>
                <CardContent>
                  <Container size="md" className="bg-muted p-4 rounded">
                    <p className="text-sm">Medium container content</p>
                  </Container>
                </CardContent>
              </Card>
            </GridItem>

            <GridItem>
              <Card>
                <CardHeader>
                  <CardTitle>Large Container</CardTitle>
                  <CardDescription>max-w-[1200px]</CardDescription>
                </CardHeader>
                <CardContent>
                  <Container size="lg" className="bg-muted p-4 rounded">
                    <p className="text-sm">Large container content</p>
                  </Container>
                </CardContent>
              </Card>
            </GridItem>
          </Grid>
        </Container>
      </Section>

      {/* Section Demo */}
      <Section background="muted" showDivider>
        <Container>
          <div className="text-center mb-12">
            <Eyebrow variant="accent" className="mb-4">
              Section
            </Eyebrow>
            <h2 className="text-3xl font-bold mb-4">Semantic Sections</h2>
            <p className="text-muted-foreground">
              Semantic HTML sections with optional dividers and backgrounds
            </p>
          </div>

          <Grid columns="auto-fit" minItemWidth="300px" gap="md">
            <GridItem>
              <Section variant="default" className="bg-background p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-2">Default Section</h3>
                <p className="text-muted-foreground">Standard section with default styling</p>
              </Section>
            </GridItem>

            <GridItem>
              <Section variant="feature" className="bg-background p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-2">Feature Section</h3>
                <p className="text-muted-foreground">Feature section with enhanced padding</p>
              </Section>
            </GridItem>

            <GridItem>
              <Section variant="cta" className="p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">CTA Section</h3>
                <p className="opacity-90">Call-to-action section with primary background</p>
              </Section>
            </GridItem>
          </Grid>
        </Container>
      </Section>

      {/* Grid Demo */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <Eyebrow variant="accent" className="mb-4">
              Grid
            </Eyebrow>
            <h2 className="text-3xl font-bold mb-4">Responsive Grid</h2>
            <p className="text-muted-foreground">
              Auto-fit responsive grid with semantic HTML
            </p>
          </div>

          <Grid columns="auto-fit" minItemWidth="250px" gap="md" className="mb-8">
            {Array.from({ length: 6 }, (_, i) => (
              <GridItem key={i}>
                <Card>
                  <CardHeader>
                    <CardTitle>Card {i + 1}</CardTitle>
                    <CardDescription>Auto-fit grid item</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      This card automatically fits the available space
                    </p>
                  </CardContent>
                </Card>
              </GridItem>
            ))}
          </Grid>

          <Grid columns={4} gap="lg">
            {Array.from({ length: 4 }, (_, i) => (
              <GridItem key={i}>
                <Card>
                  <CardHeader>
                    <CardTitle>Fixed {i + 1}</CardTitle>
                    <CardDescription>4-column grid</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Fixed 4-column layout
                    </p>
                  </CardContent>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Eyebrow Demo */}
      <Section background="muted">
        <Container>
          <div className="text-center mb-12">
            <Eyebrow variant="accent" className="mb-4">
              Eyebrow
            </Eyebrow>
            <h2 className="text-3xl font-bold mb-4">Eyebrow Labels</h2>
            <p className="text-muted-foreground">
              Overline labels using Gold Accent color
            </p>
          </div>

          <Grid columns={3} gap="lg">
            <GridItem>
              <div className="text-center">
                <Eyebrow variant="accent" size="sm" className="mb-2">
                  Small Accent
                </Eyebrow>
                <h3 className="text-xl font-semibold">Heading</h3>
                <p className="text-muted-foreground">Small accent eyebrow</p>
              </div>
            </GridItem>

            <GridItem>
              <div className="text-center">
                <Eyebrow variant="accent" size="md" className="mb-2">
                  Medium Accent
                </Eyebrow>
                <h3 className="text-xl font-semibold">Heading</h3>
                <p className="text-muted-foreground">Medium accent eyebrow</p>
              </div>
            </GridItem>

            <GridItem>
              <div className="text-center">
                <Eyebrow variant="accent" size="lg" className="mb-2">
                  Large Accent
                </Eyebrow>
                <h3 className="text-xl font-semibold">Heading</h3>
                <p className="text-muted-foreground">Large accent eyebrow</p>
              </div>
            </GridItem>
          </Grid>

          <div className="mt-12 text-center">
            <Eyebrow variant="muted" className="mb-2">
              Other Variants
            </Eyebrow>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <Eyebrow variant="default" className="mb-2">Default</Eyebrow>
                <p className="text-sm text-muted-foreground">Default variant</p>
              </div>
              <div className="text-center">
                <Eyebrow variant="muted" className="mb-2">Muted</Eyebrow>
                <p className="text-sm text-muted-foreground">Muted variant</p>
              </div>
              <div className="text-center">
                <Eyebrow variant="destructive" className="mb-2">Destructive</Eyebrow>
                <p className="text-sm text-muted-foreground">Destructive variant</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Accessibility Demo */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <Eyebrow variant="accent" className="mb-4">
              Accessibility
            </Eyebrow>
            <h2 className="text-3xl font-bold mb-4">Semantic HTML & ARIA</h2>
            <p className="text-muted-foreground">
              All components use semantic HTML and proper ARIA landmarks
            </p>
          </div>

          <Grid columns="auto-fit" minItemWidth="300px" gap="lg">
            <GridItem as="article">
              <Card>
                <CardHeader>
                  <CardTitle>Landmark Roles</CardTitle>
                  <CardDescription>Semantic HTML elements</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• <code>main</code> - Main content area</li>
                    <li>• <code>section</code> - Document sections</li>
                    <li>• <code>article</code> - Self-contained content</li>
                    <li>• <code>nav</code> - Navigation areas</li>
                    <li>• <code>aside</code> - Complementary content</li>
                  </ul>
                </CardContent>
              </Card>
            </GridItem>

            <GridItem as="article">
              <Card>
                <CardHeader>
                  <CardTitle>ARIA Support</CardTitle>
                  <CardDescription>Accessibility attributes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• <code>aria-label</code> - Accessible names</li>
                    <li>• <code>aria-labelledby</code> - Label references</li>
                    <li>• <code>aria-describedby</code> - Descriptions</li>
                    <li>• <code>role</code> - Explicit roles</li>
                    <li>• <code>tabIndex</code> - Focus management</li>
                  </ul>
                </CardContent>
              </Card>
            </GridItem>

            <GridItem as="article">
              <Card>
                <CardHeader>
                  <CardTitle>Motion Safety</CardTitle>
                  <CardDescription>Respects user preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• <code>prefers-reduced-motion</code></li>
                    <li>• Reduced animation duration</li>
                    <li>• Zero layout shift</li>
                    <li>• GPU-accelerated properties</li>
                    <li>• Custom easing curves</li>
                  </ul>
                </CardContent>
              </Card>
            </GridItem>
          </Grid>
        </Container>
      </Section>

      {/* Completion Section */}
      <Section>
        <Container>
          <div className="text-center">
            <Eyebrow variant="accent" className="mb-4">
              Complete
            </Eyebrow>
            <h2 className="text-2xl font-bold mb-4">UI Primitives Ready</h2>
            <p className="text-muted-foreground mb-6">
              All components include semantic HTML, accessibility landmarks, and motion-safe animations.
            </p>
            <Button>Get Started</Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
