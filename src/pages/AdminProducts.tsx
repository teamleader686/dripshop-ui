import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useOrders } from '@/context/OrderContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Search, Edit } from 'lucide-react';
import { toast } from 'sonner';

const AdminProducts = () => {
  const { adminProducts, toggleProductActive, deleteProduct, updateProductStock } = useOrders();
  const [search, setSearch] = useState('');
  const [editingStock, setEditingStock] = useState<string | null>(null);
  const [stockValue, setStockValue] = useState('');

  const filtered = adminProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (id: string, name: string, currentActive: boolean) => {
    toggleProductActive(id);
    toast.success(`${name} ${currentActive ? 'deactivated' : 'activated'}`);
  };

  const handleDelete = (id: string, name: string) => {
    deleteProduct(id);
    toast.success(`${name} deleted`);
  };

  const handleStockSave = (id: string) => {
    const stock = parseInt(stockValue);
    if (!isNaN(stock) && stock >= 0) {
      updateProductStock(id, stock);
      toast.success('Stock updated');
    }
    setEditingStock(null);
  };

  return (
    <AdminLayout title="Product Management">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div className="relative flex-1 max-w-sm w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button size="sm">
          <Plus size={14} className="mr-1" /> Add Product
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr className="text-muted-foreground border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4">Product</th>
                <th className="text-left py-3 px-4 hidden md:table-cell">Category</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Stock</th>
                <th className="text-left py-3 px-4">Active</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-10 h-12 object-cover rounded" />
                      <span className="font-medium line-clamp-1">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell text-muted-foreground">{product.category}</td>
                  <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    {editingStock === product.id ? (
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          value={stockValue}
                          onChange={e => setStockValue(e.target.value)}
                          className="w-16 h-7 text-xs"
                          autoFocus
                          onKeyDown={e => e.key === 'Enter' && handleStockSave(product.id)}
                        />
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => handleStockSave(product.id)}>
                          ✓
                        </Button>
                      </div>
                    ) : (
                      <button
                        className="flex items-center gap-1 text-sm hover:text-primary"
                        onClick={() => { setEditingStock(product.id); setStockValue(String(product.stock)); }}
                      >
                        {product.stock}
                        <Edit size={10} />
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <Switch
                      checked={product.isActive}
                      onCheckedChange={() => handleToggle(product.id, product.name, product.isActive)}
                    />
                  </td>
                  <td className="py-3 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(product.id, product.name)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">No products found</div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
