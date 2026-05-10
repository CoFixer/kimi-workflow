# Frontend Examples

Complete examples for common frontend patterns.

## Full Page with CRUD

```typescript
// app/routes/products.tsx
import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useActionData, Form } from '@remix-run/react';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page') || '1');
  const products = await getProducts({ page });
  return json({ products, page });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  
  if (intent === 'create') {
    const data = Object.fromEntries(formData);
    await createProduct(data);
  }
  
  if (intent === 'delete') {
    const id = formData.get('id') as string;
    await deleteProduct(id);
  }
  
  return json({ success: true });
}

export default function ProductsPage() {
  const { products, page } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Products</h1>
      
      <ProductForm />
      <ProductList products={products} />
      <Pagination currentPage={page} />
    </div>
  );
}
```

## TanStack Query Hook

```typescript
// hooks/use-products.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useProducts(page: number = 1) {
  return useQuery({
    queryKey: ['products', page],
    queryFn: () => getProducts({ page }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
```

## Form with Validation

```typescript
// components/product-form.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().positive('Price must be positive'),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function ProductForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  
  const onSubmit = form.handleSubmit((data) => {
    // Submit
  });
  
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <input {...form.register('name')} className="border rounded p-2" />
        {form.formState.errors.name && (
          <span className="text-red-500">{form.formState.errors.name.message}</span>
        )}
      </div>
      
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
}
```
