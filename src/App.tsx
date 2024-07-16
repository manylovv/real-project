import { useState } from 'react';
import useSWR from 'swr';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/Select';
import { Spinner } from './components/Spinner';
import { fetcher } from './data';
import { Car, Sort } from './types';

function App() {
  const { data, isLoading, error } = useSWR<Car[]>(
    'https://freetestapi.com/api/v1/cars',
    fetcher
  );

  const [sort, setSort] = useState<Sort>('price');

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !data) {
    return <div>Some error accured...</div>;
  }

  console.log('sort', sort);

  const sortedCars = [...data].sort((a, b) => {
    if (sort === 'price') {
      return b.price - a.price;
    }

    if (sort === 'brand') {
      if (a.make < b.make) {
        return -1;
      }

      if (a.make > b.make) {
        return 1;
      }

      return 0;
    }

    if (sort === 'year') {
      return b.year - a.year;
    }

    return 0;
  });

  console.log('sortedCars', sortedCars);

  const handleSortChange = (sort: Sort) => {
    setSort(sort);
  };

  const handleBuy = () => {
    alert("you don't enough money yet, keep learning react");
  };

  return (
    <div className="p-8 max-w-screen-md mx-auto">
      <div className="flex flex-col gap-4">
        <Select value={sort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="brand">Sort by model</SelectItem>
              <SelectItem value="price">Sort by price</SelectItem>
              <SelectItem value="year">Sort by year</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex flex-col gap-4">
          {sortedCars.map((car) => (
            <div
              className=" border p-4 border-zinc-700 rounded-3xl"
              key={car.id}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img src={car.image} className="size-10 rounded-3xl" />
                  <div className="flex flex-col">
                    <div className="font-semibold">
                      {car.make} {car.model}
                    </div>

                    <div className="text-sm text-zinc-600">
                      ${car.price} - {car.year}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBuy}
                  className="bg-pink-500 px-4 py-2 rounded-2xl"
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
