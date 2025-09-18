'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Package, Heart, CreditCard, Settings, LogOut, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AccountPage = () => {
  // Mock user data - in a real app this would come from authentication
  const user = {
    name: 'Alexandra Sterling',
    email: 'alexandra@example.com',
    avatar: '',
    joinDate: 'March 2023',
    vipStatus: 'Gold',
    totalSpent: 8750,
  };

  const recentOrders = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 1890,
      items: 2,
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-08',
      status: 'Shipped',
      total: 3200,
      items: 3,
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-02',
      status: 'Processing',
      total: 750,
      items: 1,
    },
  ];

  const wishlistItems = [
    {
      id: '1',
      name: 'SILK EVENING GOWN',
      price: 2400,
      image: '/placeholder.svg',
      inStock: true,
    },
    {
      id: '2',
      name: 'CASHMERE COAT',
      price: 1800,
      image: '/placeholder.svg',
      inStock: false,
    },
  ];

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl text-foreground mb-4">
              My Account
            </h1>
            <p className="text-muted-foreground">
              Manage your profile, orders, and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Profile Card */}
          <Card className="mb-12 luxury-shadow">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-lg bg-luxe-gold text-luxe-black">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <h2 className="font-heading text-2xl">{user.name}</h2>
                    <Badge className="bg-luxe-gold text-luxe-black w-fit">
                      VIP {user.vipStatus}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                    <span>Member since {user.joinDate}</span>
                    <span>·</span>
                    <span>Lifetime spent: {formatPrice(user.totalSpent)}</span>
                  </div>
                </div>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Wishlist
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Card className="luxury-shadow">
                <CardHeader>
                  <CardTitle className="font-heading">Recent Orders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{order.id}</span>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString()} · {order.items} items
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(order.total)}</p>
                        <Button variant="ghost" size="sm" className="text-luxe-gold hover:text-luxe-gold">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center pt-4">
                    <Button variant="outline" asChild>
                      <Link href="/account/orders">
                        View All Orders
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="space-y-6">
              <Card className="luxury-shadow">
                <CardHeader>
                  <CardTitle className="font-heading">Your Wishlist</CardTitle>
                </CardHeader>
                <CardContent>
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-heading text-lg mb-2">Your wishlist is empty</h3>
                      <p className="text-muted-foreground mb-6">
                        Save items you love to purchase later
                      </p>
                      <Button asChild>
                        <Link href="/collections">
                          Explore Collections
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
                          <div className="w-20 h-24 bg-muted rounded overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="font-heading text-lg">{formatPrice(item.price)}</p>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                disabled={!item.inStock}
                                className="flex-1"
                              >
                                {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                              </Button>
                              <Button variant="ghost" size="sm">
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="luxury-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <p className="text-muted-foreground">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      Edit Information
                    </Button>
                  </CardContent>
                </Card>

                <Card className="luxury-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading">Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-muted-foreground">123 Fashion Avenue</p>
                      <p className="text-muted-foreground">New York, NY 10001</p>
                      <p className="text-muted-foreground">United States</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      Edit Address
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="luxury-shadow">
                <CardHeader>
                  <CardTitle className="font-heading">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about orders and new arrivals
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Privacy Settings</h4>
                        <p className="text-sm text-muted-foreground">
                          Control your data and privacy preferences
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Change Password</h4>
                        <p className="text-sm text-muted-foreground">
                          Update your account password
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-destructive">Delete Account</h4>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and data
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <Button className="w-full" variant="outline">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;