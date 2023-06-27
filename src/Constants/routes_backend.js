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
  GET_STOCK: '/stock',
  ADD_STOCK: '/stock',
  DELETE_STOCK: '/stock',

  //billing
  GET_INVOICE_COUNT: "/invoice/count",
  CHECKOUT_PRODUCT: "/product/reduceStock",

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
  
}

