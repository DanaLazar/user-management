// File: src/app/api/users/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { SortPayload } from 'react-admin';
import { PageRange } from '@/src/data/types';
import prismadb from '@/prisma/prisma'

export async function GET(request: NextRequest) {
  const queryString = request.nextUrl.searchParams;
  const users = await prismadb.user.findMany();

  let range: PageRange = { from: 0, to: users.length - 1 };
  const rangeParam = queryString.get('range');
  if (rangeParam) {
    try {
      range = JSON.parse(rangeParam);
      if (range.from === undefined || range.to === undefined) {
        throw new Error('Range must have from and to properties');
      }
    } catch (error) {
      return NextResponse.json({ message: 'Invalid range parameter' }, { status: 400 });
    }
  }


  const filter = queryString.get('filter');
  let word = '';

  if (filter) {
    try {
      const parsedFilter = JSON.parse(filter);
      word = parsedFilter.q || '';
    } catch (error) {
      word = '';
    }
  }

  // Handle sort
  const sortParam = queryString.get('sort');
  let sort: SortPayload = { field: '', order: 'ASC' }; // Default values

  if (sortParam) {
    try {
      sort = JSON.parse(sortParam);
      if (!sort.field) {
        throw new Error('Sort field is missing');
      }
    } catch (error) {
      return NextResponse.json({ message: 'Invalid sort parameter' }, { status: 400 });
    }
  }

  // Filtering data
  let filteredData = users;
  if (word) {
    filteredData = users.filter((e) => e && e.name && e.name.toLowerCase().includes(word.toLowerCase()));
  }

  // Dynamic sort function
  function dynamicSort(property: string) {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a: any, b: any) {
      let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  // Sorting data
  if (sort.field) {
    filteredData.sort(dynamicSort(sort.field));
    if (sort.order === 'DESC') {
      filteredData.reverse();
    }
  }

  // Paginating data
  const paginatedData = filteredData.slice(range.from, range.to + 1);

  return NextResponse.json(
    {
      data: paginatedData,
      total: filteredData.length,
    },
    { status: 200 }
  );
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;
  const user = await prismadb.user.delete({
    where: { id }
  })
  try {
    if (user) {
      const users = await prismadb.user.findMany();
      return NextResponse.json(
        {
          data: users,
          total: users.length,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: (error as { message: string }).message }, { status: 404 });
  }
}

