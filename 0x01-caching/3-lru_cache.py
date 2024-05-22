#!/usr/bin/python3
""" LRU caching module """

from base_caching import BaseCaching
from collections import OrderedDict


class LRUCache(BaseCaching):
    """ LRUCache defines a LRU caching system """

    def __init__(self):
        """ Initialize the class """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """ Add an item in the cache """
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.cache_data.move_to_end(key)
        else:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                first_key = next(iter(self.cache_data))
                del self.cache_data[first_key]
                print(f"DISCARD: {first_key}")

        self.cache_data[key] = item
        self.cache_data.move_to_end(key)

    def get(self, key):
        """ Get an item by key """
        if key is None or key not in self.cache_data:
            return None

        self.cache_data.move_to_end(key)
        return self.cache_data[key]
