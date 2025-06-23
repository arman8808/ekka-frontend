import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const FamilySessionForm = () => {
  const [familyMembers, setFamilyMembers] = useState([{ name: '' }]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const sessionModes = [
    { value: 'in-person', label: 'In-Person Session' },
    { value: 'online', label: 'Online Session' },
    { value: 'hybrid', label: 'Hybrid (In-Person & Online)' }
  ];
  
  const paymentOptions = [
    { value: 'credit-card', label: 'Credit Card' },
    { value: 'debit-card', label: 'Debit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank-transfer', label: 'Bank Transfer' }
  ];

  const addFamilyMember = () => {
    if (familyMembers.length < 4) {
      setFamilyMembers([...familyMembers, { name: '' }]);
    }
  };

  const removeFamilyMember = (index) => {
    if (familyMembers.length > 1) {
      const updatedMembers = [...familyMembers];
      updatedMembers.splice(index, 1);
      setFamilyMembers(updatedMembers);
    }
  };

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    // Add your form submission logic here
    reset();
    setFamilyMembers([{ name: '' }]);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl overflow-hidden">
      <div className="py-8 px-6 md:px-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#6E2D79] mb-2">Book Your Family Session</h2>
          <div className="w-16 h-1 bg-[#6E2D79] mx-auto"></div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* Date & Time */}
            <div>
              <label htmlFor="datetime" className="block text-[#6E2D79] font-medium mb-2">
                Select Date & Time
              </label>
              <input
                type="datetime-local"
                id="datetime"
                className={`w-full px-4 py-3 rounded-lg border border-[#E5D0E9] bg-white/90 focus:outline-none focus:ring-1 focus:ring-[#6E2D79] text-gray-700 ${
                  errors.datetime ? 'border-red-300' : ''
                }`}
                {...register('datetime', { required: 'Please select date and time' })}
              />
              {errors.datetime && (
                <p className="mt-2 text-red-500 text-sm">{errors.datetime.message}</p>
              )}
            </div>
            
            {/* Family Members */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[#6E2D79] font-medium">
                  Family Members (up to 4)
                </label>
                {familyMembers.length < 4 && (
                  <button
                    type="button"
                    onClick={addFamilyMember}
                    className="flex items-center text-[#6E2D79] hover:text-[#8a3c97] transition-colors text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add member
                  </button>
                )}
              </div>
              
              <div className="space-y-3">
                {familyMembers.map((member, index) => (
                  <div key={index} className="flex items-center">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder={`Family member ${index + 1} name`}
                        className={`w-full px-4 py-3 rounded-lg border border-[#E5D0E9] bg-white/90 focus:outline-none focus:ring-1 focus:ring-[#6E2D79] text-gray-700 ${
                          errors[`familyMember${index}`] ? 'border-red-300' : ''
                        }`}
                        {...register(`familyMember${index}`, { 
                          required: `Family member ${index + 1} name is required`,
                          minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters'
                          }
                        })}
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeFamilyMember(index)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {errors[`familyMember0`] && (
                <p className="mt-2 text-red-500 text-sm">{errors[`familyMember0`].message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Email */}
              <div>
                <label htmlFor="email" className="block text-[#6E2D79] font-medium mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 rounded-lg border border-[#E5D0E9] bg-white/90 focus:outline-none focus:ring-1 focus:ring-[#6E2D79] text-gray-700 ${
                    errors.email ? 'border-red-300' : ''
                  }`}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && (
                  <p className="mt-2 text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              
              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-[#6E2D79] font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  className={`w-full px-4 py-3 rounded-lg border border-[#E5D0E9] bg-white/90 focus:outline-none focus:ring-1 focus:ring-[#6E2D79] text-gray-700 ${
                    errors.phone ? 'border-red-300' : ''
                  }`}
                  {...register('phone', { 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9+-\s()]{10,20}$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                />
                {errors.phone && (
                  <p className="mt-2 text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Session Mode */}
              <div>
                <label htmlFor="sessionMode" className="block text-[#6E2D79] font-medium mb-2">
                  Session Mode
                </label>
                <select
                  id="sessionMode"
                  className={`w-full px-4 py-3 rounded-lg border border-[#E5D0E9] bg-white/90 focus:outline-none focus:ring-1 focus:ring-[#6E2D79] text-gray-700 ${
                    errors.sessionMode ? 'border-red-300' : ''
                  }`}
                  {...register('sessionMode', { required: 'Please select a session mode' })}
                >
                  <option value="">Select session mode</option>
                  {sessionModes.map((mode) => (
                    <option key={mode.value} value={mode.value}>
                      {mode.label}
                    </option>
                  ))}
                </select>
                {errors.sessionMode && (
                  <p className="mt-2 text-red-500 text-sm">{errors.sessionMode.message}</p>
                )}
              </div>
              
              {/* Payment Option */}
              <div>
                <label htmlFor="paymentOption" className="block text-[#6E2D79] font-medium mb-2">
                  Payment Option
                </label>
                <select
                  id="paymentOption"
                  className={`w-full px-4 py-3 rounded-lg border border-[#E5D0E9] bg-white/90 focus:outline-none focus:ring-1 focus:ring-[#6E2D79] text-gray-700 ${
                    errors.paymentOption ? 'border-red-300' : ''
                  }`}
                  {...register('paymentOption', { required: 'Please select a payment option' })}
                >
                  <option value="">Select payment method</option>
                  {paymentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.paymentOption && (
                  <p className="mt-2 text-red-500 text-sm">{errors.paymentOption.message}</p>
                )}
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 bg-[#6E2D79] text-white font-medium rounded-lg hover:bg-[#8a3c97] transition-colors shadow-md"
              >
                Complete Registration
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FamilySessionForm;