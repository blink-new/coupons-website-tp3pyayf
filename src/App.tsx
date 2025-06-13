import { useState } from 'react'
import { Search, Percent, Sparkles, ShoppingBag, Copy, Check, Star, Tag, TrendingUp } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs'
import { motion } from 'framer-motion'

// Mock data for coupons
const featuredCoupons = [
  {
    id: 1,
    brand: 'Amazon',
    title: '30% Off Electronics',
    code: 'SAVE30TECH',
    description: 'Get 30% off on all electronics including phones, laptops, and accessories',
    discount: 30,
    type: 'percentage',
    category: 'Electronics',
    expiresIn: '2 days',
    rating: 4.8,
    uses: 1245,
    verified: true
  },
  {
    id: 2,
    brand: 'Nike',
    title: 'Free Shipping + 25% Off',
    code: 'NIKESAVE25',
    description: 'Free shipping on all orders plus 25% off athletic wear and shoes',
    discount: 25,
    type: 'percentage',
    category: 'Fashion',
    expiresIn: '5 days',
    rating: 4.9,
    uses: 892,
    verified: true
  },
  {
    id: 3,
    brand: 'Spotify',
    title: '3 Months Premium Free',
    code: 'MUSIC3FREE',
    description: 'Get 3 months of Spotify Premium completely free for new users',
    discount: 0,
    type: 'free',
    category: 'Entertainment',
    expiresIn: '10 days',
    rating: 4.7,
    uses: 567,
    verified: true
  },
  {
    id: 4,
    brand: 'Uber Eats',
    title: '$20 Off First Order',
    code: 'WELCOME20',
    description: 'Save $20 on your first food delivery order, minimum $25 purchase',
    discount: 20,
    type: 'fixed',
    category: 'Food',
    expiresIn: '1 day',
    rating: 4.6,
    uses: 2341,
    verified: true
  }
]

const categories = [
  { name: 'All', icon: TrendingUp, count: 156 },
  { name: 'Electronics', icon: ShoppingBag, count: 42 },
  { name: 'Fashion', icon: Sparkles, count: 38 },
  { name: 'Food', icon: Tag, count: 29 },
  { name: 'Entertainment', icon: Star, count: 25 },
  { name: 'Travel', icon: Percent, count: 22 }
]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [copiedCodes, setCopiedCodes] = useState<Set<string>>(new Set())

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCodes(prev => new Set([...prev, code]))
    setTimeout(() => {
      setCopiedCodes(prev => {
        const newSet = new Set(prev)
        newSet.delete(code)
        return newSet
      })
    }, 2000)
  }

  const filteredCoupons = featuredCoupons.filter(coupon => {
    const matchesSearch = coupon.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coupon.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || coupon.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-blue-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl">
                <Percent className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                WordPass
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Categories</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Trending</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">About</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Amazing{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Deals & Coupons
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover thousands of verified coupon codes and deals from your favorite brands. 
              Save money on everything from electronics to fashion, food, and more.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for brands, products, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-white/60 backdrop-blur-sm rounded-2xl p-1">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.name}
                    value={category.name}
                    className="flex items-center space-x-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                  >
                    <category.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {category.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Coupons Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-gray-900">
                {selectedCategory === 'All' ? 'Featured Deals' : `${selectedCategory} Deals`}
              </h3>
              <Badge variant="outline" className="text-sm">
                {filteredCoupons.length} deals found
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {filteredCoupons.map((coupon, index) => (
                <motion.div
                  key={coupon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <CardTitle className="text-2xl font-bold text-gray-900">
                              {coupon.brand}
                            </CardTitle>
                            {coupon.verified && (
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                ✓ Verified
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-lg font-semibold text-purple-600">
                            {coupon.title}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            {coupon.type === 'percentage' ? `${coupon.discount}%` : 
                             coupon.type === 'fixed' ? `$${coupon.discount}` : 'FREE'}
                          </div>
                          <div className="text-sm text-gray-500">OFF</div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">{coupon.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{coupon.rating}</span>
                        </div>
                        <div>{coupon.uses} uses</div>
                        <div>Expires in {coupon.expiresIn}</div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-gray-100 rounded-lg p-3 font-mono text-lg font-semibold text-center tracking-wider">
                          {coupon.code}
                        </div>
                        <Button
                          onClick={() => copyToClipboard(coupon.code)}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6"
                        >
                          {copiedCodes.has(coupon.code) ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      <Badge variant="outline" className="w-full justify-center py-2">
                        {coupon.category}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl">
                  <Percent className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  CouponHub
                </h3>
              </div>
              <p className="text-gray-600">
                Your trusted source for verified coupon codes and amazing deals from top brands.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-purple-600 transition-colors">Electronics</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Fashion</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Food & Dining</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Travel</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-purple-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Submit a Coupon</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Report Issues</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-purple-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 WordPass. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App