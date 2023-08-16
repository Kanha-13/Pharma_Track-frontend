export const API = {
  //session
  LOGIN_API: "/userLogin",
  SIGNUP_API: "/userSignUp",
  VERIFY_OTP: "/userOTPverification",
  RESET_PASSWORD_VERIFY_OTP: "/resetPasswordOTPverification",
  SUBMIT_NEW_PASSWORD: "/newPasswordReset",
  RESEND_OTP: "/resendUserOTP",
  FORGET_PASSWORD: "/forgetPassword",
  LOGOUT: "/logOut",

  //product
  GET_ALL_PRODUCTS: "/products",
  GET_PRODUCT: "/product",
  GET_PRODUCT_QUERY: "/product/query",
  UPDATE_PRODUCT: "/product",
  DELETE_PRODUCT: "/product",
  POST_PRODUCT: "/product",

  //stock
  GET_STOCKS_INITIAL: '/stocks',
  GET_STOCK: '/stock/',
  GET_STOCKS_QUERY: '/stocks/query',
  ADD_STOCK: '/stock',
  UPDATE_STOCK: '/stock/',
  DELETE_STOCK: '/stock/',
  GET_STOCKS_VALUATION: "/stocks/valuation",

  //vendor
  GET_VENDORS: "/vendors",
  GET_VENDORS_QUERY: "/vendors/query",
  GET_VENDOR: "/vendor/",
  ADD_VENDOR: "/vendor",
  UPDATE_VENDOR: "/vendor",
  DELETE_VENDOR: "/vendor/",

  //vendor
  GET_EXPIRY: "/stocks/expiry",

  //Settlement
  ADD_SETTLEMENT: '/settlement',
  GET_SETTLEMENTS: '/settlements',
  UPDATE_SETTLEMENT: '/settlement/',
  DELETE_SETTLEMENT: '/settlement/',

  //Purchase
  ADD_PURCHASE: '/purchase',
  GET_PURCHASES: '/purchases',
  GET_PURCHASE_DETAIL: '/purchase/',
  UPDATE_PURCHASE: '/purchase/',
  DELETE_PURCHASE: '/purchase/',
  BILL_PAYMENT_PURCHASE: '/purchase/bill/payment',

  //billing
  GET_BILLING_HISTORY: "/billings",
  GET_CN_HISTORY: "/billings/creditnotes",
  GET_BILLING_INFO: "/billing/",
  GET_CN_INFO: "/billing/creditnote/",
  UPDATE_BILLING_INFO: "/billing/",
  ADD_BILLING_CN: "/billing/creditnote",
  DELETE_BILLING_CN: "/billing/creditnote/",
  CANCEL_BILLING: "/billing/",
  CHECKOUT_PRODUCT: "/billing/checkout",
  GET_LAST_BILLING: "/billing/last/query",

  //patients
  GET_MEDICINE_HISTORY: "/patient/medicines",
  PATIENT_BILL_PAYMENT: '/patient/bill/payment',

  //trade analysis
  GET_TRADE_REPORT: "/trade/analysis",

  //company
  ADD_COMPANY: "/company",
  GET_COMPANY: "/company/",
  UPDATE_COMPANY: "/company/",
  DELETE_COMPANY: "/company/",
  GET_COMPANYS: "/companys",
  GET_COMPANYS_QUERY: "/companys/query",
}

