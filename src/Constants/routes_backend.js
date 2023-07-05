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

  //vendor
  GET_VENDORS: "/vendors",
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

  //billing
  GET_BILLING_HISTORY: "/billings",
  GET_BILLING_INFO: "/billing/",
  CHECKOUT_PRODUCT: "/billing/checkout",
}

