import React from 'react';
import { X, Printer, Download, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface InvoiceProps {
  invoice: any;
  onClose: () => void;
}

const InvoiceGenerator: React.FC<InvoiceProps> = ({ invoice, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    // For simplicity, we'll use the browser's print to PDF functionality
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
      >
        {/* Header Actions */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 print:hidden">
          <h2 className="text-2xl font-bold text-gray-900">Nota Fiscal</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Printer className="h-4 w-4" />
              <span>Imprimir</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Baixar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-8 print:p-4">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-red-600 p-2 rounded-lg">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-red-600">MECÂNICA GUAIANASES</h1>
                  <p className="text-gray-600">GuaianaseRP</p>
                </div>
              </div>
              <div className="text-gray-600 text-sm">
                <p>Oficina Mecânica Especializada</p>
                <p>Cidade: Guaianases</p>
                <p>Servidor: GuaianaseRP</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-red-50 p-4 rounded-lg">
                <h2 className="text-xl font-bold text-red-600 mb-2">NOTA FISCAL</h2>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">Número:</span> {invoice.invoice_number}</p>
                  <p><span className="font-medium">Data:</span> {format(new Date(invoice.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</p>
                  <p><span className="font-medium">Cliente ID:</span> {invoice.client_id}</p>
                  <p><span className="font-medium">Mecânico:</span> {invoice.mechanic_name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Detalhamento dos Serviços
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-medium text-gray-700">Serviço</th>
                    <th className="text-center p-3 font-medium text-gray-700">Local</th>
                    <th className="text-center p-3 font-medium text-gray-700">Qtd</th>
                    <th className="text-right p-3 font-medium text-gray-700">Valor Unit.</th>
                    <th className="text-right p-3 font-medium text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.services?.map((item: any, index: number) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="p-3">{item.service?.name || 'Serviço'}</td>
                      <td className="text-center p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.is_external 
                            ? 'bg-orange-100 text-orange-600' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {item.is_external ? 'Externo' : 'Interno'}
                        </span>
                      </td>
                      <td className="text-center p-3">{item.quantity}</td>
                      <td className="text-right p-3">
                        ${(item.subtotal / item.quantity).toLocaleString()}
                      </td>
                      <td className="text-right p-3 font-medium">
                        ${item.subtotal.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Extra Parts */}
          {invoice.order_data.extra_parts?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                Peças Adicionais
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-3 font-medium text-gray-700">Peça</th>
                      <th className="text-center p-3 font-medium text-gray-700">Qtd</th>
                      <th className="text-right p-3 font-medium text-gray-700">Valor Unit.</th>
                      <th className="text-right p-3 font-medium text-gray-700">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.order_data.extra_parts.map((part: any, index: number) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="p-3">{part.name}</td>
                        <td className="text-center p-3">{part.quantity}</td>
                        <td className="text-right p-3">${part.price.toLocaleString()}</td>
                        <td className="text-right p-3 font-medium">
                          ${(part.price * part.quantity).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal Serviços:</span>
                    <span>${invoice.totals.servicesSubtotal.toLocaleString()}</span>
                  </div>
                  {invoice.totals.partsSubtotal > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Subtotal Peças:</span>
                      <span>${invoice.totals.partsSubtotal.toLocaleString()}</span>
                    </div>
                  )}
                  {invoice.totals.partsTax > 0 && (
                    <div className="flex justify-between text-sm text-yellow-600">
                      <span>Taxa de Peças:</span>
                      <span>${invoice.totals.partsTax.toLocaleString()}</span>
                    </div>
                  )}
                  {invoice.totals.discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Desconto:</span>
                      <span>-${invoice.totals.discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-300 pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Geral:</span>
                      <span className="text-red-600">${invoice.totals.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-300 text-center text-gray-600 text-sm">
            <p className="mb-2">Obrigado pela preferência!</p>
            <p>MECÂNICA GUAIANASES - A oficina de confiança de GuaianaseRP</p>
            <p className="mt-4 text-xs">
              Nota fiscal gerada automaticamente em {format(new Date(), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InvoiceGenerator;