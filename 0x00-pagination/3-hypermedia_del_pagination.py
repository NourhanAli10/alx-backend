#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict


def index_range(page, page_size):
    """return a tuple of size two containing a start index and an end index
    corresponding to the range of indexes to return in a list for
    those particular pagination parameters"""
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Return a page of data from the dataset"""
        assert isinstance(page, int) and page > 0, """Page
        number must be a positive integer"""
        assert isinstance(page_size, int) and page_size > 0, """Page
        size must be a positive integer"""
        start_index, end_index = index_range(page, page_size)
        dataset = self.dataset()
        return dataset[start_index:end_index]

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """method should return a dictionary with the following
        key-value pairs"""
        assert isinstance(index, int) and 0 <= index < len(self.dataset()), (
            "Index must be a valid integer within the dataset range."
            )
        assert isinstance(page_size, int) and page_size > 0, """Page
        size must be a positive integer."""

        data = []
        next_index = index
        dataset = self.indexed_dataset()

        while len(data) < page_size and next_index < len(dataset):
            if next_index in dataset:
                data.append(dataset[next_index])
            next_index += 1

        return {
            "index": index,
            "next_index": next_index,
            "page_size": page_size,
            "data": data
        }
