// src/services/podcastService.ts

 
import authService from './authServices';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';


export interface Podcast {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  video_url?: string;
  audio_url?: string;
  duration?: number;
  views?: number;
  category?: Category;
  guests?: Guest[];
  created_at: string;
  is_saved?: boolean;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  thumbnail?: string;
}

export interface Guest {
  id: number;
  name: string;
  bio?: string;
  profile_picture?: string;
}

export interface UserFeed {
  recommended: Podcast[];
  continue_watching: Array<Podcast & { progress: number }>;
  categories: Category[];
}

class PodcastService {
  // Get all podcasts (public)
  async getAllPodcasts(): Promise<Podcast[]> {
    const response = await fetch(`${API_BASE_URL}/podcasts/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch podcasts');
    }

    const data = await response.json();
    return data.results || data;
  }

  // Get single podcast details
  async getPodcast(podcastId: number): Promise<Podcast> {
    const response = await fetch(`${API_BASE_URL}/podcasts/${podcastId}/`, {
      method: 'GET',
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch podcast');
    }

    return await response.json();
  }

  // Download/watch podcast
  async downloadPodcast(podcastId: number): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/podcasts/${podcastId}/download/`, {
      method: 'GET',
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to download podcast');
    }

    return await response.blob();
  }

  // Get user feed (homepage recommended content)
  async getUserFeed(): Promise<UserFeed> {
    const response = await fetch(`${API_BASE_URL}/user/`, {
      method: 'GET',
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user feed');
    }

    return await response.json();
  }

  // Get all categories
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json();
    return data.results || data;
  }

  // Get podcasts by category
  async getPodcastsByCategory(categoryId: number): Promise<Podcast[]> {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch category podcasts');
    }

    const data = await response.json();
    return data.podcasts || data.results || data;
  }

  // Get recently viewed podcasts
  async getRecentlyViewed(): Promise<Podcast[]> {
    const response = await fetch(`${API_BASE_URL}/user/activity/last-viewed/`, {
      method: 'GET',
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recently viewed');
    }

    const data = await response.json();
    return data.results || data;
  }

  // Get saved podcasts
  async getSavedPodcasts(): Promise<Podcast[]> {
    const response = await fetch(`${API_BASE_URL}/user/activity/saved/`, {
      method: 'GET',
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch saved podcasts');
    }

    const data = await response.json();
    return data.results || data;
  }

  // Save a podcast
  async savePodcast(podcastId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/user/activity/save/${podcastId}/`, {
      method: 'POST',
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to save podcast');
    }
  }

  // Remove saved podcast
  async unsavePodcast(podcastId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/user/activity/save/${podcastId}/`, {
      method: 'DELETE',
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to unsave podcast');
    }
  }

  // Get all guests/profiles
  async getProfiles(): Promise<Guest[]> {
    const response = await fetch(`${API_BASE_URL}/profiles/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profiles');
    }

    const data = await response.json();
    return data.results || data;
  }

  // Get single guest/profile
  async getProfile(profileId: number): Promise<Guest> {
    const response = await fetch(`${API_BASE_URL}/profiles/${profileId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return await response.json();
  }

  // Submit contact form
  async submitContact(data: { name: string; email: string; message: string; type?: string }): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }
  }
}

export default new PodcastService();