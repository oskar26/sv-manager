import React, { useState } from 'react';
import { useBanTypeStore } from '../store/banTypeStore';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';

export function BanTypes() {
  const { banTypes, addBanType, updateBanType, deleteBanType, toggleBanTypeStatus } = useBanTypeStore();
  const [showModal, setShowModal] = useState(false);
  const [editingBanType, setEditingBanType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    defaultDuration: 1,
    description: '',
    severity: 'low' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanType) {
      updateBanType(editingBanType, formData);
    } else {
      addBanType(formData);
    }
    setShowModal(false);
    setEditingBanType(null);
    setFormData({ name: '', defaultDuration: 1, description: '', severity: 'low' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Ban Types</h1>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Ban Type
        </Button>
      </div>

      <Card className="divide-y divide-primary/10">
        {banTypes.map((banType) => (
          <div key={banType.id} className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-primary">{banType.name}</h3>
                <Badge
                  variant={
                    banType.severity === 'high'
                      ? 'danger'
                      : banType.severity === 'medium'
                      ? 'warning'
                      : 'primary'
                  }
                >
                  {banType.severity}
                </Badge>
                {!banType.active && (
                  <Badge variant="secondary">Inactive</Badge>
                )}
              </div>
              <p className="text-sm text-primary/60">
                Default duration: {banType.defaultDuration} days
              </p>
              <p className="text-sm text-primary/60">{banType.description}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBanTypeStatus(banType.id)}
                className="p-1 hover:bg-primary/5 rounded-lg transition-colors"
              >
                {banType.active ? (
                  <ToggleRight className="h-5 w-5 text-primary" />
                ) : (
                  <ToggleLeft className="h-5 w-5 text-primary/40" />
                )}
              </button>
              <button
                onClick={() => {
                  setEditingBanType(banType.id);
                  setFormData({
                    name: banType.name,
                    defaultDuration: banType.defaultDuration,
                    description: banType.description,
                    severity: banType.severity,
                  });
                  setShowModal(true);
                }}
                className="p-1 hover:bg-primary/5 rounded-lg transition-colors"
              >
                <Edit2 className="h-5 w-5 text-primary" />
              </button>
              <button
                onClick={() => deleteBanType(banType.id)}
                className="p-1 hover:bg-primary/5 rounded-lg transition-colors"
              >
                <Trash2 className="h-5 w-5 text-primary" />
              </button>
            </div>
          </div>
        ))}
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingBanType(null);
          setFormData({ name: '', defaultDuration: 1, description: '', severity: 'low' });
        }}
        title={editingBanType ? 'Edit Ban Type' : 'Add Ban Type'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary/70 mb-1">
              Name
            </label>
            <input
              type="text"
              required
              className="glass-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary/70 mb-1">
              Default Duration (days)
            </label>
            <input
              type="number"
              required
              min="1"
              className="glass-input"
              value={formData.defaultDuration}
              onChange={(e) =>
                setFormData({ ...formData, defaultDuration: parseInt(e.target.value) })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary/70 mb-1">
              Description
            </label>
            <textarea
              required
              className="glass-input"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary/70 mb-1">
              Severity
            </label>
            <select
              className="glass-input"
              value={formData.severity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  severity: e.target.value as 'low' | 'medium' | 'high',
                })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowModal(false);
                setEditingBanType(null);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingBanType ? 'Update' : 'Add'} Ban Type
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}