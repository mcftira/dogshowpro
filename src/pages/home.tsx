import { Link, useNavigate } from 'react-router-dom';
import { Trophy, Calendar, Users, Award, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen">
      <header className="bg-background/80 backdrop-blur-sm border-b relative z-10">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">DogShow Pro</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/shop">
                <Button variant="ghost" className="gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Shop
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/auth/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative py-20 px-4 bg-gradient-to-b from-background via-background/90 to-background">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Ultimate Dog Competition Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Organize, participate, and celebrate in dog competitions with our comprehensive platform designed for handlers, judges, and organizers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/competitions">
                <Button size="lg" className="gap-2">
                  <Calendar className="h-5 w-5" />
                  Browse Competitions
                </Button>
              </Link>
              <Link to="/organize">
                <Button size="lg" variant="outline" className="gap-2">
                  <Trophy className="h-5 w-5" />
                  Organize Competition
                </Button>
              </Link>
              <Link to="/shop">
                <Button size="lg" variant="outline" className="gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Browse Equipment
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
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

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Professional Equipment</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get all the equipment you need for your competitions. From agility courses to timing systems,
                we offer professional-grade equipment for every type of dog competition.
              </p>
            </div>
            <div className="flex justify-center">
              <Link to="/shop">
                <Button size="lg" className="gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Visit Our Shop
                </Button>
              </Link>
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
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                <li><Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link to="/guides" className="text-muted-foreground hover:text-foreground">Guides</Link></li>
                <li><Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                <li><Link to="/gdpr" className="text-muted-foreground hover:text-foreground">GDPR</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="https://twitter.com/dogshowpro" className="text-muted-foreground hover:text-foreground">Twitter</a></li>
                <li><a href="https://facebook.com/dogshowpro" className="text-muted-foreground hover:text-foreground">Facebook</a></li>
                <li><a href="https://instagram.com/dogshowpro" className="text-muted-foreground hover:text-foreground">Instagram</a></li>
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