// src/components/MockPaymentModal.jsx
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/Dialog-Temp";
import { Button } from '@/components/ui/Button-Temp';

export default function MockPaymentModal({ isOpen, onOpenChange, total, onSuccess, onFailure }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Test Payment Simulation</DialogTitle>
          <DialogDescription>
            This is a mock payment screen. In a real application, this would be a secure payment provider.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-center">
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-4xl font-bold">${total.toFixed(2)}</p>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button type="button" onClick={onFailure} variant="destructive">
            Simulate Failure
          </Button>
          <Button type="button" onClick={onSuccess} className="bg-brand-green hover:bg-brand-green/90">
            Simulate Success
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}