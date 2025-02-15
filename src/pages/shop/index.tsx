import { useState } from 'react';
import { Trophy, ShoppingCart, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const products = [
  {
    id: 1,
    name: 'Professional Agility Tunnel',
    description: 'Competition-grade agility tunnel with secure sandbags. Made from durable, weather-resistant material.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=500',
    category: 'Agility',
  },
  {
    id: 2,
    name: 'Weave Poles Set',
    description: 'Set of 12 professional weave poles with adjustable spacing. Includes carrying case.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=500',
    category: 'Agility',
  },
  {
    id: 3,
    name: 'Competition Timer System',
    description: 'Electronic timing system with wireless sensors and digital display.',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&q=80&w=500',
    category: 'Equipment',
  },
  {
    id: 4,
    name: 'Premium Jump Set',
    description: 'Set of 6 competition-grade jumps with adjustable heights and replaceable poles.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=500',
    category: 'Agility',
  },
  {
    id: 5,
    name: 'Judge\'s Toolkit',
    description: 'Complete set of judging equipment including stopwatch, clipboard, and scoring sheets.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=500',
    category: 'Equipment',
  },
  {
    id: 6,
    name: 'Dog Walk Platform',
    description: 'Professional dog walk with non-slip surface and adjustable height.',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=500',
    category: 'Agility',
  },
  {
    id: 7,
    name: 'Competition Ring Kit',
    description: 'Complete ring setup including poles, rope, and corner flags.',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=500',
    category: 'Equipment',
  },
  {
    id: 8,
    name: 'Teeter-Totter',
    description: 'Competition-grade teeter-totter with adjustable sensitivity.',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?auto=format&fit=crop&q=80&w=500',
    category: 'Agility',
  },
];

const categories = ['All', 'Agility', 'Equipment'];

export default function ShopPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<number[]>([]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">DogShow Pro</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                <span>{cart.length}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Competition Equipment Shop</h1>
            <p className="text-muted-foreground">
              Professional equipment for dog competitions and training.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="flex flex-col">
                <CardHeader>
                  <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${product.price}</span>
                    <span className="text-sm text-muted-foreground">{product.category}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => addToCart(product.id)}
                    disabled={cart.includes(product.id)}
                  >
                    {cart.includes(product.id) ? 'Added to Cart' : 'Add to Cart'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}