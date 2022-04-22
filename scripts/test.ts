import React from 'react';
import { join } from 'path';
import writeNewRoute, { getNewRouteCode, writeRouteNode } from './route-generator';
// @ts-ignore
import routeNode from './fixtures/routeNode';

const getPath = (a: any) => join(__dirname, a);

// console.log(join(__dirname, '../src/router'));

writeNewRoute(
  {
    path: 'page1',
    parent: '/module1',
    element: '<Page1 />',
  },
  join(__dirname, '../src/_router.config.tsx'),
  ''
)
