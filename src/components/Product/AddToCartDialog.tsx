import { Product } from "@/src/@types/product";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
  
  interface AddToCartDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    product: Product;
    quantity: number;
    isPending?: boolean;
  }
  
  export default function AddToCartDialog({
    isOpen,
    onClose,
    onConfirm,
    product,
    quantity,
    isPending,
  }: AddToCartDialogProps) {
    const totalPrice = product.price * quantity;
    const discountAmount = totalPrice * (product.discountPercentage / 100);
  
    return (
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Add to Cart
          </ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to add {quantity} {product.title} to your cart?
            </p>
            <p className="font-medium mt-2">
              Total: ${totalPrice.toFixed(2)}
              {product.discountPercentage > 0 && (
                <span className="ml-2 text-sm text-green-600">
                  (You save ${discountAmount.toFixed(2)})
                </span>
              )}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="secondary" onPress={onConfirm} isLoading={isPending}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }