import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCreditCard,
  FiCheck,
  FiAlertCircle,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const CheckoutModal = ({ isOpen, onClose, cartItems, total, subtotal, shipping, tax }) => {
  const [step, setStep] = useState(1); // 1: Datos personales, 2: Dirección, 3: Método de pago, 4: Confirmación
  const [formData, setFormData] = useState({
    // Datos personales
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Dirección
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Colombia',
    additionalInfo: '',
    // Método de pago
    paymentMethod: '',
  });
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    { id: 'cash', name: 'Efectivo', icon: '💵', description: 'Pago contra entrega' },
    {
      id: 'transfer',
      name: 'Transferencia',
      icon: '🏦',
      description: 'Bancolombia, Nequi, Daviplata',
    },
    { id: 'card', name: 'Tarjeta', icon: '💳', description: 'Débito o crédito en entrega' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
      if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
      if (!formData.email.trim()) {
        newErrors.email = 'El email es requerido';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email inválido';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'El teléfono es requerido';
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Teléfono inválido (10 dígitos)';
      }
    }

    if (currentStep === 2) {
      if (!formData.address.trim()) newErrors.address = 'La dirección es requerida';
      if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
      if (!formData.state.trim()) newErrors.state = 'El departamento es requerido';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'El código postal es requerido';
    }

    if (currentStep === 3) {
      if (!formData.paymentMethod) newErrors.paymentMethod = 'Selecciona un método de pago';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const generateWhatsAppMessage = () => {
    const paymentMethodName =
      paymentMethods.find((pm) => pm.id === formData.paymentMethod)?.name || '';

    let message = `🛍️ *NUEVO PEDIDO - SportShoes Ultra*\n\n`;
    message += `👤 *DATOS DEL CLIENTE*\n`;
    message += `Nombre: ${formData.firstName} ${formData.lastName}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Teléfono: ${formData.phone}\n\n`;

    message += `📍 *DIRECCIÓN DE ENVÍO*\n`;
    message += `Dirección: ${formData.address}\n`;
    message += `Ciudad: ${formData.city}\n`;
    message += `Departamento: ${formData.state}\n`;
    message += `Código Postal: ${formData.zipCode}\n`;
    message += `País: ${formData.country}\n`;
    if (formData.additionalInfo) {
      message += `Info adicional: ${formData.additionalInfo}\n`;
    }
    message += `\n`;

    message += `🛒 *PRODUCTOS*\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Color: ${item.color}\n`;
      message += `   Talla: EU ${item.size}\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Precio: $${(parseFloat(item.price) * item.quantity).toFixed(2)}\n\n`;
    });

    message += `💰 *RESUMEN DE PAGO*\n`;
    message += `Subtotal: $${subtotal.toFixed(2)}\n`;
    message += `Envío: ${shipping === 0 ? 'GRATIS 🎉' : `$${shipping.toFixed(2)}`}\n`;
    message += `IVA (19%): $${tax.toFixed(2)}\n`;
    message += `*TOTAL: $${total.toFixed(2)}*\n\n`;

    message += `💳 *MÉTODO DE PAGO*\n`;
    message += `${paymentMethodName}\n\n`;

    message += `✅ _Pedido confirmado y listo para procesar_`;

    return encodeURIComponent(message);
  };

  const handleConfirmOrder = () => {
    // Número de WhatsApp de la tienda (Cambiar por tu número)
    const whatsappNumber = '573203767995'; // Formato: código país + número sin espacios
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');

    // Cerrar modal después de un momento
    setTimeout(() => {
      onClose();
      setStep(1);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Colombia',
        additionalInfo: '',
        paymentMethod: '',
      });
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-900 rounded-2xl w-full max-w-2xl my-auto shadow-2xl pointer-events-auto border border-white/10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-dark-800/50">
                <div>
                  <h2 className="text-2xl font-bold text-white">Finalizar Compra</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Paso {step} de 4 -{' '}
                    {step === 1
                      ? 'Datos Personales'
                      : step === 2
                      ? 'Dirección de Envío'
                      : step === 3
                      ? 'Método de Pago'
                      : 'Confirmación'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="px-6 pt-4">
                <div className="flex items-center justify-between mb-6">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                          s <= step
                            ? 'bg-gradient-to-r from-primary to-orange-500 text-white'
                            : 'bg-white/5 text-gray-500'
                        }`}
                      >
                        {s < step ? <FiCheck className="w-5 h-5" /> : s}
                      </div>
                      {s < 4 && (
                        <div
                          className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                            s < step ? 'bg-gradient-to-r from-primary to-orange-500' : 'bg-white/10'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {/* Step 1: Datos Personales */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <FiUser className="inline w-4 h-4 mr-1" />
                          Nombre *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white/5 border ${
                            errors.firstName ? 'border-red-500' : 'border-white/10'
                          } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                          placeholder="Juan"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <FiAlertCircle className="w-3 h-3" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Apellido *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white/5 border ${
                            errors.lastName ? 'border-red-500' : 'border-white/10'
                          } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                          placeholder="Pérez"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <FiAlertCircle className="w-3 h-3" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <FiMail className="inline w-4 h-4 mr-1" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/5 border ${
                          errors.email ? 'border-red-500' : 'border-white/10'
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                        placeholder="correo@ejemplo.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <FiPhone className="inline w-4 h-4 mr-1" />
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/5 border ${
                          errors.phone ? 'border-red-500' : 'border-white/10'
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                        placeholder="3001234567"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Dirección */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <FiMapPin className="inline w-4 h-4 mr-1" />
                        Dirección *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/5 border ${
                          errors.address ? 'border-red-500' : 'border-white/10'
                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                        placeholder="Calle 123 #45-67"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" />
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Ciudad *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white/5 border ${
                            errors.city ? 'border-red-500' : 'border-white/10'
                          } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                          placeholder="Bucaramanga"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <FiAlertCircle className="w-3 h-3" />
                            {errors.city}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Departamento *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white/5 border ${
                            errors.state ? 'border-red-500' : 'border-white/10'
                          } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                          placeholder="Santander"
                        />
                        {errors.state && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <FiAlertCircle className="w-3 h-3" />
                            {errors.state}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Código Postal *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-white/5 border ${
                            errors.zipCode ? 'border-red-500' : 'border-white/10'
                          } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                          placeholder="680001"
                        />
                        {errors.zipCode && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <FiAlertCircle className="w-3 h-3" />
                            {errors.zipCode}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">País</label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="Colombia"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Información Adicional (Opcional)
                      </label>
                      <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        placeholder="Apartamento, torre, referencias..."
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Método de Pago */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-4">
                        <FiCreditCard className="inline w-4 h-4 mr-1" />
                        Selecciona tu método de pago *
                      </label>

                      <div className="space-y-3">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, paymentMethod: method.id }));
                              setErrors((prev) => ({ ...prev, paymentMethod: '' }));
                            }}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                              formData.paymentMethod === method.id
                                ? 'border-primary bg-primary/10'
                                : 'border-white/10 bg-white/5 hover:border-white/30'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className="text-4xl">{method.icon}</div>
                              <div className="flex-1">
                                <h4 className="font-bold text-white text-lg">{method.name}</h4>
                                <p className="text-sm text-gray-400">{method.description}</p>
                              </div>
                              {formData.paymentMethod === method.id && (
                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                  <FiCheck className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>

                      {errors.paymentMethod && (
                        <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" />
                          {errors.paymentMethod}
                        </p>
                      )}
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mt-6">
                      <p className="text-sm text-blue-400 flex items-start gap-2">
                        <FiAlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>
                          El pago se coordinará al momento de la entrega. Recibirás confirmación por
                          WhatsApp.
                        </span>
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Confirmación */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiCheck className="w-10 h-10 text-white" strokeWidth={3} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">¡Todo Listo!</h3>
                      <p className="text-gray-400">Revisa tu pedido antes de confirmar</p>
                    </div>

                    {/* Resumen */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-1">Cliente</h4>
                        <p className="text-white">
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p className="text-sm text-gray-400">{formData.email}</p>
                        <p className="text-sm text-gray-400">{formData.phone}</p>
                      </div>

                      <div className="h-px bg-white/10" />

                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-1">Envío</h4>
                        <p className="text-white">{formData.address}</p>
                        <p className="text-sm text-gray-400">
                          {formData.city}, {formData.state} - {formData.zipCode}
                        </p>
                      </div>

                      <div className="h-px bg-white/10" />

                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-1">Método de Pago</h4>
                        <p className="text-white">
                          {paymentMethods.find((pm) => pm.id === formData.paymentMethod)?.name}
                        </p>
                      </div>

                      <div className="h-px bg-white/10" />

                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-1">Total a Pagar</h4>
                        <p className="text-3xl font-bold text-gradient">${total.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <FaWhatsapp className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-green-400 mb-1">
                            Confirma por WhatsApp
                          </h4>
                          <p className="text-sm text-gray-300">
                            Al confirmar, se abrirá WhatsApp con un mensaje pre-cargado con todos
                            los detalles de tu pedido.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10 bg-dark-800/50">
                <div className="flex gap-3">
                  {step > 1 && step < 4 && (
                    <button
                      onClick={handleBack}
                      className="flex-1 py-3 px-6 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-all"
                    >
                      Atrás
                    </button>
                  )}

                  {step < 3 && (
                    <button
                      onClick={handleNext}
                      className="flex-1 py-3 px-6 bg-gradient-to-r from-primary to-orange-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary/50 transition-all"
                    >
                      Continuar
                    </button>
                  )}

                  {step === 3 && (
                    <button
                      onClick={handleNext}
                      className="flex-1 py-3 px-6 bg-gradient-to-r from-primary to-orange-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary/50 transition-all"
                    >
                      Revisar Pedido
                    </button>
                  )}

                  {step === 4 && (
                    <>
                      <button
                        onClick={handleBack}
                        className="flex-1 py-3 px-6 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-all"
                      >
                        Editar
                      </button>
                      <button
                        onClick={handleConfirmOrder}
                        className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center gap-2"
                      >
                        <FaWhatsapp className="w-5 h-5" />
                        Confirmar por WhatsApp
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
