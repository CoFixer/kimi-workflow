---
name: component-scaffolder
description: Generate React components following project patterns.
---

# Component Scaffolder

Generate React components. Read `.project/PROJECT_FACTS.md` first.

## Output

1. Component `.tsx` with typed props
2. Tailwind classes (no custom CSS)
3. Types in `app/types/components.d.ts` if reusable
4. Basic render test

## Rules

- Named exports (`export function`), no default exports
- Props interface always defined
- Handle loading, error, empty states
- Accessible: proper ARIA where needed
- Responsive: mobile-first

## Template

```typescript
import type { ProductCardProps } from '~/types/components';

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4" onClick={() => onClick?.(product)}>
      <h3 className="text-lg font-semibold">{product.name}</h3>
    </div>
  );
}
```

## Verification

- [ ] Renders without errors
- [ ] Props typed
- [ ] All states handled
- [ ] Responsive
- [ ] Keyboard accessible
