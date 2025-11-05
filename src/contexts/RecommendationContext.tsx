import React, { createContext, useContext, ReactNode } from 'react';
import { useApp } from './AppContext';
import { useAuth } from './AuthContext';
import { MenuItem, Order } from '../types';

interface RecommendationContextType {
  getProfileRecommendations: () => MenuItem[];
  getCartRecommendations: (cartItems: MenuItem[]) => MenuItem[];
}

const RecommendationContext = createContext<RecommendationContextType | undefined>(undefined);

export const RecommendationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { menuItems, orders } = useApp();
  const { user } = useAuth();

  const getProfileRecommendations = () => {
    if (!user) return menuItems.slice(0, 5);

    // Prioritize dietary restrictions
    if (user.dietaryRestrictions && user.dietaryRestrictions.length > 0) {
      return menuItems.filter(item =>
        user.dietaryRestrictions.some(restriction => item.cuisine.includes(restriction))
      );
    }

    // Fallback to past orders and ratings
    const userOrders = orders.filter(order => order.userId === user.id);
    if (userOrders.length > 0) {
      const orderedItems = userOrders.flatMap(order => order.items);
      const topRatedItems = menuItems.sort((a, b) => b.averageRating - a.averageRating);
      const recommended = [...orderedItems, ...topRatedItems].slice(0, 5);
      return recommended;
    }

    return menuItems.slice(0, 5);
  };

  const getCartRecommendations = (cartItems: MenuItem[]) => {
    if (cartItems.length === 0) return [];

    const cartItemIds = cartItems.map(item => item.id);
    const otherOrders = orders.filter(order =>
      order.items.some(item => cartItemIds.includes(item.id))
    );

    const recommendedItems = otherOrders
      .flatMap(order => order.items)
      .filter(item => !cartItemIds.includes(item.id))
      .slice(0, 3);

    return recommendedItems;
  };

  return (
    <RecommendationContext.Provider value={{ getProfileRecommendations, getCartRecommendations }}>
      {children}
    </RecommendationContext.Provider>
  );
};

export const useRecommendations = () => {
  const context = useContext(RecommendationContext);
  if (!context) {
    throw new Error('useRecommendations must be used within a RecommendationProvider');
  }
  return context;
};
