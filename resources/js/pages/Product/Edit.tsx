import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
// import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Product',
        href: '/products',
    },
];
interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
}




export default function Edit() {
    const { props } = usePage<{ product: Product }>();
    const product = props.product; // comes from Laravel controller

    interface ProductForm {
        id: number;
        name: string;
        price: string;
        description: string;
    }

    const { data, setData, put, processing, errors } = useForm<ProductForm>({
        id: product.id,
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
    });

    // const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/product/${data.id}`, {
            // onSuccess: () => {
            //     setSuccessMessage('Product updated successfully!');
            // },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />
            <div className="w-8/12 p-4">
                {/* {successMessage && (
                    <Alert className="mb-4">
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                )} */}

                {Object.keys(errors).length > 0 && (
                    <Alert>
                        <CircleAlert />
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>
                            <ul>
                                {Object.entries(errors).map(([key, message]) => (
                                    <li key={key}>{message as string}</li>
                                ))}
                            </ul>
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="gap-1.5">
                        <Label htmlFor="product_name">Name</Label>
                        <Input
                            id="product_name"
                            placeholder="Product name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="product_price">Price</Label>
                        <Input
                            id="product_price"
                            placeholder="Product price"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="product_description">Description</Label>
                        <Textarea
                            id="product_description"
                            placeholder="Description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                    </div>
                    <Button type="submit" disabled={processing}>
                        Update product
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
