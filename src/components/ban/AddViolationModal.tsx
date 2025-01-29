import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Ban } from '../../types';
import { useStudentStore } from '../../store/studentStore';

interface AddViolationModalProps {
  isOpen: boolean;
  onClose: () => void;
  ban: Ban;
}

export function AddViolationModal({ isOpen, onClose, ban }: AddViolationModalProps) {
  const addViolation = useStudentStore((state) => state.addViolation);
  const [violation, setViolation] = useState({
    description: '',
    location: '',
    extensionDays: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addViolation(ban.id, {
      ...violation,
      id: crypto.randomUUID(),
      date: new Date(),
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record Ban Violation">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary/70 mb-1">
            Description
          </label>
          <textarea
            required
            className="glass-input"
            value={violation.description}
            onChange={(e) => setViolation({ ...violation, description: e.target.value })}
            placeholder="Describe the violation..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary/70 mb-1">
            Location
          </label>
          <input
            type="text"
            required
            className="glass-input"
            value={violation.location}
            onChange={(e) => setViolation({ ...violation, location: e.target.value })}
            placeholder="Where did the violation occur?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary/70 mb-1">
            Extension (days)
          </label>
          <input
            type="number"
            required
            min="1"
            className="glass-input"
            value={violation.extensionDays}
            onChange={(e) => setViolation({ 
              ...violation, 
              extensionDays: parseInt(e.target.value) 
            })}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Record Violation
          </Button>
        </div>
      </form>
    </Modal>
  );
}