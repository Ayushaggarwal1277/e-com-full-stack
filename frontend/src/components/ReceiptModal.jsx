import { useNavigate } from 'react-router-dom';

const ReceiptModal = ({ receipt, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate('/');
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="receipt">
          <div className="receipt-header">
            <h2>✓ Order Confirmed!</h2>
            <p className="success-message">{receipt.message}</p>
          </div>

          <div className="receipt-body">
            <div className="receipt-section">
              <h3>Order Details</h3>
              <p><strong>Order Number:</strong> {receipt.orderNumber}</p>
              <p><strong>Date:</strong> {formatDate(receipt.timestamp)}</p>
              <p><strong>Status:</strong> <span className="status-badge">{receipt.status}</span></p>
            </div>

            <div className="receipt-section">
              <h3>Customer Information</h3>
              <p><strong>Name:</strong> {receipt.customerName}</p>
              <p><strong>Email:</strong> {receipt.customerEmail}</p>
            </div>

            <div className="receipt-section">
              <h3>Items Ordered</h3>
              <div className="receipt-items">
                {receipt.items.map((item, index) => (
                  <div key={index} className="receipt-item">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="receipt-section receipt-totals">
              <div className="receipt-row">
                <span>Subtotal:</span>
                <span>${receipt.subtotal}</span>
              </div>
              <div className="receipt-row">
                <span>Tax:</span>
                <span>${receipt.tax}</span>
              </div>
              <div className="receipt-row total">
                <span>Total:</span>
                <span>${receipt.total}</span>
              </div>
            </div>
          </div>

          <div className="receipt-footer">
            <p className="thank-you">Thank you for shopping with Vibe Commerce!</p>
            <p className="email-note">A confirmation email has been sent to {receipt.customerEmail}</p>
            <button onClick={handleClose} className="btn-close-modal">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
