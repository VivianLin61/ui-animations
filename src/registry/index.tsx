import React from 'react';

import { Registry } from '@/registry/schema';

const ui: Registry = {
  'animated-tabs': {
    name: 'animated-tabs',
    type: 'components:ui',
    files: ['src/registry/core/ui/animated-tabs.tsx'],
    component: React.lazy(() => import('@/registry/core/ui/animated-tabs')),
  },
  'magnified-dock': {
    name: 'magnified-dock',
    type: 'components:ui',
    files: ['src/registry/core/ui/magnified-dock.tsx'],
    component: React.lazy(() => import('@/registry/core/ui/magnified-dock')),
  },
  'multi-step-component': {
    name: 'multi-step-component',
    type: 'components:ui',
    files: ['src/registry/core/ui/multi-step-component.tsx'],
  },
  'animated-checkbox': {
    name: 'animated-checkbox',
    type: 'components:ui',
    files: ['src/registry/core/ui/animated-checkbox.tsx'],
  },
};

const example: Registry = {
  'copy-button-demo': {
    name: 'copy-button-demo',
    type: 'components:example',
    files: ['src/registry/core/example/copy-button-demo.tsx'], //code file
    component: React.lazy(
      () => import('@/registry/core/example/copy-button-demo'), //demo component
    ),
  },
  'multi-step-survey-demo': {
    name: 'multi-step-survey-demo',
    type: 'components:example',
    files: ['src/registry/core/example/multi-step-survey-demo.tsx'], //code file
    component: React.lazy(
      () => import('@/registry/core/example/multi-step-survey-demo'), //demo component
    ),
  },
  'multi-step-wizard-demo': {
    name: 'multi-step-wizard-demo',
    type: 'components:example',
    files: ['src/registry/core/example/multi-step-wizard-demo.tsx'],
    component: React.lazy(
      () => import('@/registry/core/example/multi-step-wizard-demo'),
    ),
  },
  'magnified-dock-demo': {
    name: 'magnified-dock-demo',
    type: 'components:example',
    files: ['src/registry/core/example/magnified-dock-demo.tsx'], //code file
    component: React.lazy(
      () => import('@/registry/core/example/magnified-dock-demo'), //demo file
    ),
  },
  'animated-tabs-demo': {
    name: 'animated-tabs-demo',
    type: 'components:example',
    files: ['src/registry/core/example/animated-tabs-demo.tsx'], //code file
    component: React.lazy(
      () => import('@/registry/core/example/animated-tabs-demo'), //demo file
    ),
  },
};

export const registry: Registry = {
  ...ui,
  ...example,
};
