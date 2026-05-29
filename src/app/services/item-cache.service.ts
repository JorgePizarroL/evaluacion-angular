import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemCacheService {

  save(item: Post): void {
    try {
      const key = `item-cache-${item.id}`;
      localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }

  getById(id: number | string): Post | null {
    try {
      const key = `item-cache-${id}`;
      const data = localStorage.getItem(key);
      if (!data) return null;
      return JSON.parse(data) as Post;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  }
}
