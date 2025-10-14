// src/components/FilterSidebar.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card-Temp';
import { Checkbox } from '@/components/ui/Checkbox-Temp';
import { Slider } from '@/components/ui/Slider-Temp';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select-Temp';

export default function FilterSidebar({ filters, onFilterChange }) {
  const categories = ['Bakery', 'Dairy & Eggs', 'Fruits & Vegetables', 'Packaged Goods'];

  // ✨ FIX: Add a check to ensure filters prop is available before rendering
  if (!filters) {
    return <div>Loading filters...</div>; // Or return null
  }

  return (
    <div className="space-y-6 sticky top-8">
      {/* Categories Filter */}
      <Card>
        <CardHeader><CardTitle>Category</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={category} 
                // ✨ FIX: Ensure filters.categories is an array before calling .includes()
                checked={Array.isArray(filters.categories) && filters.categories.includes(category)}
                onCheckedChange={(checked) => onFilterChange('categories', category, checked)}
              />
              <label htmlFor={category} className="text-sm font-medium">{category}</label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Distance Filter */}
      <Card>
        <CardHeader><CardTitle>Distance</CardTitle></CardHeader>
        <CardContent>
          <Slider 
            value={[filters.distance || 10]} // Provide a fallback value
            max={10} 
            step={1} 
            onValueChange={(value) => onFilterChange('distance', value[0])}
          />
          <p className="text-center text-sm font-medium mt-2">Within {filters.distance || 10} km</p>
        </CardContent>
      </Card>

      {/* Sort By Dropdown */}
      <Card>
        <CardHeader><CardTitle>Sort By</CardTitle></CardHeader>
        <CardContent>
          <Select value={filters.sortBy} onValueChange={(value) => onFilterChange('sortBy', value)}>
            <SelectTrigger><SelectValue placeholder="Expiry Date (Soonest)" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="expiry_soonest">Expiry Date (Soonest)</SelectItem>
              <SelectItem value="price_low_high">Price (Low to High)</SelectItem>
              <SelectItem value="price_high_low">Price (High to Low)</SelectItem>
              <SelectItem value="distance_closest">Distance (Closest)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
}