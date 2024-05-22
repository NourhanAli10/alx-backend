#!/usr/bin/python3
""" LFU caching module """

from base_caching import BaseCaching
from collections import defaultdict


class LFUCache(BaseCaching):
    """ LFUCache defines a LFU caching system """

    def __init__(self):
        """ Initialize the class """
        super().__init__()
        self.frequency = defaultdict(int)
        self.usage_order = []

    def put(self, key, item):
        """ Add an item in the cache """
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.cache_data[key] = item
            self.frequency[key] += 1
            self.usage_order.remove(key)
        else:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                self.discard_least_frequently_used()

            self.cache_data[key] = item
            self.frequency[key] = 1

        self.usage_order.append(key)

    def get(self, key):
        """ Get an item by key """
        if key is None or key not in self.cache_data:
            return None

        self.frequency[key] += 1
        self.usage_order.remove(key)
        self.usage_order.append(key)
        return self.cache_data[key]

    def discard_least_frequently_used(self):
        """ Discard the least frequently used item """
        if not self.cache_data:
            return

        min_freq = min(self.frequency.values())

        candidates = [key for key, freq in self.frequency.items()
                      if freq == min_freq]

        if candidates:
            key_to_discard = None
            for key in self.usage_order:
                if key in candidates:
                    key_to_discard = key
                    break

            if key_to_discard:
                del self.cache_data[key_to_discard]
                del self.frequency[key_to_discard]
                self.usage_order.remove(key_to_discard)
                print(f"DISCARD: {key_to_discard}")
