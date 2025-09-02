<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class productsController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return Inertia::render('Product/Index', compact('products'));

    }
    public function create()
    {
        return Inertia::render('Product/Create', []);
    }

    public function store(Request $request)
    {
        // dd($request);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:500',
        ]);
        Product::create($validated);
        return redirect()->route('products.index')->with('message', 'Product added successfully!');


    }
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('message', 'Product Deleted! successfully!');
    }
    public function edit($id)
    {
        $product = Product::findOrFail($id);
        return inertia('Product/Edit', [
            'product' => $product
        ]);
    }


    // Handle the update request
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        $product->update($validated);

        return redirect()->route('products.index')->with('message', 'Product updated successfully!');
    }
}
