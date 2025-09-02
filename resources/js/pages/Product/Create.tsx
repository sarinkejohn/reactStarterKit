import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
// import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a new Product',
        href: '/products/create',
    },
];
 export default function Create() {
    interface ProductForm {
        name: string;
        price: string;
        description: string;
    }

    const { data, setData, post, processing, errors } = useForm<ProductForm>({
        name: '',
        price: '',
        description: '',
    });

    // const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/product/store', {
            // onSuccess: () => {
            //     setSuccessMessage('Product added successfully!');
            //     setData({ name: '', price: '', description: '' }); // reset form
            // },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a new Product" />
            <div className="w-8/12 p-4">
                {/* Success Alert
                {successMessage && (
                    <Alert className="mb-4">
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                )} */}

                {/* Error Alert */}
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
                        <Input id="product_name" placeholder="Product name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="product_price">Price</Label>
                        <Input id="product_price" placeholder="Product price" value={data.price} onChange={(e) => setData('price', e.target.value)} />
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
                        Add a product
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
