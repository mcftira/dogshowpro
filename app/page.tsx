import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trophy, Calendar, Users, Award } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">DogShow Pro</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Ultimate Dog Competition Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Organize, participate, and celebrate in dog competitions with our comprehensive platform designed for handlers, judges, and organizers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/competitions">
                <Button size="lg" className="gap-2">
                  <Calendar className="h-5 w-5" />
                  Browse Competitions
                </Button>
              </Link>
              <Link href="/organize">
                <Button size="lg" variant="outline" className="gap-2">
                  <Trophy className="h-5 w-5" />
                  Organize Competition
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose DogShow Pro?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Calendar className="h-8 w-8" />}
                title="Easy Registration"
                description="Streamlined process for both participants and organizers with automated workflows."
              />
              <FeatureCard
                icon={<Users className="h-8 w-8" />}
                title="Community Driven"
                description="Connect with other dog enthusiasts, share experiences, and grow together."
              />
              <FeatureCard
                icon={<Award className="h-8 w-8" />}
                title="Professional Tools"
                description="Comprehensive suite of tools for organizing and managing competitions."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                <li><Link href="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link href="/guides" className="text-muted-foreground hover:text-foreground">Guides</Link></li>
                <li><Link href="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="/gdpr" className="text-muted-foreground hover:text-foreground">GDPR</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><Link href="https://twitter.com/dogshowpro" className="text-muted-foreground hover:text-foreground">Twitter</Link></li>
                <li><Link href="https://facebook.com/dogshowpro" className="text-muted-foreground hover:text-foreground">Facebook</Link></li>
                <li><Link href="https://instagram.com/dogshowpro" className="text-muted-foreground hover:text-foreground">Instagram</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} DogShow Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-background p-6 rounded-lg shadow-sm">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}