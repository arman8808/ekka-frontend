import React from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { BsSend } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import contactService from "../services/contactService";

// Constants
const COUNTRIES = [
  { value: "", label: "Select Country" },
  { value: "US", label: "United States" },
  { value: "IN", label: "India" },
  { value: "UK", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
];

const ANIMATION_CONFIG = {
  fadeInUp: {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  },
};

// Validation Schema
const contactSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "Must be at least 2 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+?[\d\s\-\(\)]{10,}$/, "Invalid phone number"),
  country: yup
    .string()
    .required("Country is required")
    .notOneOf([""], "Country is required"),
  zipCode: yup
    .string()
    .required("Zip code is required")
    .min(3, "Must be at least 3 characters"),
  message: yup.string().optional(),
  acceptPrivacyPolicy: yup
    .boolean()
    .oneOf([true], "You must accept the privacy policy")
    .required(),
});

// Reusable Components
const AnimatedSection = ({ children, className = "" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={ANIMATION_CONFIG.staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FormField = ({
  label,
  name,
  register,
  errors,
  type = "text",
  options = [],
  required = false,
  className = "",
}) => {
  const baseClasses = `
    w-full border rounded-md px-4 py-3 font-poppins text-base
    focus:outline-none focus:ring-2 transition-all duration-300
    ${
      errors[name]
        ? "border-red-500 focus:ring-red-300 bg-red-50"
        : "border-[#6E2D79] focus:ring-purple-300 bg-white"
    }
  `;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[#6E2D79]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {type === "select" ? (
        <select {...register(name)} className={baseClasses}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          {...register(name)}
          className={`${baseClasses} resize-vertical min-h-[120px]`}
        />
      ) : (
        <input type={type} {...register(name)} className={baseClasses} />
      )}

      {errors[name] && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm font-medium"
        >
          {errors[name]?.message}
        </motion.p>
      )}
    </div>
  );
};

// Main Component
const ContactUsPage = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      country: "",
      zipCode: "",
      message: "",
      acceptPrivacyPolicy: false,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Sending your message...");

    try {
      // Use contact service to submit form
      await contactService.submitContactForm(data);

      toast.success("Message sent successfully! We will contact you soon.", {
        id: loadingToast,
        duration: 5000,
      });

      reset();
    } catch (error) {
      toast.error(
        error.message || "Failed to send message. Please try again later.",
        {
          id: loadingToast,
          duration: 5000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-purple-50 min-h-screen overflow-hidden">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
            padding: "16px",
            fontSize: "0.875rem",
            borderRadius: "8px",
            maxWidth: "100%",
          },
          success: {
            duration: 5000,
            iconTheme: {
              primary: "#10B981",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "white",
            },
          },
          loading: {
            duration: 80000,
            iconTheme: {
              primary: "#3B82F6",
              secondary: "white",
            },
          },
        }}
      />

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={ANIMATION_CONFIG.staggerContainer}
        className="relative z-10 text-center pt-20 pb-16 mt-14"
      >
        <motion.h1
          variants={ANIMATION_CONFIG.fadeInUp}
          className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-[#6E2D79] font-poppins mb-4"
        >
          Contact Us
        </motion.h1>
        <motion.p
          variants={ANIMATION_CONFIG.fadeInUp}
          className="font-normal text-[#6E2D79] font-poppins text-base sm:text-lg max-w-2xl mx-auto px-4"
        >
          We'd Love to Hear From You!
        </motion.p>
      </motion.div>

      {/* Form Section */}
      <AnimatedSection className="relative z-10 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={ANIMATION_CONFIG.fadeInUp}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Fields */}
              <motion.div variants={ANIMATION_CONFIG.fadeInLeft}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="First Name"
                    name="firstName"
                    register={register}
                    errors={errors}
                    required
                  />
                  <FormField
                    label="Last Name"
                    name="lastName"
                    register={register}
                    errors={errors}
                    required
                  />
                </div>
              </motion.div>

              {/* Contact Fields */}
              <motion.div variants={ANIMATION_CONFIG.fadeInRight}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    register={register}
                    errors={errors}
                    required
                  />
                  <FormField
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                    register={register}
                    errors={errors}
                    required
                  />
                </div>
              </motion.div>

              {/* Location Fields */}
              <motion.div variants={ANIMATION_CONFIG.fadeInLeft}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Country"
                    name="country"
                    type="select"
                    register={register}
                    errors={errors}
                    options={COUNTRIES}
                    required
                  />
                  <FormField
                    label="Zip Code"
                    name="zipCode"
                    register={register}
                    errors={errors}
                    required
                  />
                </div>
              </motion.div>

              {/* Message */}
              <motion.div variants={ANIMATION_CONFIG.fadeInRight}>
                <FormField
                  label="Message"
                  name="message"
                  type="textarea"
                  register={register}
                  errors={errors}
                  required
                />
              </motion.div>

              {/* Privacy Policy */}
              <motion.div variants={ANIMATION_CONFIG.fadeInUp} className="pt-2">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="acceptPrivacyPolicy"
                    {...register("acceptPrivacyPolicy")}
                    className="mt-1 h-4 w-4 text-[#6E2D79] focus:ring-[#6E2D79] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="acceptPrivacyPolicy"
                    className="ml-3 text-sm text-[#6E2D79]"
                  >
                    I accept the{" "}
                    <motion.a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6E2D79] underline font-medium"
                      whileHover={{ color: "#4b0082" }}
                    >
                      Privacy Policy
                    </motion.a>{" "}
                    <span className="text-red-500">*</span>
                  </label>
                </div>
                {errors.acceptPrivacyPolicy && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm font-medium mt-2"
                  >
                    {errors.acceptPrivacyPolicy.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={ANIMATION_CONFIG.fadeInUp} className="pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !isDirty || !isValid}
                  whileHover={
                    !isSubmitting && isDirty && isValid
                      ? {
                          scale: 1.02,
                          boxShadow: "0 20px 40px rgba(110,45,121,0.3)",
                        }
                      : {}
                  }
                  whileTap={
                    !isSubmitting && isDirty && isValid ? { scale: 0.98 } : {}
                  }
                  className={`
                    w-full inline-flex justify-center items-center text-white font-semibold 
                    rounded-full shadow-lg transition-all duration-300 px-8 py-4 gap-3
                    ${
                      isSubmitting || !isDirty || !isValid
                        ? "bg-gray-400 cursor-not-allowed opacity-70"
                        : "bg-[#6E2D79] hover:shadow-xl"
                    }
                  `}
                >
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <BsSend size={20} />
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ContactUsPage;
