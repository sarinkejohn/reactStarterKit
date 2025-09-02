import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Megaphone } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];
interface Products {
    id: number;
    name: string;
    price: number;
    description: string;
}

interface PageProps {
    flash?: {
        message?: string;
    };
    products: Products[];
}

export default function Index() {
    const { products, flash } = usePage().props as unknown as PageProps;
    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete a product - ${id} ${name}`)) {
            destroy(`/product/${id}`);
        }
    };
    const handleEditing = (id: number)=>{
        router.get(`/products/${id}/edit`);
        console.log('data');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className="m-4">
                <Link href="/products/create">
                    <Button>Create a Product</Button>
                </Link>
            </div>
            <div className="m-4">
                <div>
                    {flash?.message && (
                        <Alert>
                            <Megaphone className="h-4 w-4" />
                            <AlertTitle>Notification!</AlertTitle>
                            <AlertDescription>{flash.message}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
            {products.length > 0 && (
                <div className="m-4">
                    <Table>
                        <TableCaption>A list of your recent products.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>NAME</TableHead>
                                <TableHead>PRICE</TableHead>
                                <TableHead>DESCRIPTION</TableHead>
                                <TableHead className="text-center">ACTION</TableHead>
                            </TableRow>
                        </TableHeader>
                        {products.map((product) => (
                            <TableBody key={product.id}>
                                <TableRow>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex justify-center gap-2">
                                            <Button onClick={()=>handleEditing(product.id)} size="sm" variant="default" className="hover:bg-green-100">
                                                Edit
                                            </Button>
                                            <Button
                                                disabled={processing}
                                                onClick={() => handleDelete(product.id, product.name)}
                                                size="sm"
                                                variant="destructive"
                                                className="hover:bg-red-700"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ))}
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}
